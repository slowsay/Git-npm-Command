-----------------------------------------------时间计算
var begintime_ms = Date.parse(new Date(begintime.replace(/-/g, "/"))); //begintime 为开始时间

var endtime_ms = Date.parse(new Date(endtime.replace(/-/g, "/")));   // endtime 为结束时间

得到的结果为 毫秒数，可根据 毫秒数的大小，来判断时间。

当然根据毫秒数 可以根据他们的差值 来求相差的天数或是小时等。


以上是求得 用户输入时间的毫秒数

var date1=new Date();  //开始时间
var date2=new Date();    //结束时间
var date3=date2.getTime()-date1.getTime()  //时间差的毫秒数


//计算出相差天数
var days=Math.floor(date3/(24*3600*1000))
 
//计算出小时数

var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
var hours=Math.floor(leave1/(3600*1000))
//计算相差分钟数
var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
var minutes=Math.floor(leave2/(60*1000))
//计算相差秒数
var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
var seconds=Math.round(leave3/1000)
alert(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
-----------------------------------------------

### window.location 与window.locatin.href
* window.location==window.locatin.href的简写


模块加载器requirejs,seajs
	模块化开发理念
	核心价值是让 JavaScript 的模块化开发变得更简单自然。


文件加载器labjs
	Loading异步并行加载
	Blocking 是指同步等待执行

	script 和 wait两大特性

---------------------------------------------qr图，不能识别原因
在手机端
需要margin来处理

去掉手机端小键盘 用
var input = document.getElementById("user");
input.blur();


### call与apply的区别

*接受参数方式不同,前者变量，后者数组

* call(对象,变量,变量...)


* apply(对象,数组);



function pp(c,d){
	console.log(arguments);//参数值
	return this.a+this.b+c+d;
}

//1+2+5+9;
pp.apply({a:1,b:2},[5,9]);

//1+2+3+4;
pp.call({a:1,b:2},3,4);


---------------------------------------------构造继承

function bb(){
	this.name='jack';
}
var child=function(){
	bb.apply(this,arguments);//通过apply调用父类的构造函数
}
bb.render.prototype=function(){
}
bb.render.prototype.controtor=bb.render;
var p=new bb();


---------------------------------------------prototype.apply

与call类似，
call()方法，接受的是一个参数列表

apply接受的是一个包含多个参数的数组

---------------------------------------------原型继承

var pp=function(){

}
pp.prototype.render=function(){
};

var ok=new pp();
ok.render();

---------------------------------------------混合继承

function bb(){
	this.name='jack';
}
bb.prototype.render=function(){

};
var ok=new bb();
ok.render();

---------------------------------------------特殊功能
～～是一种利用符号进行的类型转换,转换成数字类型
var ok=～～（300/2）,console.log(ok);

---------------------------------------------正则表达式
//匹配bat,cat，不区分大小写
var a=/[bc]at/i

global  g
ignoreCase i


---------------------------------------------falcor挑选数据请求
var model=new falcor.Model({
	source:new falcor.HttpDataSource('/model.json')
})
//所要请求的变量可以自己选择，以显示选择的变量，来返回数据
model.get(['id',{from:0,to:1},'name'],['id','length']).then(function(e){
	console.log(JSON.stringify(e))
})




---------------------------------------------jif

---------------------------------------------ajax跨域
ajax是利用xmlhttprequest,后台与服务器交换数据

- ie6-
new ActiveXObject("Microsoft.XMLHTTP");

- ie7+
xmlhttprequest
	xml.open(method,url,async)
	xml.send(string)//string只能是post请求时才可以
	xml.setRequestHeader(header,value)//添加http头
	xml.responseText//获取字符串形式
	xml.responseXML//获取xml数据
	xml.onreadystatechange//事件
	xml.readyState//获取onreadystatechange事件，状态值0-4
	xml.status//返回结果

- post
1.无法使用缓存文件
2.发送大量数据
3.发送未知字符数据，用户输入时体现

- get
一个简单的获取请求

服务器响应


1.代理
2.XHR 
	head('access-control-allow-origin:*');
3.jsonp

---------------------------------------------bind,call,apply区别
- bind
> es5中的函数扩展方法，改变函数内部上下文this.
	与call类似，bind(this),call(this) 
	prototype.js和MooTools.js也是类似于jquery

	//one
	function pp(n,id){
		console.log(n,id);
	}
	var a=pp.bind('ok',1);
	//two
	var d=document.getElementById('input'),t=d.g('text');
	d.onclick=function(){
		console.log(t.id);//t
	}.bind(t);

- call
> 调用一个对象的一个方法，以另一个对象替换当前对象。
> 通常用于继承

Prometheus.objectContainer=function(){
	Prometheus.Object.call(this);
}

- apply
> 应用某一对象的一个方法，用另一个对象替换当前对象

	apply(obj,[...])

	var fun = new function () {
	        this.a = 'fun'
	};
	var myfun = function (x, y, z) {
	    console.log(this, x, y, z);//e,y,undefined
	}
	myfun.apply(fun, ['e', 'y']);





----------------------------------------------性能优化一些建议
优化建议
	1.少用with,以免增加作用域链长度，加大查找时间
	2.少用浮点数，尽量int
	3.尽量少出现var，最好整个变量定义符只有一个
	4.使用直接量，var obj={},arr=[],reg=/../;
	5.尽量使用innerHTML
		document.body.innerHTML=['<p></p>'];
	6.多用clone，代替createElement
	7.多用firstChild,nextSibling，代替childNodes遍历dom树
	8.删除节点之前要，清除该节点事件
	9.优化循环
		减值循环
		简化终止条件
			for(var i=0,arr=box;i<arr.length;i++)
	10.少用for in,它会增加散列键
	11.少用eval函数
	12.置空dom对象
		var a=d.g('div');
		a.onclick=function(){...}
		a=null;
	13.释放dom元素
		将dom元素的innerHTML设置为空字符串
	14.释放javascript对象
		obj=null
		delete obj
	15.string的隐式装箱
		’xxx’.length，浏览器会进行一个隐式的装箱操作,
		用String('xxx').length解决
	16.松散耦合
		解耦HTML/JavaScript
			脚本写在js文件中，引入 到html中
		解耦CSS/JavaScript
			div.style.color='red',改写成.color{color:#ff0},div.className('color');
		解耦应用程序/事件处理程序
			不用时，即时off掉事件
性能的注意		
1.尽量使用原生方法
2.switch比if快
3.位运算较快
4.巧用||和&&布尔运算符


刷新率: fps（frame per second）
显示器刷新频率是60Hz，如果网页动画也是60fps，那么就可以同步，非常好的体验，每次渲染<16.66ms



----------------------------------------------xss攻击（Cross Site Scripting）跨站脚本攻击
主要是在提交表单时，引入恶意脚本

对这种屏解决方案：
	http-only、crossdomian.xml

test.php
<html>
<body>
<form action='' method='get'>
<input type='test' name='test_xss' />//<script>console.log('ok');</script>
<input type='submit' />
</form>
<?php
$xss=$_GET('test_xss');
echo $xss;//<script>console.log('ok');</script>
?>
</body>
</html>
这种情况相当于在html页中插入脚本，导致页面出问题


----------------------------------------------javascript
直译式脚本语言，是一种动态类型、弱类型、基于原型的语言，内置支持类型

解释器被称为JavaScript引擎，为浏览器的一部分，广泛用于客户端的脚本语言

- ecma262 script标准=是javascript早期统称

- JavaScript的官方名称是ECMAScript 2015==es5,ECMAScript 2016==es6

- es6 增加模块与类，并提出es7
  未来es7 异步方法、定型对象、并行JavaScript、类修饰符以及observables


- BOM(浏览器对象)
	核心：window是双重功能
		1,js访问浏览器窗体的一个接口
		2,也是js一个global对象
	window可以访问isNaN()、isFinite()、parseInt()、parseFloat()等方法

	var a=20;
	console.log(window.a);//20



- 变量，函数，操作符都区分大小写
  var do ,Do

- 操作符: =(给值)，==（判断）,++,--，typeof,instance 等等

	- 一元操作符
		var a=0;
		var p=++a;//1 =>a=a+1
		var k=a++;//0 =>a=0
		所以为何要在for里用i++后加的值
	- 位操作符
		1.	或|，有1出1，全0出0
			var a=3|1;//0011 | 0001 = 011,
		2.	>>有符号右移，>>>无符号右移
			var a=4>>1,b=4>>>1;//2,2 =4/2
			0>>>1,1>>>1//0,0
		3.	<<有符号左移
			var a=4<<1;//8 =4*2

- 函数是操作符的集合，指令集合

- 标识符是，变量，函数的名称id
	标识符，不能用关键词，

- 严格模式
	"use struct";对不安全操作，会抛出错误，ie10+
	此模式下，不能定义eval，arguments等作为变量名

- c语言风格，多语句｛｝括到一起 推荐使用：if(){};

- 早期保留字
abstract enum int short
boolean export interface static
byte extends long super
char final native synchronized
class float package throws
const goto private transient
debugger implements protected volatile
double import public 

- es5保留字
class enum extends super
const export import 
implements package public
interface private static
let protected yield 

- 局部变量
var 定义的是局部变量，可以销毁
	function(){
	var ok='pp';//局部变量
	}
	console.log(ok)//undefined

- 全局变量
	优势：不用强制var定义，就可以是全局变量
	缺点：比较混乱，在严格模式下，会报未定义（ReferenceError引用错误）

	 'use strict';//此模式下会报undefined;
	function(){
	ok='pp';//此时全局变量
	}
	console.log(ok);//pp，

- 多语句写成一行，提高可读性
	var a=0,b=0,c=0;

- null,
	1：值被定义为 对象空对象指针，开辟内存单元
	2：可以被自动回收
	在java中，经常出现，如果null 转为数值0，不容易发现问题，所以创造出一个undefined数据判断“无”定义，原始值
	通用：对象空
		原始链终点
	Object.getPrototypeOf(Object.prototype);//null

- undefined,
	1：未定义，不存在，不占内存单元
	2：没有被赋值,占内存单元
	var mes;
	console.log(mes);//undefined
	undefined==null;//true，值一样
	undefined===null//false，不全等，类型不一样
	var a='ok';
    (function(e){
        console.log(a,e);//ok,undefined
    })();
    (function(){
    	console.log(a,e)//ok,未定义报bug(ReferenceError)
    })();

	javascript有两个无：undefined,null

	Google公司开发的JavaScript语言,替代品Dart语言,只有null

	历史原因：引用c语言习惯
		Number(null);//0
		5+null;//5
	解决：由于null是对象中的无，而数据类型没有定义，直接报bug，所以定义 了一个undefined


	其他：
	C语言的NULL，Java语言的null，Python语言的None，Ruby语言的nil。



- 原始类型（基本类型）  简单类型———— 静态数据
	undefined,null,boolean,string,number，不容易改变数据
	var a=1;
	var b=a;
	a=2;
	console.log(a,b);//2,1

	- undefined
		区分对象指针null与未初始化的变量
	- null
		对象为空的指针
	- boolean
		true/false,是值
		True/False只是标识符	
		var a='ok';
		Boolean(a)//true,非空或非0

	- number
		1.8进制 070 //10# 56
		2.无效8进制 08 //10# 8
		3，0x十六进制 //0xff0000
		4.+0，-0都是0,-0
		5.浮点数内存 是 整数的2倍,可以用3.15e3=3150
		6.NaN,非数值，不是number var p; p/10; //NaN
		7.超过number范围1.7976931348623157e+308，就是无穷infinity
		8.数值转换 parseInt,parseFloat,但是true,八进制，十六进制是无法转成正常数字，
			var a=010,b='true',c='12d3d';parseInt(a),parseInt(b),parseInt(c);//8,NaN,12
			//2,8,10,16进制
			parseInt('0101',2),parseInt('5',8),parseInt('4',10),parseInt('0xf0',16);//5,5,4,240
	- string
		一旦创建字符串，值是不可变内容。
		原理：销毁前面的值，填充新的内容值，ie7+
		缺点：早期版本，拼接时速度过慢
		1.	var s='ok';
			s=s+'pp';
			//ok pp给s变量,再销毁ok，pp的内容
		2.	转换字符toString();
			//2,8,10,16进制
			var s=10;
			s.toString(),s.toString(2),s.toString(8),s.toString(10),s.toString(16);//'10','1010','12','10','a'
		3.	''+3；//字符串“3”

- 合成类型（引用类型）  复杂类型————  动态数据
	object,array，容易改变数据，引用对象数组，而不是对象数组本身
	var a=[1,2];
	var b=a;
	a[0]='ok';
	console.log(a,b);//'ok',2 'ok',2

	- object
		1.	constructor构造函数
		2.	hasOwnProperty(string)检测对象内的属性是否存在
		3.	isPrototypeof(object),object是否是原型链对象 
			function pp(){}
			var a=new pp();
    		console.log(pp.prototype.isPrototypeOf(a));//true
    	4.	var a=function(){}就是一个原型链对象
    		a._proto_ 对象属性 ，当前原型对象
    		a.constructor.prototype函数才有的属性，当前构造函数生成的原型对象
    		//另一种原型链
    		function pp(){}
    		pp.prototype.ok=function(){}

    		var a=new pp();
    		console.log(a.__proto__,pp.prototype)//两者才一样
    	5.	宿主对象，BOM,DOM中的对象，有可能不继承object

- 栈内存 
	优点：运行效率 > 堆内存 
	缺点：空间 < 堆内存  
	undefined,null,boolean,string,number地址
	undefined,null,boolean,string,number内容
	Object，array地址
- 堆内存
	Object，array内容

- 内存周期
	1.内存泄漏，
		funtction test(){var a={},b={}} 不停的引用test()，造成有些空间不回收,仍然引用计数
		解决：a=null,b=null，才真正回收
	2,闭包最容易产生内存问题
	
- label代码中添加标签，以便将来使用
	var x=0;
	label:if(x==0){x++,break label};
	console.log(x);//1

- arguments.callee
	函数自身

- 递归算法
	 function pp(n) {
        if (n <= 0) {
            return n;
        }
        else {
            return n + pp(n - 1);//n!2!=0+1+2
        }
    }
    //pp[0]+pp[1]+pp[2]
    //0+1+2
    console.log(pp(10));//55


** 延迟脚本： 
	优点：下载完所有body内容后，再执行js脚本 ，并优先于DOMContentLoaded事件，
	缺点：建议只包括一个延迟脚本，以免很难控制先后顺序
	<script defer='defer' />

	！若不想使用延迟脚本 defer可以，把script放在</body>前


** 异步脚本 ：
	优点：不等待其他脚本文件，不阻塞文档呈现
	缺点：不保证按指定，先后顺序执行，两个互相依赖就会出一些问题
	<script async＝‘async’ src='a.js' />
	<script async＝‘async’ src='b.js' />


-------------------XHTML可扩展超文本标记语言（extensible hypertext markup language）
- xhtml语法:  
	<script>
	//"&lt;" == "<"
	if(a &lt; b){
		console.log(a);
	}
	//考虑另一种方法,CDATA代码片段
	<![CDATA[
	if(a<b){
		console.log(a);
	}
	]]>
	</script>

指定xhtml编写需要，在MIME类型定义 ：application/xhtml+xml
并不是所有brown都支持

为了解决支持script标签代码，nescape与mosaic提供注释块
<script>
<!--
if(a<b){
	console.log(a);
}
//-->
</script>

-------------------外部引入js文件
优势 ：
	可维护性，只要改js文件，不需要动html页面
	有缓存，不需要加载第二次


-------------------noscript不支持脚本，会出现该内容
优势：
	brown不支持脚本 ，可以显示
	brown支持脚本，但被禁用，可以显示
	除以上两点以外，其他时候不会显示

noframes和noscript标签优化seo内容

-------------------点在多边形是否内部
解决方案:
将测试点的Y坐标与多边形的每一个点进行比较，我们会得到一个测试点所在的行与多边形边的交点的列表。


如果测试点的两边点的个数都是奇数个则该测试点在多边形内，否则在多边形外。




