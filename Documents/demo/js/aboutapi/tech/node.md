# node


## 知识


## Express知识点

### process.env.NODE_ENV 设置
>/ect/profile
添加 


### app=express()

#### app.use
* 使用解析中间件，到express应用中，从而增加更多功能 
var express=require('express'),bodyparser=require('body-parser');
var app=express();
app.use(bodyparser());//使用输出 html

#### app.send
* 输出html内容到浏览器

#### app.set
* 设置属性赋值类似 var a='jack',console.log(a);

app.set('a','jack');
app.get('a')//jack

#### app.get(name)
* 获取属性功能

app.get('a');//如上

#### app.get(path,callback)
* 路由功能

app.get('/',funciton(req,res){
	//todo
	console.log(req.body);
	res.send('ok')
})


#### app.render
* 渲染html页面到浏览器，与send有点类似，但render是渲染整个页面


#### next()
* 继续匹配后面的路由

### request
* 获取变量三种
* req.body
* req.query
* req.params

//params
app.get('/user/:id', function(req, res){
  res.send('user ' + req.params.id);
});

//query
https://www.taoring.com/search?q=tobi+ferret
req.query.q

//body
form表单
req.body.name



### response
* 输出内容






#### res.render
* 内部也是调用了app.render

## express-validator 验证表单中间件
>验证表单内容

