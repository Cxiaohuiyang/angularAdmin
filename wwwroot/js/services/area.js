/**
 * Created by cheng on 2017/8/9.
 */
;(function () {
    'use strict';
    angular
        .module('app.service')
        .factory('areaServices', areaServices);

    function areaServices($http) {
        return {
            findByLevel: function (level) {
                return $http.get(`/usercenter/area/findByLevel/${level}`).then(function (d) {
                    return d.data;
                });
            },
            findByPid: function (pid) {
                return $http.get(`/usercenter/area/findByPid/${pid}`).then(function (d) {
                    return d.data;
                });
            }
        }
    }
})();