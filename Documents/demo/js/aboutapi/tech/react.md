
---------------------------------------------react 路由


有hashHistory和browserHistory，

1,hashHistory由hash#控制跳转，用于正式线上部署，

2,browserHistory就是普通的地址跳转，用于开发阶段。



1.路由表中      
<Route path=' /sort/:id '   component={Sort}></Route>
　　　　　　　　　　　
2.Link处        
HTML方式
<Link to={ ' /sort/ ' + ' 2 ' }  activeClassName='active'>XXXX</Link>          　　　　
　　　　　　　　　　　
JS方式
this.props.router.push(  '/sort/'+'2'  )
　　　　　　　　　　　
3.sort页面       
通过  this.props.params.id        
就可以接受到传递过来的参数（id）




1、setState()是异步的
this.setState()会调用render方法，但并不会立即改变state的值，state是在render方法中赋值的。所以执行this.setState()后立即获取state的值是不变的。同样的直接赋值state并不会出发更新，因为没有调用render函数。

2、组件的生命周期
componentWillMount，componentDidMount 只有在初始化的时候才调用。
componentWillReceivePorps，shouldComponentUpdate，componentWillUpdata，componentDidUpdate 只有组件在更新的时候才被调用，初始化时不调用。

3、reducer必须返回一个新的对象才能出发组件的更新
因为在connect函数中会对新旧两个state进行浅对比，如果state只是值改变但是引用地址没有改变，connect会认为它们相同而不触发更新。

4、无论reducer返回的state是否改变，subscribe中注册的所有回调函数都会被触发。

5、组件命名的首字母必须是大写，这是类命名的规范。

6、组件卸载之前，加在dom元素上的监听事件，和定时器需要手动清除，因为这些并不在react的控制范围内，必须手动清除。

7、按需加载时如果组件是通过export default 暴露出去，那么require.ensure时必须加上default。

require.ensure([], require => {
    cb(null, require('../Component/saleRecord').default)
},'saleRecord')
8、react的路由有hashHistory和browserHistory，hashHistory由hash#控制跳转，一般用于正式线上部署，browserHistory就是普通的地址跳转，一般用于开发阶段。

9、标签里用到的，for 要写成htmlFor，因为for已经成了关键字。

10、componentWillUpdate中可以直接改变state的值，而不能用setState。

11、如果使用es6class类继承react的component组件，constructor中必须调用super，因为子类必须用super继承component的this，否则实例化的时候会报错。

12、组件卸载之前，加在dom元素上的监听事件，和定时器需要手动清除，因为这些并不在react的控制范围内，必须手动清除。指的是在this.refs.xxx这种真实dom上addEventListener这样添加的监听事件，在组件卸载的时候要手动清除(removeEventListener)，react组件上的onClick这种不用管，react帮我们处理好了

---------------------------------------------搭建es6+webpack2+react
在webpack2中必须下载
npm install babel-preset-react

配置：
use:【
    ｛loader:'babel-loader',
    options:{
        presets:['react']
    }
    ｝
】



---------------------------------------------适合做移动端的理由
React + es6 + Route + redux + tappable

压缩后200kb,
gzip后50kb

etag或者Expires的强缓存，或者localstorage
第一次访问50kb基础库，不是2g用户致命伤的，2g致命的是RTT 

RTT (Round-Trip Time)网络延迟/往返时延：具体是指，发送端数据发送开始，到发送端收到接收端确认的间隔时间



---------------------------------------------jsx功能
jsx(全称是JavaScriptExtension)

react-tool在0.14版本后，改为babel
安装jsx转译工具
step 1
npm install react-tools

step2
jsx -w 目标文件夹 生成文件夹


---------------------------------------------React.addons插件

TransitionGroup和CSSTransitionGroup，用于处理动画和过渡，这些通常实现起来都不简单，例如在一个组件移除之前执行一段动画。

LinkedStateMixin，用于简化用户表单输入数据和组件 state 之间的双向数据绑定。

classSet，用于更加干净简洁地操作 DOM 中的 class 字符串。	

cloneWithProps，用于实现 React 组件浅复制，同时改变它们的 props 。

update，一个辅助方法，使得在 JavaScript 中处理不可变数据更加容易。

PureRednerMixin，在某些场景下的性能检测器。

---------------------------------------------Babel转换器 
Babel是 ES6 到 ES5 的代码转换
编译es6的工具，转换成es5的代码 

step 1
babel -d 源文件夹 目标文件夹

--------------------------------------------browser转换器
browser是把jsx转译成javascript代码



--------------------------------------------arr.map数组

报错：Each child in an array or iterator should have a unique "key" prop.
解决方案：
在循环时需要对树进行记录，因此
arr.map(function(e,i){
	return <li key={i} />;
})

这个是和react的dom-diff算法相关的。react对dom做遍历的时候，会根据data-reactid生成虚拟dom树。
如果你没有手动的添加unique constant key的话，react是无法记录你的dom操作的。它只会在重新渲染的时候，继续使用相应dom数组的序数号(就是array[index]这种)来比对dom树。

--------------------------------------------react+webpack+es6
http://stackoverflow.com/questions/36867345/webpack-issue-when-trying-to-render-in-reactjs
> 问题：Unexpected token
解决：创建.babelrc文件

# install
### $ npm install --save-dev babel-loader babel-preset-react babel-preset-es2015 


### .babelrc
{
  "presets": ["es2015", "react"]
}


### webpack.config.js
module.exports={
	loaders:[
		{
	        test: /\.jsx?$/,
	        exclude: /node_modules/,
	        loader: 'react-hot-loader!jsx-loader!babel-loader',
	        query: { presets: ['es2015', 'react'] }
	    }
	]
}



### index.js
import React,{Component} from 'react';
import Reactdom from 'react-dom';
import intro from 'babel!./src/intro';

/**
 *@decsription 组件
 */

Reactdom.render(<intro />, document.getElementById('webpage'));


## shouldComponentUpdate

> true 为禁止表单输入



--------------------------------------------react-hot-loader热启动
### server.js
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.es6');
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: false,
    historyApiFallback: true
}).listen(3000, '127.0.0.1', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:3000');
});

### package.json
"scripts": {
    "start": "node ./server.js",
    }

### webpack.config.js
entry: {
        index: ['webpack-dev-server/client?http://127.0.0.1:3000',
            'webpack/hot/only-dev-server', 'babel!./index', 'style!css!./css/main']
    },


> 出现[HMR] Hot Module Replacement is disabled.

webpack.config.js
添加
new webpack.HotModuleReplacementPlugin()


--------------------------------------------props.history更改context.router路由
路由，更改使用context.router
当前文档添加

class Index extends Component{
    render(){
    const {router}=this.context
    return(){
        <div>
        <a onClick={()=>router.push('/')} />
        </div>
    }
    }
}

Index.contextTypes={
    router:React.PropTypes.object.isRequired
}


