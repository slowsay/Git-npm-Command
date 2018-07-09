# mysql介绍
> 数据库应用



## =======安装知识点=======

### 用brew安装出现的问题
>brew install mysql 


1) 找不到brew安装的mysql，可以用
> mysql.server start
>/usr/local/opt/mysql/bin/mysql_secure_installation
>
or
找到my.cnf样例
>ls $(brew --prefix mysql)/support-files/my-*

2) 遇到报Access denied for user 'root'@'localhost'
//停止mysql
>mysql.server stop 
//启动安全模式
>mysqld_safe --skip-grant-tables
报
2018-02-28T02:25:17.6NZ mysqld_safe Logging to '/usr/local/var/mysql/192.168.1.10.err'.
2018-02-28T02:25:18.6NZ mysqld_safe Starting mysqld daemon with databases from /usr/local/var/mysql
3) //然后新建cmd窗口，运行无密码登录操作
>mysql -u root
//然后修改root密码，
mysql>grant all privileges on *.* to 'root'@'localhost' identified by '123456' with grant option;
上面一些解析：

root@localhost是用户
密码是123456
*.* 是 数据库.数据表

4) //遇到报ERROR 1290 (HY000): The MySQL server is running with the --skip-grant-tables option so it cannot execute this statement
mysql>set global read_only=0;//（关掉新主库的只读属性）
mysql>flush privileges;
//再执行
mysql> grant all privileges on *.* to 'root'@'localhost' identified by '123456' with grant option;
mysql>set global read_only=1;//(读写属性)
mysql>flush privileges;

5）//最后重启数据库
>mysql.server start




### 纯linux安装mysql问题


//查看mysql配置文件my.cnf的路径
>mysqld --help --verbose | more

*my.cnf文件路径
>/usr/local/etc/my.cnf


*可以先启动mysql.server
>mysql.server start
... starting
success!

>ps -ef |grep mysql

 501 68634     1   0 10:30下午 ??         0:00.03 /bin/sh /usr/local/bin/mysqld_safe --skip-grant-tables
  501 68755 68634   0 10:30下午 ??         0:00.64 /usr/local/Cellar/mysql/5.7.20/bin/mysqld --basedir=/usr/local/Cellar/mysql/5.7.20 --datadir=/usr/local/var/mysql --plugin-dir=/usr/local/Cellar/mysql/5.7.20/lib/plugin --skip-grant-tables --log-error=jack-2.local.err --pid-file=jack-2.local.pid --socket=/tmp/mysql.sock --port=3306



//创建数据库
>create database confluence default character set utf8 collate utf8_bin;
//创建数据库用户名与密码
>grant all on confluence.* to 'confluence'@'%' identified by '123456'



//出现Access denied for user 'root'@'localhost' (using password: YES)
// 停止mysql
>mysql.server stop

// 如果上面方法不行，可以试试下面的
>mysqladmin -uroot shutdown

// 启动mysql
>mysqld_safe

// 跳过验证并启动mysql
>mysqld_safe --skip-grand-tables
报
2017-12-26T14:30:40.6NZ mysqld_safe Logging to '/usr/local/var/mysql/jack-2.local.err'.
2017-12-26T14:30:40.6NZ mysqld_safe Starting mysqld daemon with databases from /usr/local/var/mysql
//无密码登录
>mysql -u root
>回车


### 查看服务器失败原因

> systemctl status mysqld.service



//如果没有/tmp/mysql.sock ，那么利用ln -s 软链接
>ln -s 原始文件夹 目标文件夹(最终要用的文件夹)


//如果是刚装可以直接进入
>mysql 

配置文件目录 /usr/local/var/mysql/

### 输出目前mysqld指定参数
>mysqld --print-defaults

### 用brew 查看安装情况
>brew info mysql

### 直接登录
>mysql -uroot -h127.0.0.1 -p





### sequelPro工具进行授权IP登录
解决方法：
//先进入mysql
>mysql -u root -p
//允许固定IP
mysql>grant all privileges on *.* to ‘root’@'116.62.18.201’ identified by ‘root’ with grant option; 

//允许所有ip
mysql>GRANT ALL PRIVILEGES ON *.* TO ‘testuser’@'%’ IDENTIFIED BY ‘testpassword’ WITH GRANT OPTION; 

//修改密码登录
mysql>grant all privileges on *.* to 'admin'@'183.129.146.2' identified by '123456';
mysql>flush privileges;
//所有操作必须更新

grant all privileges on *.* to 'root'@'127.0.0.1' identified by '123456';



--------------------------------------给mysql创建用户并分配权限
### 给mysql创建用户并分配权限
具体网址：http://blog.csdn.net/wuzhilon88/article/details/40376959

1.新建用户

　　//登录MYSQL

　　>mysql -u root -p
　　>密码

　　//创建用户
　　mysql> insert into mysql.user（Host,User,Password） values（‘localhost’，'jeecn’，password（‘jeecn’））;

　　//刷新系统权限表
　　mysql>flush privileges;
　　这样就创建了一个名为：jeecn  密码为：jeecn  的用户。

　　//退出后登录一下
　　mysql>exit;

　　>mysql -u jeecn -p
　　>输入密码
　　mysql>登录成功
　　2.为用户授权

