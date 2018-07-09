---------------------------------------------php

$ sudo apachectl start
$ sudo apachectl restart
$ sudo apachectl stop

出现使用Apache不能访问，本地虚拟网站时，可以以下方法解决

1，/etc/apache2/httpd.conf  修改“#LoadModule php5_module”，定位需要修改的位置，去掉前面的#，保存关闭。  

2，重启 Apache

3，/Library/WebServer/Documents，下部署网站


php区分大小写
变量$开头
$name  =  var name

判断mysql是否安装
<?php
phpinfo();
?>

$ ln -s 
=======================(->,::,=>)三种语义解释

(->在php中是一个对象操作符)
如：
class db{
   public $host;
   public function printHost(){
       echo $this -> host;
   }
}
$o=new db();
$o->host='fuckyou';//设置属性
$o->printHost();//调用方法


(：：是调用类中的方法)
db::printHost()


(=>通常用于array数据赋值)
array('name'=>'fuckyou');

{'name':'fuckyou'};

=======================

$this代表自身的对象。
$this->abc,是存取对象上的属性和方法。
$this->$name 是以$name的内容作为对象的属性名称，存取对象属性
比如先指定$name=‘address’;
$this->$name 就等价于$this->address;



---------------------------------------------discuz论坛框架
1.cache 处理经验
2.PHP与MySQL组合 
3.最优化的算法和数据结构
4.占用数据库资源最小，页面处理时间最短
5.P4 级 UNIX 主机上
6.100 万贴论坛平均页面处理时间不超过 0.03 秒
7.最大承载在线人数超过 5000 人
8. Web 和数据库分离的双机系统，负载能力和速度都将获得更大的提升


数据库
1.有专有错误处理模块
2.数据库操作类实现专门设计数据库存取
3.通过 Email 实时报告数据库错误
4.程序内核中查询遵循 ANSI SQL 规范（http://baike.baidu.com/view/3818934.htm）

---------------------------------------------ANSI SQL标准

第一部分：SQL/结构，指定实现一致性的一般性需求，定义SQL的基本概念；

第二部分：SQL/基础，定义SQL的原发和操作；

第三部分：SQL/调用级接口，定义程序编程与SQL的接口；

第四部分：SQL/持久存储模块，定义控制结构，进而定义SQL例程。还定义了包含SQL例程的模块；

第五部分：SQL/主机语言绑定，定义SQL的扩展，用户通过使用数据包裹支持外部数据管理，还定义了数据链类型；

第六部分：对象语言绑定，定义SQL的扩展，支持把SQL语句内嵌到用Java编写的程序；

第七部分：信息和定义方案：定义信息方案和定义方案的规范，提供与SQL数据相关的结构和安全信息；

---------------------------------------------结构化查询语言(SQL)

“结构化查询语言(SQL)”是与关系型数据库 进行通信的 标准语言

---------------------------------------------数据库管理系统 RDBMS
Oracle的mysql

IBM的DB2

微软的SQL Server


---------------------------------------------Composer

Composer 是 PHP 中用来管理依赖(dependency)关系的工具.

获取最新版本
$ php composer self-update


建立composer.json
{
	"require":{
	"monolog/monolog":"1.0.*"
	}
}

$php composer install 


------------------------------------------PHP防止用户重复提交表单

1.前端JavaScript在按钮被点击一次后禁用，即disabled

2.提交后做redirect页面重定向，即提交后跳转到新的页面，主要避免F5重复提交，但是也有不足之处。

3.是数据库做唯一索引约束

4.就是做session令牌验证



如下程序：
表单中加一个input隐藏域，即type="hidden"，其value值用来保存token值，当页面刷新的时候这个token值会变化，提交后判断token值是否正确，如果前台提交的token与后台不匹配，则认为是重复提交

< ?php
/* * PHP简单利用token防止表单重复提交 */
session_start();
header("Content-Type: text/html;charset=utf-8");
function set_token() {
$_SESSION['token'] = md5(microtime(true));
}
function valid_token() {
$return = $_REQUEST['token'] === $_SESSION['token'] ? true: false;
set_token();
return $return;
}
//如果token为空则生成一个token
if(!isset($_SESSION['token']) || $_SESSION['token']=='') {
set_token();
}
if(isset($_POST['web'])){
if(!valid_token()){
echo "token error，请不要重复提交!";
}else{
echo '成功提交，Value:'.$_POST['web'];
}
}else{
?>
}
?>

----------------------------------------优化数组
