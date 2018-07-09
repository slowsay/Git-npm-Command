# Maven常用命令及疑难问题


mvn archetype：create 创建Maven项目
mvn compile 编译源代码
mvn deploy 发布项目
mvn test-compile 编译测试源代码
mvn test 运行应用程序中的单元测试
mvn site 生成项目相关信息的网站
mvn clean 清除项目目录中的生成结果
mvn package 根据项目生成的jar
mvn install 在本地Repository中安装jar
mvn eclipse:eclipse 生成eclipse项目文件
mvn jetty:run 启动jetty服务
mvn tomcat:run 启动tomcat服务
mvn clean package -Dmaven.test.skip=true:清除以前的包后重新打包，跳过测试类



### example

1. 创建Maven的普通java项目： 
   mvn archetype:create 
   -DgroupId=packageName 
   -DartifactId=projectName  
2. 创建Maven的Web项目：   
    mvn archetype:create 
    -DgroupId=packageName    
    -DartifactId=webappName 
    -DarchetypeArtifactId=maven-archetype-webapp    
3. 清理编译：mvn clean compile
4. 清理测试：mvn clean test
5. 清理打包：mvn clean package  
6. 清理安装：mvn clean install
7. 生成eclipse项目：mvn eclipse:eclipse  
8. 生成idea项目：mvn idea:idea  
9. 编译测试的内容：mvn test-compile  
10. 只打jar包: mvn jar:jar  
11. 跳过测试:  mvn install -Dmaven.test.skip=true  
11. 指定端口:  mvn -Dmaven.tomcat.port=9090
12. 只测试而不编译，也不测试编译：mvn test -skipping compile -skipping test-compile ( -skipping 的灵活运用，当然也可以用于其他组合命令) 
13. 清除eclipse的一些系统设置: mvn eclipse:clean


## bug问题

* 通过cvs或svn下载代码到本机，然后执行mvn eclipse:eclipse生成ecllipse项目文件，然后导入到eclipse就行了；修改代码后执行mvn compile或mvn test检验，也可以下载eclipse的maven插件。

* 发布第三方Jar到本地库中： mvn install:install-file -DgroupId=com -DartifactId=client -Dversion=0.1.0 -Dpackaging=jar -Dfile=d:\client-0.1.0.jar。

#### maven打包
>mvn package

#### 跳过测试打包
>mvn package -Dmaven.test.skip=true

### maven下的Lifecycle

Clean Lifecycle 在进行真正的构建之前进行一些清理工作。
Default Lifecycle 构建的核心部分，编译，测试，打包，部署等等。
Site Lifecycle 生成项目报告，站点，发布站点。


### maven下的Plugins


### Maven出现JAVA_HOME is not defined
> Maven, JAVA_HOME is not defined correctly on Mac OSX
解决方法
>vi ~/.bash_profile
export JAVA_HOME=$(/usr/libexec/java_home)
>source ~/.bash_profile
就可以看到maven的版本号



















