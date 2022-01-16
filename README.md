<<<<<<< HEAD
# vshop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
=======
# vhop
>>>>>>> cbd2ba1308f325c45a5daa8c39060fe5195555bb



#vshop
1.安装环境

##git命令

```powershell

git init

git add README.md

git commit -m "first commit"

git remote add origin https://github.com/hehailo/vshop.git

git branch master

git push origin master

拉取代码 
git pull origin master

```






2 组件拆分
    4 个页面
         首页 搜索结果页 登陆 注册
    组件拆分
        路由组件
            Home 
            Search 
            Login 没有footer
            Register 没有footer
    非路由组件
        Header Footer

3.header和footer    
    安装less
    npm install --save less less-loader@7

4.初始化路由
    npm install vue-router    
    路由组件放在views文件夹或者pages文件夹

    路由命名为router  new Vue传入的也是router

5.header路由的处理
    编程式
    声明式 
    二者的区别和应用的场景


6.footer组件的显示与隐藏
    v-show v-if
    登陆和注册页面不展示footer
    v-if操作dom节点的变化 消耗性能
    v-show是样式的显示隐藏

    1.通过路由路径来判断
    2.通过理由携带的「变量」来判断 meta（路由元信息）


7.路由传参
    编程式
    路由式

    push/replace 前者有当次历史记录 后者没有

    query
    params 需要在路由配置里面
        1.占位
        2.to的对象写法只能够用name 不能用path
        3.props接受数据可以使用布尔值 $attrs.


    路由传递参数相关面试题
        1:路由传递参数（对象写法）path是否可以结合params参数一起使用?
            不可以：不能这样书写，程序会崩掉；
            路由传递参数的时候对象的写法可以是path也可以是name，但是传递params参数的时候不能使用path

        2:如何指定params参数可传可不传? 
            配置路由的时候，`params`参数已经占位了，但是路由挑战的时候不传递，路径会出现问题
            不传：http://localhost:8080/#/
            正常：http://localhost:8080/#/search/%E5%B0%8F%E7%B1%B3

            解决方法
                在配置路由的时候在params占位后面加上一个？
                 path:'/search/:keyword?',

        3:params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
            如果指定name与params配置, 但params中数据是一个"", 无法跳转，路径会出问题
            空串的问题 路径缺少
            http://localhost:8080/#/

            解决方法，params传参的时候默认undefined
            this.$router.push({name:'search',params:{keyword:this.keyWord||undefined}})

        4: 路由组件能不能传递props数据?
        可以 有三种方式
        1.布尔值
            路由配置：props:true,
            取值：  props:['keyword'],
        2.对象写法 
            路由配置：props:{ a:"1"},
            取值：  props:['a','b'],
        3.函数写法(常用!)
            路由配置
                 props:($route)=>{
                    console.log($route)
                    return {
                        keyword:$route.params.keyword
                    }
                }
            取值：  props:['keyword'],


