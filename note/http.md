# 面试

https://blog.csdn.net/yicixing7/article/details/79320821





## 1.Http与Https的区别：

Http与Https的区别：

1、HTTP 的URL 以http:// 开头，而HTTPS 的URL 以https:// 开头

2、HTTP 是不安全的，而 HTTPS 是安全的

3、HTTP 标准端口是80 ，而 HTTPS 的标准端口是443

4、在OSI 网络模型中，HTTP工作于应用层，而HTTPS 的安全传输机制工作在传输层/5、HTTP 无法加密，而HTTPS 对传输的数据进行加密

6、HTTP无需证书，而HTTPS 需要CA机构wosign的颁发的SSL证书/7、什么是Http协议无状态协议?怎么解决Http协议无状态协议?

8、无状态协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息



也就是说，当客户端一次HTTP请求完成以后，客户端再发送一次HTTP请求，HTTP并不知道当前客户端是一个”老用户“。

可以使用Cookie来解决无状态的问题，Cookie就相当于一个通行证，第一次访问的时候给客户端发送一个Cookie，当客户端再次来的时候，拿着Cookie(通行证)，那么服务器就知道这个是”老用户“。

## 2、URI和URL的区别



**URI**

URI是uniform resource identifier，统一资源标识符，用来唯一的标识一个资源。

Web上可用的每种资源如HTML文档、图像、视频片段、程序等都是一个来URI来定位的

URI一般由三部组成：

​	①访问资源的命名机制

​	②存放资源的主机名

​	③资源自身的名称，由路径表示，着重强调于资源。

URL是uniform resource locator，统一资源定位器，它是一种具体的URI，即URL可以用来标识一个资源，而且还指明了如何locate这个资源。



**URL**

URL是Internet上用来描述信息资源的字符串，主要用在各种WWW客户程序和服务器程序上，特别是著名的Mosaic。

采用URL可以用一种统一的格式来描述各种信息资源，包括文件、服务器的地址和目录等。URL一般由三部组成：

​	①协议(或称为服务方式)

​	②存有该资源的主机IP地址(有时也包括端口号)

​	③主机资源的具体地址。如目录和文件名等





**URN**

URN，uniform resource name，统一资源命名，是通过名字来标识资源，比如mailto:java-net@java.sun.com。



**总结**

URI是以一种抽象的，高层次概念定义统一资源标识，而URL和URN则是具体的资源标识的方式。URL和URN都是一种URI。笼统地说，每个 URL 都是 URI，但不一定每个 URI 都是 URL。这是因为 URI 还包括一个子类，即统一资源名称 (URN)，它命名资源但不指定如何定位资源。上面的 mailto、news 和 isbn URI 都是 URN 的示例。

在Java的URI中，一个URI实例可以代表绝对的，也可以是相对的，只要它符合URI的语法规则。而URL类则不仅符合语义，还包含了定位该资源的信息，因此它不能是相对的。



在Java类库中，URI类不包含任何访问资源的方法，它唯一的作用就是解析。



相反的是，URL类可以打开一个到达资源的流。



## 3、常用的HTTP方法有哪些？

常用的HTTP方法有哪些?

GET： 用于请求访问已经被URI（统一资源标识符）识别的资源，可以通过URL传参给服务器

POST：用于传输信息给服务器，主要功能与GET方法类似，但一般推荐使用POST方式。

PUT： 传输文件，报文主体中包含文件内容，保存到对应URI位置。

HEAD： 获得报文首部，与GET方法类似，只是不返回报文主体，一般用于验证URI是否有效。

DELETE：删除文件，与PUT方法相反，删除对应URI位置的文件。

OPTIONS：查询相应URI支持的HTTP方法。

## 4、HTTP请求报文与响应报文格式

HTTP请求报文与响应报文格式

请求报文包含四部分：

a、请求行：包含请求方法、URI、HTTP版本信息

b、请求首部字段

c、请求内容实体

d、空行

响应报文包含四部分：





