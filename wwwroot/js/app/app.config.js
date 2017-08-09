/**
 * Created by cheng on 2017/8/9.
 */

(function () {

    /*
     *
     * 统一处理，http请求时 loading 效果
     *
     * */
    angular.module("app.config").factory('myHttpInterceptor', ['$q', function ($q) {
        var Load_index;
        return {
            'request': function (config) {
                Load_index = layer.load(1);
                return config;
            },
            'requestError': function (rejection) {
                layer.close(Load_index);
                if (typeof canRecover != 'undefined' && canRecover(rejection)) {
                    return responseOrNewPromise;
                }
                return $q.reject(rejection);
            },
            'response': function (response) {
                layer.close(Load_index);
                return response;
            },
            'responseError': function (rejection) {
                layer.close(Load_index);
                layer.msg('<span >网络错误</span>');
                if (typeof canRecover != 'undefined' && canRecover(rejection)) {
                    return responseOrNewPromise;
                }
                return $q.reject(rejection);
            }
        };
    }]);

    angular.module("app.config")
        .config(['$httpProvider','$compileProvider','$locationProvider', function ($httpProvider,$compileProvider,$locationProvider) {
            $httpProvider.interceptors.push('myHttpInterceptor');
            $compileProvider.debugInfoEnabled(false);
          //  $locationProvider.html5Mode(true).hashPrefix('!');
          //  $httpProvider.defaults.headers.post['Content-Type']="application/x-www-form-urlencoded;charset=UTF-8";

        }])
        .run(function($rootScope) {
            $rootScope.$on('$stateChangeStart', function() {
                $('.modal-backdrop').remove();
                $('body').removeClass('modal-open');
            });
        })
        .constant('innId', "")
        .constant('financeHost',   "http://localhost:8082/")
        .constant('ApiHost', "http:/localhost:8080/");

    $(function () {
        let  Load_index ;
        $(document).ajaxStart(function () {
            Load_index = layer.load(1);
        }).ajaxError(function() {
            layer.close(Load_index);
            layer.msg('<span >网络错误</span>');
        }).ajaxSuccess(function () {
            layer.close(Load_index);
        });
    });

})();
String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};
