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
    