a、状态行：包含HTTP版本、状态码、状态码的原因短语

b、响应首部字段

c、响应内容实体

d、空行

常见的首部：



通用首部字段（请求报文与响应报文都会使用的首部字段）



Date：创建报文时间

Connection：连接的管理

Cache-Control：缓存的控制

Transfer-Encoding：报文主体的传输编码方式

请求首部字段（请求报文会使用的首部字段）



Host：请求资源所在服务器

Accept：可处理的媒体类型

Accept-Charset：可接收的字符集

Accept-Encoding：可接受的内容编码

Accept-Language：可接受的自然语言

响应首部字段（响应报文会使用的首部字段）



Accept-Ranges：可接受的字节范围

Location：令客户端重新定向到的URI

Server：HTTP服务器的安装信息

实体首部字段（请求报文与响应报文的的实体部分使用的首部字段）



Allow：资源可支持的HTTP方法

Content-Type：实体主类的类型

Content-Encoding：实体主体适用的编码方式

Content-Language：实体主体的自然语言

Content-Length：实体主体的的字节数

Content-Range：实体主体的位置范围，一般用于发出部分请求时使用

## 5、HTTPS工作原理



一、首先HTTP请求服务端生成证书，客户端对证书的有效期、合法性、域名是否与请求的域名一致、证书的公钥（RSA加密）等进行校验；

二、客户端如果校验通过后，就根据证书的公钥的有效， 生成随机数，随机数使用公钥进行加密（RSA加密）；

三、消息体产生的后，对它的摘要进行MD5（或者SHA1）算法加密，此时就得到了RSA签名；

四、发送给服务端，此时只有服务端（RSA私钥）能解密。

五、解密得到的随机数，再用AES加密，作为密钥（此时的密钥只有客户端和服务端知道）。





具体的参考链接：http://blog.csdn.net/sean_cd/article/details/6966130



## 6、一次完整的HTTP请求所经历的7个步骤

一次完整的HTTP请求所经历的7个步骤

HTTP通信机制是在一次完整的HTTP通信过程中，Web浏览器与Web服务器之间将完成下列7个步骤：



建立TCP连接

在HTTP工作开始之前，Web浏览器首先要通过网络与Web服务器建立连接，该连接是通过TCP来完成的，该协议与IP协议共同构建 Internet，即著名的TCP/IP协议族，因此Internet又被称作是TCP/IP网络。HTTP是比TCP更高层次的应用层协议，根据规则， 只有低层协议建立之后才能，才能进行更层协议的连接，因此，首先要建立TCP连接，一般TCP连接的端口号是80。



Web浏览器向Web服务器发送请求行

一旦建立了TCP连接，Web浏览器就会向Web服务器发送请求命令。例如：GET /sample/hello.jsp HTTP/1.1。



Web浏览器发送请求头



浏览器发送其请求命令之后，还要以头信息的形式向Web服务器发送一些别的信息，之后浏览器发送了一空白行来通知服务器，它已经结束了该头信息的发送。

Web服务器应答



客户机向服务器发出请求后，服务器会客户机回送应答， HTTP/1.1 200 OK ，应答的第一部分是协议的版本号和应答状态码。

Web服务器发送应答头



正如客户端会随同请求发送关于自身的信息一样，服务器也会随同应答向用户发送关于它自己的数据及被请求的文档。

Web服务器向浏览器发送数据



Web服务器向浏览器发送头信息后，它会发送一个空白行来表示头信息的发送到此为结束，接着，它就以Content-Type应答头信息所描述的格式发送用户所请求的实际数据。

Web服务器关闭TCP连接



一般情况下，一旦Web服务器向浏览器发送了请求数据，它就要关闭TCP连接，然后如果浏览器或者服务器在其头信息加入了这行代码：

Connection:keep-alive



TCP连接在发送后将仍然保持打开状态，于是，浏览器可以继续通过相同的连接发送请求。保持连接节省了为每个请求建立新连接所需的时间，还节约了网络带宽。



