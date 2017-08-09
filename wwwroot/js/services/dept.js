/**
 * Created by cheng on 2017/8/9.
 */

(function () {
    'use strict';
    angular
        .module('app.service')
        .factory('deptService', deptService)
    ;
    function deptService($http) {
       //  $http.defaults.headers.post['Content-Type']="application/x-www-form-urlencoded;charset=UTF-8";
        return {
            list: function (pid) {

                return $http.post('/usercenter/department/list?id='+pid||0).then(function (d) {
                    let depts = d.data ;
                    depts.forEach((v)=>{
                        if((v.lft - v.rgt) !== -1){
                            v.isParent=true;
                        }
                    });
                    return depts;
                });
            },
            page_list: (d)=>  {
                return $http.post(`/usercenter/department/page?pageNum=${d.pageNum||1}&pageSize=${d.pageSize||10}&name=${d.name}&pid=${d.pid}`)
                    .then(function (depts) {
                        let win = window;
                        setTimeout(function () {
                                console.log(win==window)
                        },1)

                    return depts.data;
                });
            },
            detail: ( dept_id )=> {
                return $http.get(`/usercenter/department/findById?id=${dept_id}`).then(function (d) {
                    return d.data;
                });
            },
            tree:function () {
                return $http.post('/usercenter/department/tree').then(function (d) {
                    return d.data;
                });
            },
            syn:function () {
                return $http.post('/usercenter/department/synchronize').then(function (d) {
                    return d.data;
                });
            },
            one_tree:function () {  
                return $http.post('/usercenter/department/oneTree').then(function (d) {
                    function addIcon (child){
                        if(child.pid==0){
                            child.icon = '/imgs/icoorg.png';
                        }else{
                            child.icon = '/imgs/icodept.png';
                        }
                        if(child.children && child.children.length){
                            child.children.forEach(v=>{
                                addIcon(v);
                            });
                        }
                    }
                    let dept = d.data ;
                    if(dept.children && dept.children.length){
                        addIcon(dept);
                    }
                    return dept;
                });
            },
            all_tree:function () {
                return $http.post('/usercenter/department/allTree').then(function (d) {
                    function addIcon (childs){
                        childs.forEach(child=>{
                            if(child.tag==1){
                                child.icon =child.pid==0? '/imgs/icoorg.png': '/imgs/icodept.png';
                            }else if(child.tag==2){
                                child.icon = '/imgs/icojob.png';
                            }else{
                                child.icon = '/imgs/icomjob.png';
                            }
                            if(child.children && child.children.length) {
                                addIcon(child.children);
                            }
                        });
                    }
                    let depts = d.data ;
                    addIcon(depts);
                    return  depts;
                });
            },
            delete:function (id) {
                return $http.post('/usercenter/department/delete?id='+id).then(function (d) {
                    return d.data;
                });
            },
            save:function (dept) {

                return $http.post(dept.id?'/usercenter/department/update':'/usercenter/department/add',dept).then(function (d) {
                    return d.data;
                });
            }
        };
    }
})(window);