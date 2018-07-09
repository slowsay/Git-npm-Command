---------------------------------------------react-native
安装react native打包工具
step1
npm install -g react-native-cli  

安装检测代码工具
step2
brew install watchman

step3
brew install flow

step4
react-native init 项目名称不能数字开头   || react-native init 项目名称不能数字开头 [--verbose详细运行信息]

step5
npm start

更新最新版本方法
npm install react-native-icons@latest --save

 flexDirection: 'row'文本方向

//////////////////////////////////////////////////////
 ATS,允许ip网络访问，需要 设置info.plist

 出现空白页，必须设置width ,height，
  width: Util.size.width, height: Util.size.height
//////////////////////////////////////////////////////

发布appstore
需要注释掉node_modules/react-native/packager/react-native-xcode.sh中的最后一段关于“react-native bundle”的命令调用，并不需要这个操作

##### buglist
* RCTWebSocket  Ignoring return value of function declared with 'warn_unused_result' attribute
```
xcode 8.0以上
RCTSRWebSocket.m文件上SecRandomCopyBytes前加上(void)
```



### android打包
* 产生签名
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
[注：在产生的时候需要提供密钥和存储密码，后续会用到]

mv my-release-key.keystore android/app/

* 修改文件,添加代码

- android/gradle.properties

MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=xx
MYAPP_RELEASE_KEY_PASSWORD=xx

- android/app/build.gradle

android{
  signingConfigs{
  release { 
        storeFile file(MYAPP_RELEASE_STORE_FILE) 
        storePassword MYAPP_RELEASE_STORE_PASSWORD 
        keyAlias MYAPP_RELEASE_KEY_ALIAS 
        keyPassword MYAPP_RELEASE_KEY_PASSWORD 
    }
  }
  buildTypes{
  release{
      signingConfig signingConfigs.release
    }
  }
}
* 进入android目录,运行打包
>./gradlew assembleRelease

打包输出目录android/app/build/outputs/apk/app-release.apk

* 每次打包要删除 之前的apk

============使用到的第三方库
1. Redux
2. Redux-react
3. ImmutableJS
4. moment
5. React-native 0.14.1
6. react-native-android-statusbar
7. react-native-clipboard ，因为owner很久不维护，我做了一些修改，后面会open出来
8. react-native-code-push
9. react-native-device
10. react-native-icons
11. react-native-keyboard-spacer
12. react-native-navbar"
13. react-native-simpledialog-android
14. redux-thunk
==============


----------------------------------------------position

<View style={position}>
</View>
越后面zindex越大

----------------------------------------------StatusBar
第一种颜色黑色
StatusBar.setBarStyle(0);
第二种颜色白色
StatusBar.setBarStyle(1);
----------------------------------------------scrollview
类似通讯录，字母分类，，决定哪些成员会在滚动之后固定在屏幕顶端
滚动的时候，第1个位置固定在视窗顶部，其他继续滚动
stickyHeaderIndices={[0]}

----------------------------------------------listview
解决listview dataSource={[]}为空时的设置

enableEmptySections={true}允许为空

const ds=new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2}).cloneWithRows([])

<ListView renderRow={(e,sid,id)=>this._listMap(e,sid,id)}
                          enableEmptySections={true}
                          dataSource={ds}/>


----------------------------------------------flexbox 属性
alignSelf 是针对文本Text

alignItems,justifyContent针对view,pic元素


----------------------------------------------'react' 属性
"react":

Children
Component
PropTypes
createElement
cloneElement
isValidElement
createClass
createFactory
createMixin


----------------------------------------------常规出现的问题
1，clang: error: no input files
这个问题一般是因为你删除或者移动了某一个文件，但是在你的编译资源里面（ project > target > Build Phases > Compile Sources）还存在它，只要在（project > target > Build Phases > Compile Sources）里面把那些红色的文件删除掉，就可以编译过了

2，报错：_fbBatchedBridge is undefined while executing in simulator
解决：需要 生成jsbundle
打包成app，准备发布到appstore 命令
生成main.jsbundle及assets资源

第一种只生成jsbundle
react-native bundle --entry-file ./index.ios.js --bundle-output ./ios/Fuckyou/bundle/main.jsbundle
注意最好把main.jsbundle改成 "其他".jsbundle,会有缓存

第二种生成jsbundle及图片资源包
react-native bundle --entry-file ./index.ios.js --bundle-output ./ios/Fuckyou/bundle/main.jsbundle --platform ios --assets-dest ./ios/Fuckyou/bundle --dev false

3，


---------------------------------------------use strict
'use strict';//进入"严格模式"的标志



---------------------------------------------onClick   (jsx-es6)

关于点击事件
jsx:
this.onClick.bind(this)
es6:
()=>{this._onpress()}


----------------------------------------------react redux
引入细则：
import {createStore} from 'redux';
import {Provider,connect} from 'react-redux';

步骤：
1，入口文件 
2，actions文件 
3，reducers文件
4，容器组件文件 
5，展示组件文件

----------------------------------------------常规代码含义

ref 获取表单变量值
props 标签属性