建立TCP连接->发送请求行->发送请求头->（到达服务器）发送状态行->发送响应头->发送响应数据->断TCP连接



最具体的HTTP请求过程：http://blog.51cto.com/linux5588/1351007

## 7、常见的HTTP相应状态码

常见的HTTP相应状态码

200：请求被正常处理

204：请求被受理但没有资源可以返回

206：客户端只是请求资源的一部分，服务器只对请求的部分资源执行GET方法，相应报文中通过Content-Range指定范围的资源。

301：永久性重定向

302：临时重定向

303：与302状态码有相似功能，只是它希望客户端在请求一个URI的时候，能通过GET方法重定向到另一个URI上

304：发送附带条件的请求时，条件不满足时返回，与重定向无关

307：临时重定向，与302类似，只是强制要求使用POST方法

400：请求报文语法有误，服务器无法识别

401：请求需要认证

403：请求的对应资源禁止被访问

404：服务器无法找到对应资源

500：服务器内部错误

503：服务器正忙

HTTP1.1版本新特性

HTTP1.1版本新特性

a、默认持久连接节省通信量，只要客户端服务端任意一端没有明确提出断开TCP连接，就一直保持连接，可以发送多次HTTP请求

b、管线化，客户端可以同时发出多个HTTP请求，而不用一个个等待响应

c、断点续传



实际上就是利用HTTP消息头使用分块传输编码，将实体主体分块传输。

## 8、HTTP优化方案

我下面就简要概括一下：



TCP复用：TCP连接复用是将多个客户端的HTTP请求复用到一个服务器端TCP连接上，而HTTP复用则是一个客户端的多个HTTP请求通过一个TCP连接进行处理。前者是负载均衡设备的独特功能；而后者是HTTP 1.1协议所支持的新功能，目前被大多数浏览器所支持。

内容缓存：将经常用到的内容进行缓存起来，那么客户端就可以直接在内存中获取相应的数据了。

压缩：将文本数据进行压缩，减少带宽

SSL加速（SSL Acceleration）：使用SSL协议对HTTP协议进行加密，在通道内加密并加速

TCP缓冲：通过采用TCP缓冲技术，可以提高服务器端响应时间和处理效率，减少由于通信链路问题给服务器造成的连接负担。





# 页面的加载过程

浏览器加载该页面发送了4次http请求

<img src="C:\Users\vnian\AppData\Roaming\Typora\typora-user-images\image-20220113145115078.png" alt="image-20220113145115078" style="zoom:50%;" /> <img src="C:\Users\vnian\AppData\Roaming\Typora\typora-user-images\image-20220113145215328.png" alt="image-20220113145215328" style="zoom: 67%;" />

# http请求

HTTP 请求报文包括四部分

* 请求行
* 请求头  格式:  『请求头的名字: 请求头的值』
* 空行
* 请求体

```
请求行      GET https://www.baidu.com/?tn=80035161_1_dg HTTP/1.1
请求头       Accept: text/html, application/xhtml+xml, image/jxr, */*         表明客户端所能接受的数据的类型     
            Accept-Language: zh-Hans-CN,zh-Hans;q=0.5                       表明客户端支持的语言类型
            User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko  客户端的字符串标志
            Accept-Encoding: gzip, deflate           表明客户端支持的压缩方式                             
            Host: www.baidu.com                      服务端的主机名
            Connection: Keep-Alive                   连接配置  Keep-Alive 保持连接  close  断开
            Cookie: BD_UPN=1126314751; BD_HOME=1;    Cookie 小甜饼
            Cache-Control: max-age=120               缓存控制
            Upgrade-Insecure-Requests: 1             强制浏览器发送请求时使用 https


```



## 1.请求行



请求行分为三部分

​	请求类型 url http协议版本

```
GET https://www.baidu.com/?tn=80035161_1_dg HTTP/1.1
```

