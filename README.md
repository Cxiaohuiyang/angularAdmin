### 一套基于angular 的后台模板
>基本上无需写样式可以就可以搭建基于angualr1.x的后台系统

### 使用
文件结构：
~~~
--wwwroot
----css            样式文件
----flatlab        一套样式库（http://thevectorlab.net/flatlab/index.html）
----iconfont       字体
----imgs           图片
----js             自己的js文件
~~~
>按照自己的业务和命名修改`app>app.app.module.js`文件中关于`ng-app`的命名。
页面对应的contoller 写在`controller`中

>参照layout.cshtml 引用css 和 js 
![图片](https://raw.githubusercontent.com/Cxiaohuiyang/angularAdmin/master/E353F09E-2CBB-4125-ADF8-3C3DBD1F2B8E.png)
