# Java知识点

## 版本说明

v1.0.0  v版本号.添加功能号.修改号

alpha 最初版-内测
beta 公开测试版
gamma 正式发布的候选版本(也称RC)release candidate
cr 正式发布版本前的版本

final 正式版，当前版本不再更改
release 最终版本，运行很稳定的版本，基本上不会有改动

## JVM

* java virtual Machine(java虚拟机)

* java源码级编译器工作原理

* - 源代码 - 词法分析器 - token流 - 语法分析器 - 语法树/抽象语法树 - 语义分析器 - 注解抽象语法树  -  字节码生成器 - jvm字节码

.java  - .class字节码  - 类加载器 - 字节码校验器 - 解析器 - 硬件
.java  - .class字节码  - 类加载器 - 字节码校验器 - JIT代码生成器 - 硬件

//修改内存

> 打开IDEA菜单中的 " Help > Edit Custom VM Options "在弹出的对话框中选OK，打开配置文件
```
-Xmm2g
-Xmx2g
-XX:.....=1024m
```

## maven管理器


## 面向对象编程OOP
* 业务处理过程中的实体及其属性和行为进行抽象封装

## 面向切面编程AOP

* Aspect Oriented Programming(AOP) 

* 通过预编译方式和运行期动态代理实现程序功能的统一维护的一种技术
* 函数式编程的一种衍生范型
* 对业务逻辑的各个部分进行隔离

## javaServlet

* 负责servlet和用户通信
* Servlet和用户的通信采用请求/响应模式
* 动态响应客户机请求形式扩展Web服务器
* Servlet是开发服务器端应用程序
* Servlet与JSP结合使用，能提供更强大的服务器端功能。

优势：
* 扩展服务器的性能
* 服务器上驻留着可以通过“请求-响应”编程模型来访问的应用程序

## javabean

* 可复用的平台独立软件组件 


## buglist
* JAVA_HOME is not defined correctly
	- 

## @ResponseBody
> SpringMVC集成了Ajax，使用非常方便,只需一个注解@ResponseBody就可以实现




### android

* 安装
> 搭建android暂时需要这么三个文件，jdk、ide和sdk；国内镜像网址http://www.android-studio.org ；

> 默认的mac的jdk安装地址http://www.mr-wu.cn/what-is-path-of-jdk-on-mac/ ;

//sdk,jvm to setting
>configure - project defaults -project structure

> Tools - Android -SDK Manger




### Structs框架


### 构造函数

```
package javastudy;

public class ConfunDemo3 {
    public static void main(String[] args){
        Person z=new Person("zhangsan",3);        //实例化对象时，new Person()里直接调用Person构造函数并转转实参，相当于setter功能
        z.show();
    }
}

class Person{
    private String name;
    private int age;
    public Person(String n,int m){                //有参数构造函数，实现给private成员变量传参数值的功能
        name=n;
        age=m;        
    }
    //getter                                      //实例化对象时，完成了sett功能后，需要getter，获取实参值。
    public String getName(){
        return name;
    }
    public int getAget(){
        return age;
    }
    public void show(){                           //获取private值后，并打印输出
        System.out.println(name+"\n"+age);
    }
}
```


### jetBrains套装

