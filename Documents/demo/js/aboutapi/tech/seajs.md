---------------------------------------------机制
Sea.js作者玉伯
遵循 cmd规范, 可以像 Node.js 一般书写模块代码

专注于 Web 浏览器端，同时通过 Node 扩展的方式可以很方便跑在 Node 服务器端

RequireJS 是没有明显的 bug，SeaJS 是明显没有 bug

SeaJS 通过插件，可以实现 Fiddler 中自动映射的功能，还可以实现自动 combo 等功能，非常方便便捷


- CMD规范 (Common Module Definition )
> 三个变量require, exports , module
具体介绍：https://github.com/cmdjs/specification/blob/master/draft/module.md    

关键词define定义任何方法
define(factory);

define(function(require, exports, module) {

  // The module code goes here

});



//使用require
1.require
2.require.async

define(function(require, exports, module) {
    var s=require('math').add;
  exports.add = function(v) {
    //todo
    return s(v,1);
    }
}）

//使用exports
1.添加自定义方法
define(function(require, exports, module) {
  exports.add = function() {
    //todo
    var s=0;
    return s
  }
})

//使用module
1.module.url
2.module.dependencies
3.module.exports

define(function(require, exports, module) {
    module.id='jack';
}）

