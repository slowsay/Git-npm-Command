
<meta name="format-detection" content="telephone=no" />
<meta name="format-detection" content="email=no" />
<meta name="format-detection" content="adress=no"  />

或
<meta name="format-detection" content="telephone=no,email=no,adress=no" />

---------------------------------------------css3 字体
@font-face{
	font-family:ench;
	src: url('xx.ttf'),
		url('ff.otf'),
		url('ww.eot');
}
.TTF或.OTF，适用于Firefox 、Safari、Opera

.EOT，适用于Internet Explorer 4.0+

.SVG，适用于Chrome、IPhone

.WOFF 知用于Chrome、Firefox



格式	IE	| Firefox	| Chrome	| Safari	| Opera| 	iOS | Safari	| Android Browser| 	Chrome for Android
.eot	6	--	--	--	--	--	--	--
.woff	9	| 3.6	|   5	  |   5.1	 |    11.1	| 5.1	     |     4.4	|  36
.ttf	--	3.5| 	4 | 	3.1 | 	10.1 	| 	4.3		|  	2.2		| 	36
.svg	--	--	4	| 	3.2		9.6		3.2		3		36


---------------------------------------------css3 字体压缩
http://font-spider.org/
字蛛
$ npm install font-spider -g 
$ npm install --save grunt-font-spider
$ font-spider ./index.html

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


---------------------------------------------canvas 
context.save()
context.scale(.5,.5);//缩放，等改变bitmap的动作时，
context.drawImage(img,0,0);
context.restore()

还是原图中获取，取到的是没有缩小的图
context.drawImage(img,0,0)


document.addEventListener('mousemove',game.mouseHandle,false);
•全为 false 时，触发顺序为：inDiv、middleDiv、outDiv；
•全为 true 时，触发顺序为：outDiv、middleDiv、inDiv；



----------------------------------------------css3

style.css
@keyframes mymove{
	from{left:0px}
	to{left:500px}
}


document.getElementById("myDIV").style.animation="mymove 5s infinite";


object.style.animation="name duration timingFunction delay iterationCount direction fillMode playState"

animationName	指定要绑定到选择器的关键帧的名称。
animationDuration	规定动画完成需花费的秒数或毫秒数。
animationTimingFunction	指定动画的速度曲线。
animationDelay	规定动画开始的延迟时间。
animationIterationCount	规定动画的播放次数。
animationDirection	规定是否循环交替反向播放动画。
animationFillMode	规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。
animationPlayState	规定动画是运行的还是暂停的。
initial	设置该属性为它的默认值。请参阅 initial。
inherit	从父元素继承该属性。请参阅 inherit。


document.getElementById("myDIV").style.animationName="mymove";


====================浏览器支持

Internet Explorer 10、Firefox 和 Opera 支持 animation 属性。
Safari 和 Chrome 支持另一个可替代该属性的属性，即 WebkitAnimation 属性。
注意：Internet Explorer 9 及其之前的版本不支持 animation 属性。

====================最新标签

contenteditable 一段可编辑的段落
<p contenteditable="true">这是一段可编辑的段落。请试着编辑该文本。</p>

input 预先定义文本
required 必须输入内容
<input placeholder='请输入搜索内容'  required="required" />
 range有滑块
 <input type='range' />

meter度量给定范围
<meter value="3" min="0" max="10">十分之三</meter>