* GET                                       请求方式  常见的 HTTP 的请求方法: GET 和 POST  (PUT DELETE PATCH)
* https://www.baidu.com/?tn=80035161_1_dg   请求的 URL
* HTTP/1.1                                  HTTP协议的版本







> ### URL
>
> url 协议+域名+路径+查询字符串+锚点
>
> ```
> https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1#logo
> ```
>
> * https/http/mongodb/ftp/ssh        协议
> * www.baidu.com                     域名(IP地址)
> * /s                                路径
> * ie=utf-8&f=8&rsv_bp=1&rsv_idx=1   查询字符串(query string)    name=煎饼果子&is_lajiao=0&conghua=1&xiangcai=0
> * `#logo`                             锚点





## 2.请求头



<span style="color:red">注意: 不同的浏览器有不同的`user-Agent`</span>

<img src="C:\Users\vnian\AppData\Roaming\Typora\typora-user-images\image-20220113153426711.png" alt="image-20220113153426711" style="zoom: 80%;" /><>



**Accept**

> 作用： 浏览器端可以接受的`媒体类型` 即返回的数据类型
>
> 例如： Accept: text/html  代表浏览器可以接受服务器回发的类型为 text/html  也就是我们常说的html文档, 

**Accept-Encoding**

> 作用： 浏览器申明自己接收的编码方法，通常指定`压缩方法`，是否支持压缩，支持什么压缩方法。例如：Accept-Encoding: zh-CN,zh;q=0.8

**Accept-Language**

> 作用： 浏览器申明自己接收的`语言`。 

**Connection**  是否保持通道

> `keep-alive  `
>
> ​	当一个网页打开完成后，客户端和服务器之间用于传输HTTP数据的TCP连接不会关闭，如果客户端再次访问这个服务器上的网页，会继续使用这一条已经建立的连接
>
> `close`  
>
> ​	代表一个Request完成后，客户端和服务器之间用于传输HTTP数据的TCP连接会关闭， 当客户端再次发送Request，需要重新建立TCP连接。



**Host**(发送请求时，该报头域是必需的)

> 作用: 请求报头域主要用于指定被请求资源的Internet主机和端口号，它通常从HTTP URL中提取出来的
>
> 例如: 我们在浏览器中输入：http://www.hzau.edu.cn
>
> 浏览器发送的请求消息中，就会包含Host请求报头域，如下：
>
> Host：www.hzau.edu.cn
>
> 此处使用缺省端口号80，若指定了端口号，则变成：Host：指定端口号

**Referer**

> 当浏览器向web服务器发送请求的时候，一般会带上Referer，告诉服务器我是从哪个页面链接过来的，服务器籍此可以获得一些信息用于处理。比如从我主页上链接到一个朋友那里，他的服务器就能够从HTTP Referer中统计出每天有多少用户点击我主页上的链接访问他的网站。

**User-Agent**

> 作用：告诉HTTP服务器， 客户端使用的操作系统和浏览器的名称和版本.
>
> 我们上网登陆论坛的时候，往往会看到一些欢迎信息，其中列出了你的操作系统的名称和版本，你所使用的浏览器的名称和版本，这往往让很多人感到很神奇，实际上，服务器应用程序就是从User-Agent这个请求报头域中获取到这些信息User-Agent请求报头域允许客户端将它的操作系统、浏览器和其它属性告诉服务器。

**cookie**

> Cookie是用来存储一些`用户信息`以便让服务器辨别用户身份的(大多数需要登录的网站上面会比较常见)，比如cookie会存储一些用户的用户名和密码，当用户登录后就会在客户端产生一个cookie来存储相关信息，这样浏览器通过读取cookie的信息去服务器上验证并通过后会判定你是合法用户，从而允许查看相应网页。当然cookie里面的数据不仅仅是上述范围，还有很多信息可以存储是cookie里面，比如sessionid等。

**Cache-Control**

>  用来指定当前的请求/回复中的，是否使用缓存机制。

**Content-Type**

