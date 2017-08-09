/**
 * Created by cheng on 2017/8/9.
 */
(function () {
    'use strict';
    angular.module("app.router")
        .config(function ($stateProvider, $urlRouterProvider,$locationProvider) {
            $stateProvider
                .state("start", {
                    url: "/start",
                    templateUrl: "/Home/About"
                })
            ;
           $urlRouterProvider.otherwise('start');
          // $locationProvider.html5Mode(true);
        });

    function baseUrl(code){
        return '/'+window.base64.encode(code);
    }

    window.goHref = function (code) {
        let url_code = baseUrl(code),
            args = Array.prototype.slice.call(arguments) ;
        if(arguments.length>1){
            args.shift();
        }
        let params = args.join("&");
        window.location.href =`/#${url_code}?${params}`;
        return false;
    }
})();