8. 重写push和replace方法
    编程式导航问题：
    跳转路由 多次传参重复 会抛出警告
    NavigationDuplicated: Avoided redundant navigation to current location

    push方法 有返回值 返回值是一个promise 
    function push(){
        return new Promise((resolve,reject)=>{

        })
    }
    promise需要有失败或者成功的回调 

    this.$router是VueRouter的实例对象
    push方法是   VueRouter 原型上的方法 
    


    js原型
        显式原型（属性）
        每个函数都有一个prototype属性，它默认指向一个Object空对象（即：原型对象）
        原型对象中有一个属性constructor，它指向函数对象
        给原型对象添加属性（一般都是方法）
        作用：函数的所有实例对象自动拥有原型中的属性（方法）

        隐私原型（属性）__proto__
        每个实例对象都有一个proto，可称为隐私原型（属性）
        对象的隐式原型的值 等于 其对应构造函数的显式原型的值
  
        总结：
        函数的prototype属性：在定义函数时自动添加的，默认值是一个空object对象
        对象的 __proto__ 属性：创建对象时自动添加的，默认值为构造函数的prototype属性值
        程序员能直接操作显式原型，但不能直接操作隐式原型（ES6之前）

        原型链：
        它是一种基于__proto__向上查找的机制，当我们操作实例的某个属性或者方法的时候，首先找到自己空间中私有的属性或者方法
        1.找到了，则结束查找，使用自己的私有即可
        2.没有找到 则基于__proto__ 找所属类的prototype,如果找到了就用这个公有的，如果没找到，基于原型上的__proto__继续向上查找，
        一直找到Object:prototype的原型为止，如果在没有，操作的属性或者方法不存在


    call 和 apply 的区别

        call和apply都可以改变this的值思想
        不同点 call和apply传递参数 call传递参数用逗号隔开 apply方法执行 传递数组
        sum.call(null,1,2);
        sum.apply(null,[1,2]);


    解决方法        
        let origiPush = VueRouter.prototype.push;
        let roriginReplace = VueRouter.prototype.replace;

        //重写push和replace方法
        VueRouter.prototype.push = function(location,resolve,reject){
            if(resolve && reject){
                origiPush.call(this,location,resolve,reject)
            }else{
                origiPush.call(this,location,()=>{},(error)=>{console.log(error)})
            }
        }

        VueRouter.prototype.push = function(location,resolve,reject){
            if(resolve && reject){
                roriginReplace.call(this,location,resolve,reject)
            }else{
                roriginReplace.call(this,location,()=>{},(error)=>{console.log(error)})
            }
        }



9.三级联动

  Home Search Dtail等组件用到
  注册为全局组件 全局组件只需要一次引入


