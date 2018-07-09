# xcode



## 学习


### 开发深度

框架分层
* 数据持久层
* 网络层
* 业务逻辑层

多线程
*GCD,NSOperation
* 不要次线程中发通知


### object-c的原理 
* oc是c语言的超集


### xcode证书详解

* App ID
> 用于识别 一个app应用，开发时xcode中bundle需要填写 苹果开发者申请的ID (https://developer.apple.com/account/ios/certificate/)
> 一盘写法：com.tr.ayaIM 
> 创建该证书需要，本地xcode开发key

* 本地xcode开发key
> 钥匙串访问 > 证书助理 > 从证书颁发机构请求证书 > 存储到磁盘
> 苹果开发者平台 > 上传本地请求证书 - CertificateSigningRequest.certSigningRequest

* 根证书
> 安装Mac OSX时就默认安装到钥匙串中，以下四大根证书
1.Developer Authentication Certification Authority
2.Developer ID Certification Authority
3.Apple Application Integration Certification Authority
4.Apple Worldwide Developer Relations Certification Authority



### 发布app

* Project是一个大工程
1.code signing identity需要发布者证书

* Targets是 项目，可以有很多个
1.code signing identity需要开发者证书

### Cocoa解析
* 动态为mac osx的原生面向对象api 
* 其他几大API是 (carbon,posix,x11,java)
* mac oxs有五大api
* 严格的mvc模式
* 由neXTStep和openStep演变而来

* 类别前缀 NS
                    
* 应用界面类 UIKit  ===== 继承NSObject

苹果公司 ---- 收购乔布斯公司      -------|
                                            mac osx  基于Unix内核
乔布斯  ---- neXTStep           -------|

openStep === sun与neXT合作

Linux -- 基于Unix内核

在openStep下
高层 ---- 视图类 --- appkit
底层 ---- 模型类 --- Foundation


** 相当于flash player用的是as3 API === ios 用的cocoa API



### kit
* 动态运行库
* appkit被移植到intel,hp等平台



### 删除user-defined项
fn+delete 


### #ifndef
预定义，宏定义

c语言特性：预处理，编译，链接

### #pragma mark
作用是代码之间有横线，清晰代码，是xcode的编译器功能

对代码不产生任何影响



### 方法定义
类MYClassr的方法 myfunction;
+ (MYClass *)myfunction;

对象方法
- (void) viewDidload{
    
}

类方法以+开头，对象方法以-开头

@interface和@end之间声明，在@implementation和@end之间定义


### 组件命名

**组件命名**

发现组件工程名,不能以RCT开头,
可以用RN或其他大写字母开始
如：CodePush，RNCache


### 主线程

```
   [[NSOperationQueue mainQueue] addOperationWithBlock: ^ {

        myImageView.image = myImage_weak; // updating UI
   
    }];
```


### 直接代理自身
* self.delegate=self

### 变量，方法之屌丝

//声明getter、setter方法接口
@property

//实现setter、getter方法
@synthesize

//java中创建都是class ，oc中则是@interface，放在.h内
@interface Msgbox:NSObject
{

	ShapeColor fillColor;//定义fillColor变量
	Shape bounds;//定义bounds变量
	- (void)setFillColor:(ShapeColor)fillColor;//定义名为setFillColor的方法
}

//实现inteface方法，放在.m中
@implementation Msgbox

- (void) setFillColor:(ShaperColor)c
{
	fillColor=c;
}	

//调用方法
init main(int argc,const char * argv[]){
	id shapes[3];
	shapes[0]=[Msgbox new];
	[shapes[0]setFillColor:k ]
}


//原子操作，setter方法系统会自动的创建lock锁，锁定变量,防止另的进程占用，比较损耗内存
atomic

//适合没有用多线程的变量
nonatomic


assign、retain、copy



//oc类
@implementation SampleClass
- (void)requestUrl:(NSString *)url param:(NSDictionary *)dict callback:(JPCallback)callback {
    [super requestUrl:url param:dict callback:callback];
    JPRequest *obj = [[JPRequest alloc] initWithUrl:url param:dict];
    obj.successBlock = ^(id data, NSError *err) {
        NSString *content = [JPParser parseData:data];
        [self.dataSource refresh];
        self.handleRequestSuccess(@{
            @"content": content
        });
    };
}
@end
//js类
defineClass("SampleClass", {
    requestUrl_param_callback: function(url, dict, callback) {
        self.super().requestUrl_param_callback(url, dict, callback);
        var obj = JPRequest.alloc().initWithUrl_param(url, dict);
        obj.setSuccessBlock(block("void, id, NSError*", function(data, err) {
            var content = JPParser.parseData(data);
            self.dataSource().refresh();
            self.handleRequestSuccess({
                content: content
            });
        }));
    }
}, {});


//UIScreen
获取设备大小

//UIView
屏幕上一个矩形区域



### pushkit.framework
* 1.锁屏状态下，如果有网络电话呼入,打开系统电话应用的待接听界面
* 2.VoIP应用内发起通话、挂断电话等记录可以体现在系统电话应用的通话记录中
* 3.从系统电话应用的通话记录、通讯录或者siri进入VoIP应用，发起通话
* 4.iOS10开始，苹果不支持VoIP应用的后台socket长连接

### 关于全局布局 edgesForExtendedLayout
* ios7以后viewcontroller全局布局
* 属性edgesForExtendedLayout有三种
* UIRectEdgeAll  （default）
* UIRectEdgeNone  （设置此，tableView 不延伸到 navigationBar 下面)
* 如果导航栏变灰，self.navigationController.navigationBar.translucent = NO;设置透明为NO