[jetBrains介绍](https://baike.baidu.com/item/JetBrains)


### Facets

Facets表述了在Module中使用的各种各样的框架、技术和语言。这些Facets让Intellij IDEA知道怎么对待module内容，并保证与相应的框架和语言保持一致。

使用Facets能让我们下载并配置framework所必须的组件，会自动生成各种各样的描述符，并存储在适当的位置，等等。

大多数Facets可以无冲突得添加到Module中。

也有一些Facets是继承其他Facets的，这些Facets的添加就必须先添加他们的父Facets，这些Facets也要依赖Intellij IDEA的相关插件是否开启.

[Facets依赖列表](https://www.jetbrains.com/help/idea/2016.2/available-facets-and-their-dependencies.html)


### tomcat热更新

1.点击idea中tomcat设置(edit configurations)
2.点击deployment查看Deploy at the server startup 中选择+中的Artifact内的 demo:war exploded,其他都删除
3.然后在server中 将 "On Update action"、"On frame deactivation" 都选择 update classes and resources

### 下载安装jdk

//jdk-11.0.2 linux-x64
>wget https://download.oracle.com/otn-pub/java/jdk/11.0.2+9/f51449fcd52f4d52b93a989c5c56ed3c/jdk-11.0.2_linux-x64_bin.rpm?AuthParam=1548751263_8f9f40a8cb202ed4a51cdf67abd3baa1


[下载地址](https://download.oracle.com/otn-pub/java/jdk/11.0.2+9/f51449fcd52f4d52b93a989c5c56ed3c/jdk-11.0.2_linux-x64_bin.rpm?AuthParam=1548751263_8f9f40a8cb202ed4a51cdf67abd3baa1)

[java-jdk官网](https://www.oracle.com/technetwork/java/javase/downloads/jdk11-downloads-5066655.html)

[jdk安装步骤](https://www.cnblogs.com/xuzhiwei/p/4993035.html)

[idea打包成war](https://blog.csdn.net/walk_man_3/article/details/79404911)


### IDEA中编写spring配置文件命名空间无法自动导入问题----------最简单实用的方法

[常用的命名空间](https://blog.csdn.net/weixin_42382121/article/details/82050091)

### 更改tomcat默认浏览目录

>vi conf/server.xml

//添加Context语句
```
<HOST>
<Context path="" docBase="/usr/local/apache-tomcat-9.0.14/javamall" debug="0" reloadable="true" />
</HOST>
```

## Spring框架



## 整体架构
1，web.xml配置
2，***-servlet.xml
3，controller
4，Viewer


//web.xml
<!--servlet-->
<servlet>
    <servlet-name>shopping</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
    <servlet-name>shopping</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>

//shopping-servlet.xml
>文件取名必须与servlet-name一致

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.0.xsd
        http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc-3.0.xsd">

    <!--mvc拦截器-->
    <context:component-scan base-package="com.me2group.shopping.enterprise.controller"/>
    <mvc:annotation-driven/>
    <!--静态文件配置-->
    <mvc:resources mapping="/static/**" location="/static/"/>

    <!--配置jsp访问路径-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="viewClass" value="org.springframework.web.servlet.view.JstlView"/>
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <property name="suffix" value=".jsp"/>
    </bean>
    <!--解决统一异常处理配置-->
    <bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">
        <property name="exceptionMappings">
            <props>
                <prop key="com.me2group.shopping.enterprise.service.UserService">error</prop>
                <prop key="java.lang.NullPointerException">exception</prop>
            </props>
        </property>
    </bean>

</beans>
```

### jsp中EL表达式不起作用的问题

解决方法：添加如下语句
<%@page isELIgnored="false" %>

### servlet

服务连接器，狭义的Servlet是指Java语言实现的一个接口，主要功能在于交互式地浏览和生成数据，生成动态Web内容

生命周期
1.客户端请求该 Servlet；
2.加载 Servlet 类到内存；
3.实例化并调用init()方法初始化该 Servlet；
4.service()（根据请求方法不同调用doGet() 或者 doPost()，此外还有doHead()、doPut()、doTrace()、doDelete()、doOptions()、destroy())。
5.加载和实例化 Servlet。这项操作一般是动态执行的。然而，Server 通常会提供一个管理的选项，用于在 Server 启动时强制装载和初始化特定的 Servlet。



@Before: 前置通知, 在方法执行之前执行
@After: 后置通知, 在方法执行之后执行 。
@AfterRunning: 返回通知, 在方法返回结果之后执行
@AfterThrowing: 异常通知, 在方法抛出异常之后
@Around: 环绕通知, 围绕着方法执行

### Maven隐式变量

${basedir} 项目根目录
${project.build.directory} 构建目录，缺省为target
${project.build.outputDirectory} 构建过程输出目录，缺省为target/classes
${project.build.finalName} 产出物名称，缺省为${project.artifactId}-${project.version}
${project.packaging} 打包类型，缺省为jar
${project.xxx} 当前pom文件的任意节点的内容

### 表单检测
[Bean Validation](https://www.ibm.com/developerworks/cn/java/j-lo-jsr303/index.html)

//pom.xml插件添加
```
<dependency>
    <groupId>org.apache.geronimo.specs</groupId>
    <artifactId>geronimo-validation_1.0_spec</artifactId>
    <version>1.1</version>
</dependency>
<dependency>
    <groupId>org.apache.bval</groupId>
    <artifactId>org.apache.bval.bundle</artifactId>
    <version>0.5</version>
</dependency>
```

### 文件多个上传出现问题Request processing failed; 

那么要加上@RequestParam(“files”) 

@RequestParam(“files”) MultipartFile[] files,HttpServletRequest req


### mvc:resources静态路径配置

<mvc:resources mapping="/static/**" location="/static/"/>

mapping 是表示以/static开头的所有请求路径，如/static/a 或者/static/a/b，*是一级目录，**是所有目录

location 是表示webapp目录下的static包下的所有文件



> 该配置的作用是：DispatcherServlet不会拦截以/static开头的所有请求路径，并当作静态资源交由Servlet处理

###  无法修改的常量

public static final String name;

```
public static final String name="jack" ;
```

### POJO概念
Plain Ordinary Java Object(普通Java类)

普通Java类，具有一部分getter/setter方法的那种类就可以称作POJO

web应用程序中建立一个数据库的映射对象时，作为装载数据，不具有业务逻辑处理的能力



### Java Bean概念

Java Bean 是可复用的组件，任何一个 Java 类都可以是一个 Bean

由于 Java Bean 是被容器所创建（如 Tomcat) 的，Java Bean 应具有一个无参的构造器。

通常 Java Bean 还要实现 Serializable 接口用于实现 Bean 的持久性

Java Bean 是不能被跨进程访问的。JavaBean是一种组件技术

### 命令集

//打包成war
>jar -cvf shopping.war

//解压war包
>jar -xvf shopping.war


//安装jdk到linux
>rpm -ivh jdk-11.0.2_linux-x64_bin.rpm\?AuthParam\=1548751263_8f9f40a8cb202ed4a51cdf67abd3baa1 

//查找jdf安装目录
>rpm -ql java


//删除安装软件
>rpm -e java