10 axios二次封装


    接口前缀都有 /api
    XMlHttpRequest fetch jquery axios

    请求拦截器
    响应拦截器


    安装
        npm install axios

    axios使用
        添加请求拦截器
            axios.interceptors.request.use(function (config) {
                // 在发送请求之前做些什么
                return config;
            }, function (error) {
                // 对请求错误做些什么
                return Promise.reject(error);
            });

        添加响应拦截器
            axios.interceptors.response.use(function (response) {
                // 对响应数据做点什么
                return response;
            }, function (error) {
                // 对响应错误做点什么
                return Promise.reject(error);
            });

        如果你想在稍后移除拦截器，可以这样：
            var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
            axios.interceptors.request.eject(myInterceptor);

        可以为自定义 axios 实例添加拦截器
            var instance = axios.create();
            instance.interceptors.request.use(function () {/*...*/});

        执行 GET 请求
            // 为给定 ID 的 user 创建请求
            axios.get('/user?ID=12345')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            // 可选地，上面的请求可以这样做
            axios.get('/user', {
                params: {
                    ID: 12345
                }
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            执行 POST 请求

            axios.post('/user', {
                firstName: 'Fred',
                lastName: 'Flintstone'
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });


11 接口管理
    向服务器发请求
    小项目 在组件的生命周期中发送请求 mounted()
    大项目 axios.get()

    跨域问题 
        协议 域名 端口号 不同 会出现跨域问题
    
    解决方案
        jsonp cros 代理

    webpack
         https://v4.webpack.docschina.org/configuration/dev-server/#devserver

        请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users。
        如果你不想始终传递 /api ，则需要重写路径：

        module.exports = {
            //...
            devServer: {
                proxy: {
                    '/api': {
                        target: 'https://other-server.example.com',
                        secure: false
                    }
                }
            }
        };

        配置文件修改需要重新启动项目！


12  nprogress进度条的使用
     
     npm install nprogress

     在请求拦截器中使用
     start 进度条开始
     done 进度条结束

    import nprogress from 'nprogress';
    //引入进度条样式
    import 'nprogress/nprogress.css'

13 vuex

    官方插件 状态管理库 集中收管理项目组件公用数据
    mutation
    action
    state
    module
    getters

    模块化
        inndex
            import home from "./home";
            import search from "./search";

            export default new Vuex.Store({
            modules: {
                home,
                search,
            },
            });
        home
            //home
            const state = {};
            const mutations = {};
            const actions = {};
            const getters = {};

            export default {
                state,
                mutations,
                actions,
                getters,
            };
 

 13 typenav 三级联动 动态

    数据展示

        "data": [
            {
                "categoryChild": [
                    {
                        "categoryChild": [
                            { "categoryName": "电子书", "categoryId": 1 },
                            { "categoryName": "网络原创", "categoryId": 2 },
                            { "categoryName": "数字杂志", "categoryId": 3 },
                            { "categoryName": "多媒体图书", "categoryId": 4 }
                        ],
                        "categoryName": "电子书刊",
                        "categoryId": 1
                    },
                ],
                "categoryName": "图书、音像、电子书刊",
                "categoryId": 1
            },
        ]

    动态添加背景颜色
        1.样式完成
            hover
        2.js完成
            鼠标移入 分类变色 
            :class="{ cur: currentIndex == index }"

    二三级分类显示和隐藏
        1.样式完成
            一开始默认隐藏 hover时候 display block
             &:hover {
                .item-list {
                display: block;
                }
             }

        2.js完成
          <div class="item-list clearfix" :style="{display:currentIndex == index?'block':'none'}">

14 解决卡顿问题
    鼠标快速下滑 触发事件频繁 浏览器反应不过来 只有部分执行

    防抖和截流

    防抖：
        前面所有的触发都取消 最后一次执行后，过去规定的时间之后才会触发，也就是说，如果连续快速的触发 只会执行一次
    节约流
        在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发

    自己的理解
        防抖：最后一次触发事件回调后 一段时间内不在触发 则执行回调
        节流：一段时间内，事件回调只执行一次

    使用lodash
        不用下载安装 但需要引入
        _debounce 防抖
        _throttle 截流

    三级联动截流的操作
        changeIndex: throttle(function (index) {
        this.currentIndex = index;
        }, 50),


15 三级联动路由跳转分析

    点击分类 跳转到搜索页面
        http://localhost:8080/#/search?categoryname=学习&category1Id=5
        http://localhost:8080/#/search?categoryname=学习&category3Id=1
        http://localhost:8080/#/search?categoryname=学习&category3Id=63

    路由跳转
    声明式  router-link
    编程式  push/replace

    声明式
        1、可以实现
        2、router-link 是一个（路由内置的）组件
            当服务器数据返回之后，循环出大量（1000+）router-link组件（创建组件实例） 
            非常耗内存 会出现卡顿

    编程式：
        1、可以实现
        2、循环中，进行逐渐一绑定，会绑定大量回调
        3、利用`事件委派`解决！
            存在的问题 
                怎么保证点击的一定是a标签
                如何获取参数
                如何确定是二级分类/三级分类

    解决方案：编程式+事件委派+自定义属性
        goSearch(event) {
            let element = event.target;
            let { categoryname, category1id, category2id, category3id } =
                element.dataset;
            let location = { name: "search" };
            let query = {};
            // 带有categoryname 的是a标签 是目录
            if (categoryname) {
                if (category1id) {
                query.category1Id = category1id;
                } else if (category2id) {
                query.category2Id = category2id;
                } else if (category3id) {
                query.category3Id = category3id;
                }
                location.query = query;
                this.$router.push(location);
            }
        },

16 搜索模块中的三级联动与过度动画

    home组件中 TypeNav 显示
    search组件 TypeNav 默认隐藏
       划上去 显示 + 动画

    优化
        在home组件、search组件中都有TypeNav组件
        TypeNav组件每次挂载都会发送请求 获取数据 重复发送请求

        因此将发送请求放在 App.vue中 因为 App.vue 只会挂载一次
        this.$store.dispatch("reqCategoryList");

17 参数合并
    http://localhost:8080/#/search/小米
    http://192.168.2.5:8080/#/search?categoryname=学习&category1Id=5
    params和query参数合并
    http://192.168.2.5:8080/#/search/%E5%B0%8F%E7%B1%B3?category1Id=4
    

    核心： this.$route代表的就是当前地址栏

    实现
        if (this.$route.query) {
            location.query = this.$route.query;
        }
        this.$router.push(location);

18 mockjs模拟数据
    1、安装
    npm install mockjs
    2、
    
    