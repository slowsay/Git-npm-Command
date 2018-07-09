---------------------------------------------webpack
step 1 
npm install webpack -g

初始化package.json文件 
step 2
npm init

-w实时修改观察，-p压缩
step 3 
webpack -w -p

若没有插件，需要下载，save|dev两者区别，可以在package.json里看出，dev不能用在正式版打包
npm install --save 插件名称

npm install --save-dev 插件名称



path.resolve([from ...], to)

从源地址 from 到目的地址 to 的绝对路径。

var path=require('path');

---------------------------------------------ouput配置

output：option是个对象类型的值，option下的每个属性都可能会影响webpack模块打包结果。 
output.path：字符串类型的值，指定webpack的输出文件路径——要求是个绝对路径
output.filenam: 字符串类型的值，指定模块集生成的文件名——在output.path指定的路径下，另外可以在字符串值中使用下列变量 
[name]：代表模块集的名称，与entry配置有关，具体可自行测试
[hash]：代表编译hash值，与模块集的代码有关，如果模块集的代码有修改，hash值也会变，这个在生成环境里可以解决客户端的缓存问题
[chunkhash]：代表模块集名称的hash值，注意chunkhash与hash不能同时使用
output.chunckFileName：字符串类型，用于指定非程序入口模块集的文件名称——在output.path指定的路径下，另外可以在字符串值中使用下列变量 
[id]: 代表模块集的id
[name]: 代表模块集的名称，和require.ensure的第三个参数，具体可以自行测试
[hash]: 代表编译hash值，与模块集的代码有关，如果模块集的代码有修改，hash值也会变，这个在生成环境里可以解决客户端的缓存问题
[chunkhash]: 代表模块集名称的hash值，注意chunkhash与hash不能同时使用
output.sourceMapFilename: SourceMaps的文件名称生成规则
output.devtoolModuleFilenameTemplate
output.devtoolFallbackModuleFilenameTemplate
output.devtoolLineToLine
output.hotUpdateChunkFilename
output.hotUpdateMainFilename
output.publicPath
output.jsonpFunction
output.hotUpdateFunction
output.pathinfo
output.pathinfo
output.library
output.libraryTarget
output.sourcePrefix
output.crossOriginLoading


---------------------------------------------html-Webpack-Plugin

"htmlWebpackPlugin": {
  "files": {
    "css": [ "main.css" ],
    "js": [ "assets/head_bundle.js", "assets/main_bundle.js"],
    "chunks": {
      "head": {
        "entry": "assets/head_bundle.js",
        "css": [ "main.css" ]
      },
      "main": {
        "entry": "assets/main_bundle.js",
        "css": []
      },
    }
  }
}

---------------------------------------------react-hot
plugins : [ new webpack.HotModuleReplacementPlugin(),new webpack.NoErrorsPlugin() ],