　　//登录MYSQL（有ROOT权限）。我里我以ROOT身份登录。
　　>mysql -u root -p
　　>密码
　　
//首先为用户创建一个数据库（jeecnDB）
　　mysql>create database jeecnDB;
　　//授权jeecn用户拥有jeecn数据库的所有权限
　　@>grant all privileges on jeecnDB.* to jeecn@localhost identified by ‘jeecn’；
　　//刷新系统权限表
　　mysql>flush privileges;
　　mysql>其它操作

　　//如果想指定部分权限给一用户，可以这样来写：
　　mysql>grant select,update on jeecnDB.* to jeecn@localhost identified by ‘jeecn’；

　　//刷新系统权限表。
　　mysql>flush privileges;
　　mysql> grant 权限1,权限2,…权限n on 数据库名称。表名称 to 用户名@用户地址 identified by ‘连接口令’；

　　权限1,权限2,…权限n代表select,insert,update,delete,create,drop,index,alter,grant,references,reload,shutdown,process,file等14个权限。


### 删除mysql dmg
>sudo rm /usr/local/mysql
>sudo rm -rf /private/var/db/receipts/*mysql*

* 出现/tmp/mysql.sock
进入root
···
>sudo -s 

>vi ~/.bash_profile

>vi ~/.zshrc
···

* brew安装，是没有my.cnf文件，他是直接默认配置启动
> mysql --help |grep 'Default options' -A 1

### mysqld与mysql区别

mysqld 是服务端程序
mysql是命令行客户端程序


### 添加用户组
>groupadd mysqlist
>useradd mysqlist 

### 显示所有用户和组
>dscacheutil -q group

### 显示用户g
>cat /etc/group

//修改数据库密码
> SET PASSWORD FOR 'root'@'localhost' = PASSWORD('newpass');
//修改后的登录
>mysql -u root -p

## =======mysql操作语句=======


#### 创建数据库
mysql>create database taoring;

#### 使用taoring数据库
mysql>use taoring;
//创建表
mysql>create table;

//显示all数据库
mysql>show databases;

//显示表结构
mysql>describe user;

//插入
mysql>insert into 表名
->values('abc','f','1929-02-30','china');

//导入my.txt文本插入数据
mysql>LOAD DATA LOCAL INFILE "mytable.txt" INTO TABLE pet;

my.txt
------------------------
abccs f 1977-07-07 china 　 
mary f 1978-12-12 usa 
tom m 1970-09-02 usa
------------------------



#### 显示表table结构 
>show columns from groups;

//删除数据
mysql>delete from verification_codes where id='27';

#### mac OSX 不允许system级以外的服务使用1024以下的端口  nginx.conf不能设置80端口 ######

//释放内存
>purge

清除记录
>history -c 

>ll

top：查看cpu内存进程
lsof -i 网络进程

选择编辑器
> vi ~/.gitconfig
[core]
    editor=emacs  => vim

查多少个tomcat进程
>ps -ef |grep tomcat

命令跳转：
ctrl+a  跳转到行首
ctrl+e  跳转到行尾
ctrl+c  取消命令行
alt（option）+方向键 向指定方向 tab键的宽度

快速显示列表
>ll

>sudo -i 切换到root 
>su gary 切换到普通用户

//避免老是需要sudo授权
sudo chown -R whoami /usr/local

### 生成pem密钥，作登录依据 
ip:121.41.40.224

//本地，输入.ssh key 之后一路回车
>ssh-keygen -t rsa -b 2048 -v

//产生两个文件 一个是mykey ,另一个是mykey.pub
>mykey

//传送并安装到服务器证书
> ssh-copy-id -i ~/myPemKey.pub root@121.41.40.224

//测试连接
> sudo ssh -i ./mykey root@121.41.40.224






### mysql服务器路径
/var/local/mysql


>brew install mysql
//下载Mackport （软件包管理系统）
>wget http://distfiles.macports.org/MacPorts/MacPorts-2.4.1.tar.gz

//安装Mackports
>./configure
>make
>sudo make install

//启动mysql数据库
>mysql.server start



//配置问题
>mysqld --help --verbose


//创建conf
>sudo cp my-default.cnf /etc/my.cnf

//my-default.cnf
pid-file=/usr/local/mysql

### 数据库目录
数据库路径默认路径：/var/lib/mysql/
配置文件默认路径：/usr/share/mysql
相关命令默认路径：/usr/bin（mysqladmin mysqldump等命令）
启动脚本默认路径   /etc/rc.d/init.d/（启动脚本文件mysql的目录）

//数据库目录
>/var/lib/mysql/

//配置文件
>/usr/share/mysql

### 相关命令
>/usr/bin

### 启动
>/etc/rc.d/init.d

### 启动数据库
>mysql -h 127.0.0.1 -P 3306 -u root -p

### 设置数据库utf8
>set character_set_database=utf8;  

>show variables like 'character%';

#### 数据表重置归0
>truncate table group_members;


#### InnoDB与XtrDB区别

* XtrDB在内存量大的情况下，有优势，是maria的高性能数据存储
* InnoDB是mysql的基本数据存放地


## =======debug=======

> Starting MySQL
. ERROR! The server quit without updating PID file (/usr/local/var/mysql/xxxxx.local.pid).

### 是由于权限问题，解决
```
>sudo chmod -R slowsay /usr/local/var/mysql/
```

### 如何开始安装mysql数据库，出现mysql密码不对
就直接回车，默认为无密码


