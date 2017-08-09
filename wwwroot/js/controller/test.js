/**
 * Created by cheng on 2017/8/9.
 */
;(function () {
    'use strict';
    angular
        .module('app.controller')
        .controller('userIndexCtr', userIndexCtr);
 
    return;
    
    function  userIndexCtr() {
        var vm = this;
        vm.xxx="load";
    }
})();