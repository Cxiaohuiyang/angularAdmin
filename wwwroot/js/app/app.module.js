/**
 * Created by cheng on 2017/8/9.
 */
(function () {
    'use strict';
     angular.module("app.config", []);
     angular.module("app.service", ['app.config']);
     angular.module("app.router", ['ui.router', 'app.service']);
     angular.module("app.directive", ['ngMaterial','app.config']);
     angular.module("app.controller", ['app.service','app.directive']);
     angular.module("laiBinApp", ['app.controller','app.router', 'app.service']); 
})();