样式定义属性
（1）flex 当一个元素定义了flex属性时，表示该元素是可伸缩的 flex>0的属性时候才可伸缩
（2）flexDirection 在React Native中只有两个属性值，row（横向伸缩）和column（纵向伸缩）
（3）alignSelf 对齐方式主要有四种：flex-start、flex-end、center、auto、stretch。
（4）alignItems 是alignSelf的变种，跟alignSelf的功能类似，可用于水平居中。
（5）justifyContent用于垂直居中
（6）justifyContent
（7）flexWrap

----------------------------------------------componentWillMount 调用区别

componentWillMount() will 函数在进入状态之前调用
componentDidMount() did 函数在进入状态之后调用
componentWillUpdate(object nextProps, object nextState) will 函数在更新状态之前调用
componentDidUpdate(object prevProps, object prevState) did 函数在更新状态之后调用
componentWillUnmount() will函数在退出状态之前调用


componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用

Mounting：已插入真实 DOM
Updating：正在被重新渲染
Unmounting：已移出真实 DOM


----------------------------------------------watchman
问题：
react-native在xcode7.0下运行出现Cannot read property 'root' of null 解决方法

如果要watchman 小于4.0那么应该如下 操作
step 1
brew uninstall watchman

step 2
brew install watchman --HEAD

----------------------------------------------flex-box的布局模型
React Native支持
flex、flexDirection、flexWrap、justifyContent、alignItems、alignSelf

----------------------------------------------开发经验
react-native init 命令创建的项目不能以数字开头

---依赖react-native后，也sync过了为什么找不到react-native相关类---
需添加apply from: “react.gradle”及compile ‘com.facebook.react:react-native:0.20.+’并在defaultConfig中配置ndk 
这里我碰到了第一个坑，sync完整个项目中依然找不到com.facebook.react.*。然后尝试build一下，build完后就可以看到com.facebook.react中的类了

----------------------------------------------图标尺寸规范

29pt,2x = (29*2,29*2)=宽58*高58

29pt,3x = (29*3,29*3)=宽87*高87

如果只针对iPhone的，则直接icon-29@2x.png，icon表示图标，29表示是29pt的，2x表示是29px的2x即58*58的，其他类似。

----------------------------------------------使用到的第三方库
1. Redux
2. Redux-react
3. ImmutableJS
4. moment
5. React-native 0.14.1
6. react-native-android-statusbar
7. react-native-clipboard ，因为owner很久不维护，我做了一些修改，后面会open出来
8. react-native-code-push
9. react-native-device
10. react-native-icons
11. react-native-keyboard-spacer
12. react-native-navbar"
13. react-native-simpledialog-android
14. redux-thunk

-----------------------------------------------关于selectedIcon修复
react.xcodeproj/react/views/RctTabbaritem.h
添加
@property (nonatomic, strong) UIImage *selectedIcon;


react.xcodeproj/react/views/RctTabbaritem.m
添加
- (void)setSelectedIcon:(UIImage *)selectedIcon
{
  _selectedIcon = selectedIcon;

  if (_renderAsOriginal) {
    self.barItem.selectedImage = [_selectedIcon imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
  } else {
    self.barItem.selectedImage = _selectedIcon;
  }
}

react.xcodeproj/react/views/RctTabbaritemManager.m
注释
//RCT_REMAP_VIEW_PROPERTY(selectedIcon, barItem.selectedImage, UIImage)
添加
RCT_EXPORT_VIEW_PROPERTY(selectedIcon,UIImage)

-----------------------------------------------
UIImageRenderingModeAutomatic  // 根据图片的使用环境和所处的绘图上下文自动调整渲染模式。
UIImageRenderingModeAlwaysOriginal   // 始终绘制图片原始状态，不使用Tint Color。
UIImageRenderingModeAlwaysTemplate   // 始终根据Tint Color绘制图片，忽略图片的颜色信息。

-----------------------------------------------
React.PropTypes.array           // 矩阵

React.PropTypes.bool.isRequired // Boolean 且必要。

React.PropTypes.func            // 函式

React.PropTypes.number          // 數字

React.PropTypes.object          // 对象

React.PropTypes.string          // 字串

React.PropTypes.node            // 任何類型的: numbers, strings, elements 或者任何這種類型的陣列

React.PropTypes.element         // React 元素

React.PropTypes.instanceOf(XXX) // 某种XXX类别的实体

React.PropTypes.oneOf(['foo', 'bar']) // 其中一个字串

React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array]) // 其中一种格式类型

React.PropTypes.arrayOf(React.PropTypes.string)  // 某種類型的陣列(字串類型)

React.PropTypes.objectOf(React.PropTypes.string) // 具有某種屬性類型的物件(字串類型)

React.PropTypes.shape({                          // 是否符合指定格式的物件

  color: React.PropTypes.string,
  fontSize: React.PropTypes.number
});
React.PropTypes.any.isRequired  // 可以是任何格式，且必要。


// 自定義格式(當不符合的時候，會顯示Error)

// 不要用`console.warn` 或者 throw, 因为它在`oneOfType` 的情况下無效。


customPropType: function(props, propName, componentName) {
  if (!/^[0-9]/.test(props[propName])) {
    return new Error('Validation failed!');
  }
}