[api传送门](https://www.npmjs.com/package/express-validator#check-api)


## cookie-parser中间件
* cookie
[api传送门](https://github.com/expressjs/cookie-parser)

```
app.get('/',function(req,res,next){
	//output cookies
	console.log(req.cookies);
})
```
## morgan日志http
> 主要针对http请求输出日志


## winston日志中间件
> 提供输出日志文件，及高并发大数据的中间件
* 问题定位
* 调试
* 系统性能调优
* 异步日志


## jfum上传文件
* jquery上传文件中间件

[api传送门](https://www.npmjs.com/package/jfum)

## superagent调用http接口
* 是nodejs调用http接口的中间件

[api传送门](https://www.npmjs.com/package/superagent)

var request=require('superagent');
request.get('/getuserinfo').query({name:'jack'}).end(function(err,res){
	console.log(res);
})

## body-parser
* 用来配置该功能到Express中
[api传送门](https://www.npmjs.com/package/body-parser)

```
var app=express();
app.use(bodyParser.json({ type: 'application/*+json' }));
//or
app.use(bodyParser.text({ type: 'text/html' }));
```

## sequelize
* nodejs中的mysql的js框架，可以利用脚本控制操作mysql数据库

>提供对 MySQL，MariaDB，SQLite 和 PostgreSQL 数据库的简单访问，通过映射数据库条目到对象，或者对象到数据库条目。简而言之，就是 ORM（Object-Relational-Mapper）。Sequelize.js 完全是使用 JavaScript 编写，适用于 Node.js 的环境。


并且安装下面的中间件，以得到互相配合
```
# And one of the following: 
$ npm install --save pg pg-hstore
$ npm install --save mysql2
$ npm install --save sqlite3
$ npm install --save tedious # MSSQL 
```

[api中文版](https://demopark.github.io/sequelize-docs-Zh-CN/)
[github](https://github.com/demopark/sequelize-docs-Zh-CN)

## 架构逻辑
* 表示层=(调用)=>控制层，控制层=(调用)=>业务层，业务层=(调用)=>数据访问层。 


## DAO数据访问层
* 数据访问对象
* Data Access Object
* 是操作修改，添加，删除数据库操作的一个公共类库包
* 一般对数据库要操作的所有文件脚本，都放在Dao文件夹下或包类

## Service业务层
*建立目录作为业务层架构
* 业务层调用封装好的功能模块，

## module.exports与exports区别

* exports == module.exports
* 用来加载require内的代码，并导出代码

从官方描述
function require(...){
	
//...
((module,exports)=>{

exports=some_func;
module.exports=some_func;

})(module,module.exports)
return module
}


## koa
* 与express类似，并且更小
* 提供轻量优雅的函数库

### 研究koa的功能



[api传送门](https://koa.bootcss.com/)

## token
>令牌（临时）的意思

*特点

- 随机性
- 不可预测性
- 时效性
- 无状态、可扩展


*基于Token的身份验证方法

- 客户端使用用户名和密码请求登录
- 服务端收到请求，验证登录是否成功
- 验证成功后，服务端会返回一个Token给客户端，反之，返回身份验证失败的信息
- 客户端收到Token后把Token用一种方式(cookie/localstorage/sessionstorage/其他)存储起来
- 客户端每次发起请求时都选哦将Token发给服务端
- 服务端收到请求后，验证Token的合法性，合法就返回客户端所需数据，反之，返回验证失败的信息


## nodejs 中的mysql安全性

使用escape()对传入参数进行编码
var userId = 1, name = 'test';
var query = connection.query('SELECT * FROM users WHERE id = ' + connection.escape(userId) + ', name = ' + connection.escape(name), function(err, results) {
    // ...
});
console.log(query.sql); // SELECT * FROM users WHERE id = 1, name = 'test‘


使用connection.query()的查询参数占位符
var userId = 1, name = 'test';
var query = connection.query('SELECT * FROM users WHERE id = ?, name = ?', [userId, name], function(err, results) {
    // ...
});
console.log(query.sql); // SELECT * FROM users WHERE id = 1, name = 'test'



使用escapeId()编码SQL查询标识符
var sorter = 'date';
var sql    = 'SELECT * FROM posts ORDER BY ' + connection.escapeId(sorter);
connection.query(sql, function(err, results) {
  // ...
});

使用mysql.format()转义参数
var userId = 1;
var sql = "SELECT * FROM ?? WHERE ?? = ?";
var inserts = ['users', 'id', userId];
sql = mysql.format(sql, inserts); // SELECT * FROM users WHERE id = 1
	
## mysql中的sql语句
//第?行开始，取20行
* select * from users where limit ?,20;




## jwt 中间件
* 生成token

## mocha & jasmin & karma
* 测试框架



## node-sass
提供了一个nodejs到libsass的桥梁   ， css预处理器sass的c版本



## npm install -g node-gyp
node-gyp 跨平台命令工具，
包存放地/usr/local/lib/node_modules/

## nodejs开发环境配置
>vi ~/.bash_profile
* window
> set NODE_ENV=development
* linux
export NODE_ENV=development


## 同源策略

要想接口带cookie，就需要同源策略
1.网站与服务器放在一台机器
2.服务端进行set cookie
3.客户端才可以get cookie
4.可以在不同目录，不同tomcat



---------------------------------------------------------nginx Access-Control-Allow-Origin权限设置问题

nginx 
//
post,get,options
Access-Control-Allow-Origin

那么nodejs express设置的core插件库就会冲突

--------------------------------------------npm link
 建立脚手架的基本命令
 “bin":{
 	"css3d-cli":"./bin/css3d-cli.js"
 }

 执行后会在/usr/local/bin出现脚本文件，也就是执行文件

--------------------------------------------libsass
libsass 是一个用 C 语言实现的 Sass 解析器

特点是简单、速度快而且易于集成

--------------------------------------------path.join()和path.resolve()有什么区别呢?

path.join([path1][, path2][, ...]) 
用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是/，Windows系统是\。
path.resolve([from ...], to) 
将 to 参数解析为绝对路径。

path是nodejs内置模块
path是node.js内置的package，用来处理路径的。
--------------------------------------------mac 下 profile文件

当你的home下面有.bash_profile或者.bash_login的时候,会忽略调.profile.   
稍微调查了一下,做个笔记   
主要有一下几种方式   
/etc/profile    
~/.bash_profile    
~/.bash_login    
~/.profile    
~/.bashrc    
~/.bash_logout   
  
/etc/profile   
登录的时候读入,默认的设定文件.   
~/.bash_profile   
登录之后在/etc/profile载入之后载入,十分重要的配置文件   
~/.bash_login   
登录之后如果~/.bash_profile不存在的话,载入这个文件   
~/.profile   
登录之后~/.bash_login不存在的话,才载入这个文件   
~/.bashrc   
bash shell打开的时候载入   
etc下的配置是针对系统,~下的主要是针对用户  


--------------------------------------------yarn

curl -o- -L https://yarnpkg.com/install.sh | bash
cd /opt

下载压缩包 wget https://yarnpkg.com/latest.tar.gz
sudo tar zvxf latest.tar.gz

mac下修改环境变量http://jingyan.baidu.com/album/d2b1d1029c1ea65c7e37d4c9.html?picindex=1
具体操作：
$ touch ~/.bash_profile
$ vi .bash_profile
$ i编辑

添加export PATH="$HOME/.yarn/bin:$PATH" 

==============
path:  https://yarnpkg.com/en/docs/install


==============
brew install android-sdk下载出错，报权限：
解决方案：
sudo chown -R "$USER":admin /usr/local

http://stackoverflow.com/questions/16432071/how-to-fix-homebrew-permissions

--------------------------------------------node
显示内容
cat 文件 

打开当前文件夹视图
open ./

wget不是安装方式 ,下载软件,  
wget <==> 迅雷
wget 下载地址

ap-get <==> brew
是ubuntu下的一个软件安装方式，它是基于debain。       

yum
是redhat、centos下的一个软件安装方式，它是基于Linux的

node服务器自带http插件


require('http')选择以什么方式输出
1，"text/plain"，按原文本输出
2，"text/html"，按标签代码输出


========================tar
帮助
tar -h
解压
tar xzvf 压缩包

========================make
Make：编译程序

## ========================module.exports 与exports区别

* 每次定义，module内部都有exports对象
* module对象，exports属性

* module.exports 被改变的时候，exports不会被改变
* Module.exports才是真正的接口,exports只不过是它的一个辅助工具

* 而模块导出的时候，真正导出的执行是module.exports，而不是exports

exports是module.exports的一个变量
//1
module.exports ={};
exports = module.exports;

//2
exports=module.exports={};

等同
1<==>2

module.exports 指向新的对象时，exports 断开了与 module.exports 的引用，那么通过 exports = module.exports 让 exports 重新指向 module.exports 即可


理论：
1,module.exports 初始值为一个空对象 {}
2,exports 是指向的 module.exports 的引用
3,require() 返回的是 module.exports 而不是 exports

example:

A.js
----------

module.exports =function(){}


B.js
----------
function ok(){
	//todo
}
可以自定义对象pp
exports.pp=ok

index.js
----------
var res=require('A');
res.pp();

var obj=require('B');
obj();

========================安装Ruby

rvm list known

下载2.2.0
rvm install 2.2.0

当前版本使用2.2.0
rvm use 2.2.0

默认定义到2.2.0
rvm use 2.2.0 --default 

显示当前所选版本
rvm list
========================nvm
nvm 是 Mac 下的 node 管理工具,有点类似管理 Ruby 的 rvm

========================Gem管理ruby库包工具
Gem是一个管理Ruby库和程序的标准包
更换数据源
gem sources --remove https://rubygems.org/
gem sources -a https://ruby.taobao.org/


========================安装cocoapods
cocoapods类库管理工具,属于ios的工具

gem install cocoapods

========================cocoapods命令
$ pod --version


========================source命令

在当前bash环境下读取并执行FileName中的命令
source在当前bash环境下执行命令,而scripts是启动一个子shell来执行命令

通过文件（命令列）设置环境变量时，要用source 命令

source .bash_rc 与 
..bash_rc 是等效的。

如使用git:
source 'http://git.oschina.net/akuandev/Specs.git'




========================ruby的框架工具
bundler
http://www.openhome.cc/Gossip/Rails/Bundler.html


rails 开发数据库驱动的网络应用程序的完整框架
http://baike.baidu.com/link?url=Fh3KAJDjngCoCqrCzgVJlwBaXrZIpeO4h3RpD7YH7aFu6Iv1X0icprqo-BBRalGQxwVpoRYL1ACQmVodJsKbWK
========================
基本概念:npm 执行的语句是在 $home下，也就是当前用户文件夹下面
环境变量是在/opt


如果使用了 NPM 3 以上版本，需要手工安装依赖库
npm i -D webpack ts-loader

npm i 只是 npm install 的简写

更新node版本
step1
npm install -g n
step2
n laster

更某个版本
npm install express@3.0.6

移除
npm remove <name>

更新
npm update <name>

列表
npm ls


npm install 安装package.json里面的配置包



### Express

* next()作用
> 终结请求,必须有，不然会被挂起，无效




========================
开源文件传输工具
curl
显示网页
curl www.taoring.com

保存网页
curl http://www.linuxidc.com > page.html

使用的proxy服务器及其端口：-x 
curl -x 123.45.67.89：1080 -o page.html http://www.linuxidc.com 


自定义下载
curl -o #2_#1.jpg http://cgi2.tky.3web.ne.jp/~{zzh,nick}/[001-201].JPG 
#1是变量，指的是{zzh,nick}这部分，第一次取值zzh，第二次取值nick
#2代表的变量，则是第二段可变部分---[001-201]，取值从001逐一加到201
下载解决重名问题
原来： ~zzh/001.JPG ---> 下载后： 001-zzh.JPG


分段下载
curl -r 0-10240 -o  "zhao.part1" http:/cgi2.tky.3web.ne.jp/~zzh/zhao1.mp3 &\

get和post请求
curl http://www.yahoo.com/login.cgi?user=nickwolfe&password=12345 
而POST模式的option则是 -d 
比如，curl -d "user=nickwolfe&password=12345" http://www.yahoo.com/login.cgi

========================

改文件及后缀名
mv composer.phar composer

修改权限
chmod a+x composer
========================
vi 文本编辑保存退出

$ vi 文件

$ i 进行编辑

$ :wq 保存退出

========================

--------------------------------------------------webstorm 内存改变
找到WebStorm.exe.vmoptions这个文件，路径如下:
webstorm安装主目录>bin>WebStorm.exe.vmoptions


-d64 # #此项根据你实际Java版本设置 //@TODO 建议升级java x64
-server
-Xms1024m #此项根据你实际内存大小设置 本人8g
-Xmx4096m  #此项根据你实际内存大小设置 本人8g
-XX:MaxPermSize=1024m   #此项根据你实际内存大小设置 本人8g
-XX:ReservedCodeCacheSize=240m  #此项根据你实际内存大小设置 本人8g
-XX:+UseCompressedOops
-Xss4m
-ea
-Dsun.io.useCanonCaches=false
-Djava.net.preferIPv4Stack=true
-XX:+UseCodeCacheFlushing
-XX:+UseConcMarkSweepGC
-XX:SoftRefLRUPolicyMSPerMB=50
-XX:MinHeapFreeRatio=15
-Xincgc


=================================================mac部分命令


查找路径
which 工具名称|文件名
whereis  工具名称|文件名
＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
rm -r 强制删除带有文件的文件夹 
＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
rmdir也是删除文件夹
rm删除文件

mkdir创建文件夹

pwd 显示当前目录/ npm root 

cat 显示文件内容

touch新建文件
=================================================



---------------------------------------------npm命令
npmjs.org
开源项目提交 
$ npm init
$ touch README.td
$ npm publish


---------------------------------------------版本号管理

<version> <重构版本><增加><bug修复版本>

修复<版本><0><版本+1>

增加功能<版本><版本+1><0>

重构<版本+1><0><0>



---------------------------------------------code-push
CodePush 是微软开发的，可以实时更新 React Native 和 Cordova 应用

更新版本
code-push release <应用名称> <Bundles所在目录> <对应的应用版本>
    --deploymentName 更新环境
    --description 更新描述
    --mandatory 是否强制更新

1,Production是对应生产环境的
2,Staging是对应开发环境的

step link:
http://microsoft.github.io/code-push/

step1 sudo npm install code-puch-cli -g
step2 code-push register
step3 code-push app add aya
step4 info.plist 添加CodePushDeploymentKey关键词，对应加上key
step5 code-push deployment ls aya -k
====================================================
Production │ LpeM5P3eOJQwU18Csm9jI6aLAM4_4yOJZDrUW
Staging    │ ndJatg3wyjZkQHpXN1-l_9bF05nS4yOJZDrUW 
====================================================
step6 code-push release-react aya ios
生成app到codepush中心


其他命令
注册code-push register
登陆 code-push login
注销 code-push logout
列出 登陆的token    
code-push access-key ls
删除某个access-key
code-push access-key rm <accessKey>

key列表code-push deployment ls aya -k

所有app列表 code-push app ls

更名 code-push app rename 旧名字 新名字
删除 code-push app rm 旧名字

部署管理:
添加app部署名 code-push deployment add app名字 部署名字(如:dev  alpha beta)   
重命名部署名	code-push deployment rename app名字 旧部署名字 新部署名字
删除部署名字  code-push deployment rm app名字 部署名字
列表部署名字 code-push deployment ls app名字

---------------------------------------------cli

CLI（command-line interface，命令行界面）

---------------------------------------------npm命令
slowsay/SLOWSAY123

常用命令http://www.cnblogs.com/linjiqin/p/3765772.html

更新npm版本
npm update

=============================================================
打包发布到npm平台http://blog.csdn.net/cengjingcanghai123/article/details/44233047

自己组件链接github项目路径 
package.json添加方法：
｛
“scripts”:{
	start:"node ./server.js",
	build:"webpack"	
},
"repository" :  
  { "type" : "git"  
  , "url" : "https://github.com/<yourusername>/testmypublish.git"  
  }  
｝
step：
检查该文件是否存在，提交npm作用
$ touch README.md(建立文件)
$ vim ~/.npmrc
$ mkdir test文件夹
$ cd test
$ npm init/vim package.json
$ npm adduser或npm login
$ npm publish

$ npm unpublic删除发布版本

运行package的配置
$ npm run build //运行package配置文件中的build命令



path.join('webpack','path');//相对路径
将多个参数组合成一个 path
> path.join('webpack','path');
> 'webpack/path'



path.resolve(from,to);//绝对路径
1.说明、接收参数、语法、使用实例和实现源码
from      源路径
to        将被解析到绝对路径的字符串
> path.resolve('pp','ok');
> '/Users/slowsay/Documents/demo/js/aboutwebpack/src/dist'

2.作为cd使用
> path.resolve('../');
> '/Users/slowsay/Documents/demo/js'



module.filename
开发期间，该行代码所在的文件。

__filename：
始终等于 module.filename。

__dirname：
开发期间，该行代码所在的目录。

process.cwd()：
运行node的工作目录，可以使用  cd /d 修改工作目录。

require.main.filename：
用node命令启动的module的filename, 如 node xxx，这里的filename就是这个xxx。

require()方法的坐标路径是：module.filename；fs.readFile()的坐标路径是：process.cwd()。

### crypto内置中间件
>创建hash等，用于加密码

### lru-cache中间件


=============================================================


---------------------------------------------vim
命令集
$ vim 文件名
编译区
i 进入文档编译
esc 切换输入命令
:wq 保存并退出 


http://www.cnblogs.com/lee0oo0/p/3548030.html

---------------------------------------------nano
GNU nano编辑器命令


---------------------------------------------typings

typings是typescript

typings install node --ambient --save
typings install lodash --save

---------------------------------------------bower
bower是网络客户端软件包管理器,基于内容来自于github
YeoMan和Grunt是建立在bower基础上开发的应用

---------------------------------------------brew
brew是mac 的软件包管理工具

brew install 工具名
brew uninstall 工具名
brew list           列出已安装的软件
brew update     更新brew
brew home       用浏览器打开brew的官方网站
brew info         显示软件信息
brew deps        显示包依赖

----------------------------------------------Ruby
用RVM

#查看当前ruby版本  
$ ruby -v  
ruby 1.8.7  

#列出已知的ruby版本  
$ rvm list known  

#安装ruby 1.9.3  
$ rvm install 1.9.3  


下载rvm的方式
$ curl -L get.rvm.io | bash -s stable  


RVM 还可以自动加载 gemset。
例如我们有一个 Rails 3.1.3 项目，需要 1.9.3 版本 Ruby，整个流程可以这样。
rvm install 1.9.3
rvm use 1.9.3
rvm gemset create rails313
rvm use 1.9.3@rails313

使用 RVM 快速部署 Nginx + Passenger

首先安装 Passenger

gem install passenger
然后使用 passenger-install-nginx-module 来安装 Nginx 和部署。

因为这一步需要 root 权限（因为要编译 Nginx）可以用 rvmsudo 这个东西（这个东西真是个好东西）。

rvmsudo passenger-install-nginx-module


--------------------------------------------------nodejs
优点：
	1.事件驱动、异步编程，为网络服务而设计
	2.处理高并发场景性能更高
		socket.io 性能高于  ajax polling 
	3.函数式编程非常适合写异步回调链


缺点：
	1.单进程，单线程
	2.可靠性低
	3.大量匿名函数使异常栈变得不好看
	4.无法以 request 为单位 catch 异常，用第三方库回调抛异常（用on('error')封装第三方库catch）

解决缺点：
	1.开启多个进程，每个进程绑定不同的端口
	2.用反向代理服务器如 Nginx 做负载均衡
		引入了一个间接层
	3.多进程绑定在同一个端口侦听
		patch (https://link.zhihu.com/?target=http%3A//www.lst.de/%7Eokir/blackhats/node121.html)
	4.一个进程负责监听、接收连接 (把接收到的连接平均发送到子进程中去处理)
	5.cluster库，支持多进程运行方式
	6.
适用场景：
	1.单页面、多Ajax请求应用
	2.JSON APIs
	3.基于Node.js开发Unix命令行工具
		Node.js 大量生产子进程，流方式输出，适合做Unix命令行工具

不利场景：
	1.NoSQL + Node.js——仅仅是追求时髦，nosql替换成mysql


系统性能考虑：
	1.JavaScript引擎Google V8
	2.原生异步IO模型 （处理数以千计的并发请求非常轻松）

supervisor
	优点：解决开发中调试问题，实时检测
	缺点：有bug立即中止