> 请求体的MIME类型 (用于POST和PUT请求中)

**Expect**

> 表示客户端要求服务器做出特定的行为





## 3.请求体

<span style="color:red">GET请求请求体是空的，但是post请求请求体一般不为空</span>

```
POST https://processon.com/login HTTP/1.1
Accept: text/html, application/xhtml+xml, image/jxr, */*
Referer: https://processon.com/login?f=index
Accept-Language: zh-Hans-CN,zh-Hans;q=0.5
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate
Host: processon.com
Content-Length: 61
Connection: Keep-Alive
Cache-Control: no-cache

login_email=779498590@qq.com&login_password=GREM9pus.fek-soos
```

请求体内容

```
login_email=779498590@qq.com&login_password=GREM9pus.fek-soos
```

form 表单

```html
<form method="post">
    <input name="login_email">
    <input name="login_password">
    <input type="submit" value="登录"/>
</form>
```

> 请求体的格式是非常灵活的, 不限于为 url的查询字符串形式,  『任意格式都可以』. 
> 『JSON』与『URL查询字符串』两种形式用的较多









# http响应报文



![img](https://img-blog.csdn.net/20180213114358760)





* 响应行
* 响应头
* 响应空行
* 响应体

```html
HTTP/1.1 200 OK
Bdpagetype: 1
Bdqid: 0xf4330ae2000009bd
Cache-Control: private
Connection: keep-alive
Content-Type: text/html;charset=utf-8
Date: Sat, 07 Nov 2020 03:08:03 GMT
Expires: Sat, 07 Nov 2020 03:08:03 GMT
Server: BWS/1.1
Set-Cookie: BDSVRTM=12; path=/
Set-Cookie: BD_HOME=1; path=/
Set-Cookie: H_PS_PSSID=32815_1424_32952_31254_32970_32723_32961_32937_26350_32913; path=/; domain=.baidu.com
Strict-Transport-Security: max-age=172800
Traceid: 1604718483242292455417596420134845548989
X-Ua-Compatible: IE=Edge,chrome=1
Content-Length: 289603

<!DOCTYPE html><!--STATUS OK-->
<html><head><meta http-equiv="Content-Type" content="text/html;charset=utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta content="always" name="referrer"><meta name="theme-color" content="#2932e1"><meta name="description" content="全球最大的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。"><link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" /><link rel="search" type="application/opensearchdescription+xml" href="/content-search.xml" title="百度搜索" /><link rel="icon" sizes="any" mask href="//www.baidu.com/img/baidu_85beaf5496f291521eb75ba38eacbd87.svg"><link rel="dns-prefetch" href="//dss0.bdstatic.com"/><link rel="dns-prefetch" href="//dss1.bdstatic.com"/><link rel="dns-prefetch" href="//ss1.bdstatic.com"/><link rel="dns-prefetch" href="//sp0.baidu.com"/><link rel="dns-prefetch" href="//sp1.baidu.com"/><link rel="dns-prefetch" href="//sp2.baidu.com"/><title>百度一下，你就知道</title><style index="newi" type="text/css">#form .bdsug{top:39px}.bdsug{display:none;position:absolute;width:535px;background:#fff;border:1px solid #ccc!important;_overflow:hidden;box-shadow:1px 1px 3px #ededed;-webkit-box-shadow:1px 1px 3px #ededed;-moz-box-shadow:1px 1px 3px #ededed;-o-box-shadow:1px 1px 3px #ededed}.bdsug li{width:519px;color:#000;font:14px arial;line-height:25px;padding:0 8px;position:relative;cursor:default}.bdsug li.bdsug-s{background:#f0f0f0}.bdsug-store span,.bdsug-store b{color:#7A77C8}.bdsug-store-del{font-size:12px;color:#666;text-decoration:underline;position:absolute;right:8px;top:0;cursor:pointer;display:none}.bdsug-s .bdsug-store-del{display:inline-block}.bdsug-ala{display:inline-block;border-bottom:1px solid #e6e6e6}.bdsug-ala h3{line-height:14px;
    </style>
    </head>
    <body>
	<div id="bottom_layer" class="s-bottom-layer s-isindex-wrap"><div class="s-bottom-layer-left"><p class="lh"><a class="c-color-gray2" href="//www.baidu.com/cache/setindex/index.html" target="_blank">设为首页</a></p><p class="lh"><a class="c-color-gray2" href="//home.baidu.com" target="_blank">关于百度</a></p><p class="lh"><a class="c-color-gray2" href="http://ir.baidu.com" target="_blank">About Baidu</a></p><p class="lh"><a class="c-color-gray2" href="https://isite.baidu.com/site/e.baidu.com/d38e8023-2131-4904-adf7-a8d1108f51ef?refer=888" target="_blank">百度营销</a></p><p class="lh"><a class="c-color-gray2" href="//www.baidu.com/duty" target="_blank">使用百度前必读</a></p><p class="lh"><a class="c-color-gray2" href="//help.baidu.com/newadd?prod_id=1&category=4" target="_blank">意见反馈</a></p><p class="lh"><a class="c-color-gray2" href="//help.baidu.com" target="_blank">帮助中心</a></p></div><div id="s-bottom-layer-right" class="s-bottom-layer-right"><span class="lh">&#169;2020&nbsp;Baidu&nbsp;</span><span class="lh">(京)-经营性-2017-0020</span><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11000002000001"  target="_blank"><span class="lh s-bottom-recordcode">京公网安备11000002000001号</span></a><span class="lh">京ICP证030173号</span></div>

```

## 1.响应行

```
HTTP/1.1 200 OK
```

* HTTP/1.1          协议的版本
* 200               响应的状态码
* OK                响应的状态字符串

常见的响应状态码:

* 200      成功
* 302      跳转
* 404      找不到资源
* 403      禁止的
* 500      服务器内部错误

响应状态码 MDN地址 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status

```
信息响应(100–199)，
成功响应(200–299)，
重定向(300–399)，
客户端错误(400–499)
服务器错误 (500–599)
```

## 2.响应头

响应头格式与请求头格式一致  『名字: 值』

```
Bdpagetype: 1
Bdqid: 0xf4330ae2000009bd
Cache-Control: private
Connection: keep-alive
Content-Type: text/html;charset=utf-8
Date: Sat, 07 Nov 2020 03:08:03 GMT
Expires: Sat, 07 Nov 2020 03:08:03 GMT
Server: BWS/1.1
Set-Cookie: BDSVRTM=12; path=/
Strict-Transport-Security: max-age=172800
Traceid: 1604718483242292455417596420134845548989
X-Ua-Compatible: IE=Edge,chrome=1
Content-Length: 289603
```

Bdpagetype 和 Bdqid 为百度自定义的响应头

* Cache-Control      缓存控制  private 只允许客户端缓存数据  public
* Connection         连接设置
* <span style="color:red;font-weight: bold">Content-Type</span>      『响应体』内容的类型   
  * https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  * text/html 表明响应体为 HTML 内容
  * text/css   表明响应体为 CSS 内容
  * application/javascript  表明响应体为 JavaScript
  * image/png  表明响应体为 png 的图片
* Date      响应时间
* Expires   过期时间
* Server    服务器信息
* Set-Cookie   设置 cookie
* Strict-Transport-Security    响应头与Upgrade-Insecure-Requests结合使用
* Traceid   跟踪 id
* X-Ua-Compatible      IE=Edge,chrome=1 强制IE浏览器使用最新的解析器解析网页, 使用 chrome 的内核解析网页
* Content-Length   响应体的长度

## 3.响应体

响应体格式比较灵活, 场景的格式有

* HTML
* JavaScript
* CSS
* JSON
* 图片



# chrome查看响应头

![image-20220113155553868](C:\Users\vnian\AppData\Roaming\Typora\typora-user-images\image-20220113155553868.png)

