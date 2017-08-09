/**
 * Created by cheng on 2017/8/9.
 */
;
(function () {
    'use strict';

    angular.module('app.directive')
           
        .directive('convertToNumber', function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, ngModel) {
                    ngModel.$parsers.push(function (val) {
                        return parseInt(val, 10);
                    });
                    ngModel.$formatters.push(function (val) {
                        return '' + val;
                    });
                }
            }
        }) 
        .directive('pmsPager', function () {
            return {
                restrict: 'ACE',
                template: `  <div style="text-align: center" id="{{::pagerId}}" class="dataTables_paginate paging_bootstrap pagination">  
                              
                             </div>
                `,
                transclude: true,
                scope: {
                    pagerId: '@',//,
                    pageInfo: '=',
                    groups: '@',
                    ngClick: '='
                },
                link: function (scope, element, attrs) {

                    scope.$watch('pageInfo', function (value) {
                        if (!value) {
                            return;
                        }
                        setTimeout(() => {
                            pager();
                        });
                    });
                    function pager() {
                        laypage({
                            cont: element,//scope.pagerId, // 容器。值支持id名、原生dom对象，jquery对象,
                            pages: scope.pageInfo.pages || 0, // 总页数
                            curr: scope.pageInfo.pageNum || 1, //当前页
                            first: '<<',
                            last: '>>',
                            prev: '<', // 若不显示，设置false即可
                            next: '>', // 若不显示，设置false即可
                            jump: function (e, first) { // 触发分页后的回调
                                if (first) { // 一定要加此判断，否则初始时会无限刷新
                                    return
                                }
                                if (typeof  scope.ngClick === 'function') {
                                    scope.ngClick(e.curr);
                                }
                            },
                            skip: false, // 是否开启跳页
                            skin: '#41cac0',
                            groups: scope.pageInfo.groups || 10 // 连续显示分页数
                        });
                    }


                }
            };
        })  
        .directive('datepicker', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                dateFmt: '@'
            },
            link: function (scope, element, attr, ngModel) {
                element.val(ngModel.$viewValue);
                $(element).dateRangePicker(
                    {
                        autoClose: true,
                        singleDate: true,
                        showShortcuts: false,
                        setValue: function (date) {
                            $(this).val(date || '');
                            scope.$apply(function () {
                                ngModel.$setViewValue(date || '');
                            });
                        },
                    });
            }
        };
    });
})();