### __weak修饰符
* 弱引用
* 弱引用不能持有对象实例
* 避免循环使用致闪崩
* id __weak obj=[[NSObject alloc] init];//会出警告，并自动释放内存
* id __strong obj=[[NSObject alloc] init];
    id __weak obj0=obj;//不会出警告

### __strong修饰符
* 强引用 
* 与__weak相反
* id __strong obj=[[NSObject alloc] init];//没问题

### nslog
* NSLog (@"this is a test");
NSLog (@"string is :%@", string);
NSLog (@"x=%d, y=%d", 10, 20);
但是下面的写法是不行的：
int i = 12345;
NSLog( @"%@", i );
原因是， %@需要显示对象，而int i明显不是一个对象，要想正确显示，要写成：
int i = 12345;
NSLog( @"%d", i )。


### NScoding
> NScoding 是一个协议，主要有下面两个方法
* -(id)initWithCoder:(NSCoder *)coder;//从coder中读取数据，保存到相应的变量中，即反序列化数据
* -(void)encodeWithCoder:(NSCoder *)coder;// 读取实例变量，并把这些数据写到coder中去。序列化数据

### NSCoder
> 是一个抽象类，抽象类不能被实例话，只能提供一些想让子类继承的方法。
* NSKeyedUnarchiver 从二进制流读取对象。
* NSKeyedArchiver 把对象写到二进制流中去。


### Other  Linker Flags
> Unix静态库与object-c动态特性有冲突，因为 要加ObjC

* -ObjC  使用ObjC写的静态类别库，加载用ObjC实现的类、类别等所有成员。  （不写-ObjC往往会报错，出现”selector not recognized”。）
* -all_load  特点是所有，强制链接器加载所有包含非ObjC的目标文档
*  -force_load  特点是指定，加载指定的目标文档。-force_load后面需要文档路径，

### CreateGroups与create folder reference的区别

* creategroups，黄色文件夹，可以直接引用，如#include xxx.h
* create folder reference ，蓝色文件夹，需要相对路径引用，如#include scripte/xxx.h

###  armv7,arm64是什么
* armv7｜armv7s｜arm64都是ARM处理器的指令集
* i386｜x86_64 是Mac处理器的指令集

### ios快速消除警告 other warning flags

* 找到other warning flags : -Wunused-


### class-dump反编译，破解ios,app应用源码
* example
``` 
> class-dump -H /Applications/AyaIM.app /Users/slowsay/Downloads/test
```
编译出来后的代码是调用过的所有方法与属性

### #define 
*命令之后为常量名

* #define 常量名 代替值

* #define PI 3.141592654
* #define ID @"pplive"

### CFNetWork

* 侧重于网络协议
* 高性能网络框架，BSD套接字扩展  

* 包含了core foundation一些功能

* 伯克利套接字接口 ==== BSD socket，使用c语言的进程间通信库，而通信。
* BSD socket可以无数台主机之间互相通信，

* 想要通信，需要操作系统与网络

> CFFtp
* ftp链接

> CFHttp
* http链接

>CFSocketStream
* 长链接 i/o流


### Core Foundation 
* 核心基础库
* 更偏于网络应用底层

> CFSocket
* 长链接

> CFStream
* I/O流  
* 媒体数据交换
* CFReadStream 输入流
* CFWriteStream 输出流



### Foundation 
* 基础框架
* 很多基础对象，如:NSobject,NSArray,看源码包就能得知



### KVC
* 键-值编码

### selector
* 发送消息，把selector送入oc运行中，寻找对应方法

### Bundle creator OS Type code
* 用来标识创建者4个字母长的代码


### 审核时遇到VoIP uibackgroundmodes
* info.plist > required background modes 删除voice over ip service 或者在审核时说明这一情况

### 真机调试
* xcode >  Code Signing Identity > ios developer

### ios developer与ios distribution区别
* ios developer 开发证书
* ios distribution 发布证书

### ios Project与target区别
* Project是工程，可以有多个target
* target会继承project的setting一部分
* 每个target之间没有关系
* 每个target与project有关系


### Build Phases
* Target Dependencies Target 
依赖,某些Target可能依赖某个Target输出的值,这里设置依赖

* Compile Sources 
是指将有哪些源代码被编译

* Link Binary With Libraries
是指编译过程中会引用哪些库文件

* Copy Bundle Resources 
是指生成的product的.app内将包含哪些资源文件



## Bug List

* framework not found FileProvider for architecture i386
解决方法是升级xcode9，fileprovider是9的类包

#### Duplicate Symbols for Architecture arm64解决办法
* Target->Build Settings->Apple LLVM 9.0-Code Generation下，将No Common Blocks设置为NO。


### Application loader 上传打包失败
*   ERROR ITMS-90161:Invalid Provisioning Profile. The provisioning profile included in the bundle com.tr.ayaIM [Payload/AyaIM.app] is invalid. [Missing code-signing certificate]. A Distribution Provisioning profile should be used when submitting apps to the App Store. For more information, visit the iOS Developer Portal.
解决方法：
1.xcode > product > archive 右键选择show in finder,显示包内容，
2.把products目录下的application 文件夹改成payload,
3.修改info.plist文件 ApplicationProperties - ApplicationPath，把 Application/xx 改为 Payload/xx 重新上传即可



