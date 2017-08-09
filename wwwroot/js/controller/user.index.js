/**
 * Created by cheng on 2017/8/9.
 */
;(function () {
    'use strict'
    angular
        .module('app.controller')
        .controller('userIndexCtr', userIndexCtr);

    return;

    function userIndexCtr($scope, $mdDialog, userService,deptService ) {

        /*编辑*/
        $scope.openEditModal = function (user) {
            $mdDialog.show({
                controller: editUserCtr,
                templateUrl: 'editPanel.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                locals: {
                    user:user
                }
            });
        };
        $scope.del_user = function (user) {
            layer.confirm('确定删除该部门吗？', {
                btn: ['删除', '取消']
            }, function () {
                return;
                // deptService.list(room.id).then(function (d) {
                //     if (d.success) {
                //         layer.closeAll();
                //         layer.msg('删除成功');
                //         return;
                //     }
                //     layer.msg('<span >' + d.message + "</span>");
                // });
            }, function () {
                layer.closeAll();
            });
        };

        onInitTree('deptTree', deptService,{
            beforeClick:(treeId, treeNode)=>{
                loadUser(treeNode.id);
            }
        });
        function loadUser(dept_id) {
            userService.list(dept_id||0).then( (users)=> { 
                $scope.users = users;
            });
        }
        loadUser(0);
    }

    function editUserCtr($scope, $timeout,$mdDialog, user,userService,deptService) {
        $scope.user = angular.copy(user)||{};
        select_input();

        $scope.close=()=>{
            $mdDialog.cancel();
        };
        $scope.dept_save = function () {
            deptService.save($scope.user).then(function (d) {
                if (d.success) {
                    layer.msg('操作成功');
                    return;
                }
                layer.msg('<span >' + d.message + "</span>");
            });
        };

        function select_input() {
            function beforeClick(treeId, treeNode) {
                $timeout(()=> {
                    $scope.dept.parent_name = treeNode.name;
                    $scope.dept.pid = treeNode.id;
                });
                hideMenu();
            }

            $scope.showMenu = function () {
                $("#menuContent").slideDown("fast");
                $("body").bind("mousedown", onBodyDown);
            }
            function hideMenu() {
                $("#menuContent").fadeOut("fast");
                $("body").unbind("mousedown", onBodyDown);
            }

            function onBodyDown(event) {
                if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
                    hideMenu();
                }
            }

            setTimeout(()=> {
                onInitTree('parent_dept_tree', deptService, {
                    beforeClick: beforeClick
                })
            }, 2000);


        }
    }

    function onInitTree(tree_id, deptService, callback) {

        let z_callback = {
            onExpand: (event, id, node) => {
                if (node.isAjax) {
                    return;
                }
                node.isAjax = true;
                var treeObj = $.fn.zTree.getZTreeObj(tree_id);
                deptService.list(node.id).then((d) => treeObj.addNodes(node, d));
            }
        };


        var setting = {
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: Object.assign(z_callback, callback || {})
        };
        var zNodes = [];
        deptService.list(0).then(function (d) {
            zNodes = d;
            $.fn.zTree.init($(`#${tree_id}`), setting, zNodes);
        });
    }
})();