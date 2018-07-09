---------------------------------------------sass
全局变量
$fsize: 12px;

body{fontsize:$fsize}

选择器嵌套
.nav{
	li{
		float:left;
	}
	a{
		display:block
	}
}

属性嵌套
.nav{
	border:{
		style:solid;
		left:{
			width:4px;color:#999;
		}
		right:{
			width:7px;color:#000;
		}
	}
}

跳出选择器嵌套
.nav{
	//多跳
	@at-root{
		.child{

		}
		.child3{

		}
	}
	//单跳
	@at-root .pp{
		width:2px;
	}
}
//.nav .child{};.nav .child3{}

跳出@media,@support选择器嵌套
@media{
	.nav{
		//all跳出所有，media,support
		@at-root(without:media){
		}
	}
}
三目判断
if($condition, $if_true, $if_false) 。三个参数分别表示：条件，条件为真的值，条件为假的值。
if(true, 1px, 2px) => 1px
if(false, 1px, 2px) => 2px

条件判断及循环
$lte7: true;
$type: monster;
.ib{
    display:inline-block;
    @if $lte7 {
        *display:inline;
        *zoom:1;
    }
}
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
output:
.ib{
    display:inline-block;
    *display:inline;
    *zoom:1;
}
p {
  color: green; 
}

for循环
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
.item-1 {
  width: 2em; 
}
.item-2 {
  width: 4em; 
}
.item-3 {
  width: 6em; 
}

多个字段map数据循环
$nav:{a:2px,h1:3px,p:4px}
@each $h,$size in $nav{
	#{$h}{
		font-size:$size;
	}
}
output:
a{
	font-size:2px;
}
h1{
	font-size:2px;
}
p{
	font-size:2px;
}


---------------------------------------------less
> 	CSS 预处理语言
	增加了变量、Mixin、函数等特性，
	更易维护和扩展

>	Less 可以运行在 Node 或浏览器端。


- 浏览器端用法
	<link rel="stylesheet/less" type="text/css" href="styles.less" />
	<script src="less.js" type="text/javascript"></script>

	<script>
	  less = {
	    env: "development",
	    async: false,
	    fileAsync: false,
	    poll: 1000,
	    functions: {},
	    dumpLineNumbers: "comments",
	    relativeUrls: false,
	    rootpath: ":/a.com/"
	  };
	</script>
	<script src="less.js"></script>

- exmaple
	* 变量使用
		@ok:#ff0;
		@yes:@ok+#00;

		.nav{
			color:@yes;
		}
		ouput:
		.nav{
			color:#f0f0f;//颜色值
		}
	* 


