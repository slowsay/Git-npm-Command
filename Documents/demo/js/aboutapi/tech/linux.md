## ----------------------------------目录索引



/usr        系统级的目录  可以理解为C:/Windows/
/usr/lib    理解为C:/Windows/System32
/usr/local  用户级的程序目录  可以理解为C:/Progrem Files/
/usr/src    系统级的源码目录
/usr/local/src  用户级的源码目录

/opt 用户级的程序目录  可以理解为D:/Software ,opt有可选的意思



## ----------------------------------云解释

* SaaS
-Software-as-a-Service软件即服务
特点
- 通过网络进行程序提供的服务
举例
- 教育工具，直播工具,这种平台

*PaaS
- Platform-as-a-Service的缩写，意思是平台即服务
特点
- 把服务器平台作为一种服务提供的商业模式
- 应用服务器、业务能力接入、业务引擎、业务开放平台
- 云环境中的应用基础设施服务
- 中间件
举例
- 阿里云，百度云

企业级
（1）基于商业软件的部署方式：Application - Framework/Libs - Websphere/Weblogic + RDBMS
（2）基于开源软件的部署方式：Application - Frameworks/Libs - Tomcat/JBoss + RDBMS
（3）云环境下的部署方式：Application - Frameworks/Libs - PaaS(Goole App Engine, Amazon)

----------------------------------分布式应用
WebLogic 是基于javaee的中间件

BEA WebLogic 是开发，集成 ，部署，管理的web应用，网络应用，数据库应用的java服务器

tomcat 是一个免费开源的容器和服务器

jboss是一个管理ejb的容器和服务器 不支持servlet/jsp

RDMBS是一个关系型数据库


### mac 本地打不开localhost

//创建apache2
>sudo mkdir /private/var/log/apache2

----------------------------------环境变量
>vi /etc/profile
export NODE_ENV=production



//linux添加用户
>useradd -u 600 -d /home/ppa -g users -m ppa

----------------------------------BSD
>Unix的衍生系统

linux ,os所有系统都以unix为内核

unix是多任务多用户
dos是单任务单用户

https://www.xquartz.org


ln -s /usr/local/node-v8.9.3-linux-x64/lib/node_modules/ /usr/


mv
-b                如果已存在相同文件名，则覆盖前进行备份

-f                 如果已存在相同文件名，而用户不具有写的权限，则强制覆盖

-i                 如果已存在相同文件名，覆盖前提示用户进行确认

-u                比较原文件与目标文件修改时间，如果目标文件较新则不覆盖

-v                列出所有被移动或重命名的文件


mongdb属于noSQL数据库的一中
是文档型数据库

###  各目录功能

>/bin 
bin是binary的缩写。这个目录沿袭了UNIX系统的结构，存放着使用者最经常使用的命令。例如cp、ls、cat，等等。 

>/boot 
这里存放的是启动Linux时使用的一些核心文件。 

>/dev 
dev是device（设备）的缩写。这个目录下是所有Linux的外部设备，其功能类似DOS下的.sys和Win下的.vxd。在Linux中设备和文件是用同种方法访问的。例如：/dev/hda代表第一个物理IDE硬盘。 

>/etc 
这个目录用来存放系统管理所需要的配置文件和子目录。 

>/home 
用户的主目录，比如说有个用户叫wang，那他的主目录就是/home/wang也可以用~wang表示。 

>/lib 
这个目录里存放着系统最基本的动态链接共享库，其作用类似于Windows里的.dll文件。几乎所有的应用程序都须要用到这些共享库。

>/var
文件系统


### VirtualBox与docker的区别

> VirtualBox虚拟硬件， docker虚拟系统环境


### 查找文件

> find / -name mysql


### apt-get更新出错

//更换老的源
>sudo sed -i -e 's/archive.ubuntu.com\|security.ubuntu.com/old-releases.ubuntu.com/g' /etc/apt/sources.list

### wget 
>用于下载文件

### curl
>访问网址

---------------------------------https


https支持在ALPN，ALPN需要openssl 1.0.2版本以上

#### 批量改文件后缀名
···
for i in *; do mv "$i" "$i/txt/md";done
···

### linux 安装apt-get，linuxbrew,nodejs等


//apt-get安装包
>wget http://packages.sw.be/apt/apt-0.5.15lorg3.94a-4.el5.rf.i386.rpm

//安装ruby

//安装 linuxbrew ====>>>http://linuxbrew.sh/ 
>sudo yum groupinstall 'Development Tools' && sudo yum install curl file git python-setuptools

//nodejs 源码
>wget https://nodejs.org/dist/v6.11.4/node-v6.11.4.tar.gz

//升级所有包
>yum -y updates

//搜索gcc
>yum list gcc-c++

//安装redis
>yum install redis

### 创建用户
```
>dscl . -create /User/cache

```
查看各用户ID
dscl . -list /Users UniqueID
查看用户所属组ID
dscl . -read /Users/root PrimaryGroupID
查看各组ID
dscl . -list /Groups PrimaryGroupID
查看组中的用户
dscl . -read /Groups/admin GroupMembership

 创建用户 "luser":
 dscl . -create /Users/luser
 dscl . -create /Users/luser UserShell /bin/bash
 dscl . -create /Users/luser RealName "Lucius Q. User"
### 注意 UniqueID必须唯一
 dscl . -create /Users/luser UniqueID "1010"
 dscl . -create /Users/luser PrimaryGroupID 80
 dscl . -create /Users/luser NFSHomeDirectory /Users/luser
 修改密码:
 dscl . -passwd /Users/luser password
 加入admin用户组
 dscl . -append /Groups/admin GroupMembership luser

从组中删除用户
delete groupname GroupMembership username

----------------------------------yum
### yum
> CentOS中的Shell前端软件包管理器。基于RPM包管理

#### 安装unzip,zip
> yum install  unzip zip


----------------------------------Mackports
### Mackports
//更新最新版本
>sudo port -v  selfupdate

//安装新软件
>sudo port install name

//查看最新版本
>port outdated

//查看当前版本
>port version

//搜索软件
>port search 软件名

//删除macports
>sudo port -f uninstall installed
>sudo port clean all
>sudo rm -rf \
放入下面内容
/opt/local \
/Applications/DarwinPorts \
/Applications/MacPorts \
/Library/LaunchDaemons/org.macports.* \
/Library/Receipts/DarwinPorts*.pkg \
/Library/Receipts/MacPorts*.pkg \
/Library/StartupItems/DarwinPortsStartup \
/Library/Tcl/darwinports1.0 \
/Library/Tcl/macports1.0 \
~/.macports

作者：drybeans
链接：http://www.jianshu.com/p/f9b2c74cb519
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


----------------------------------linux命令

### 查看系统详细版本
>cat /proc/version

brew 安装目录/usr/local/Cellar

//查询工具 的具体信息 man mysql
>man 命令

//显示文件类型
>file .gitconfig

bash(sh)
> bash是sh父集，sh是bash的软链接

//-r是递归命令
>sudo cp -r home home.bak

//查看磁盘容量
>df -k

//查看系统配置  // Darwin(达尔文)开源操作系统  是mac osx的一部分
> uname -a

//一小时不进屏保
>caffeinate -t 3600

//直接更新os x
>sudo softwareupdate -i -a

//隐藏文件或文件夹
>chflags hidden ~/Desktop/macx

//创建有密码保护的压缩文件
>zip -e 目标.zip 源文件夹

//查看模拟并发数
>ulimit -n

//重启防火墙
>sudo systemctl restart firewalld


//查找显示内容
>grep -r-color "nginx" ./*

//当前目录搜索nginx
>grep "nginx" *

//当前目录及子目录
>grep -r "nginx" *

//当前目录及子目录，显示匹配的行
>grep -i -r "nginx" *


### truncate
* 文件缩小或者扩展到某个给定的大小 ，可以利用该命令和-s选项来特别指定文件的大小

>truncate -s 1k test.html


### dig查看ip解析
>dig


//系统命令
>uname -a


>vi |vim

:set nu//显示行号


## kill 中止进程

>ps -ef |grep :8080

>kill -9 pid号

-l  信号，若果不加信号的编号参数，则使用“-l”参数会列出全部的信号名称

-a  当处理当前进程时，不限制命令名和进程号的对应关系

-p  指定kill 命令只打印相关进程的进程号，而不发送任何信号

-s  指定发送信号

-u  指定用户 
//====================//
HUP    1    终端断线
INT     2    中断（同 Ctrl + C）
QUIT    3    退出（同 Ctrl + \）
TERM   15    终止
KILL    9    强制终止
CONT   18    继续（与STOP相反， fg/bg命令）
STOP    19    暂停（同 Ctrl + Z）


----------------------------------------which,find,grep
### 查找nginx安装目录
>which nginx

### 进程序目录
>ps -ef |grep nginx

### 查找文件
>find / -name mysql.sock

>find /etc/ -name "*.sock"


----------------------------------------rpm(RedHat) 查询是否安装pcre
Package Manager(软件包管理器)

>rpm -qa pcre

### mac dtruss系统调用跟踪命令

>dtruss

-c 输出系统调用数

-d 输出时间消耗
-e 输出剩余多少时间
-f 监视fork出来的进程调用

-l force printing of pid/lwpid per line

-L don't print pid/lwpid per line

-n name 跟踪名为name的进程
-o 输出花在cpu上的时间

-s 输出栈跟踪

-p PID 监视某个pid

-t syscall 只监视某个系统调用

执行并监控"df -h"命令的系统调用
>dtruss df -h
监控pid为1871的进程此时之后的系统调用
> dtruss -p 1871

监控所有名为 "tar"的进程
> dtruss -n tar

执行脚本test.sh，并监控子进程
> dtruss -f test.sh

执行"date" 命令并输出cpu消耗和剩余时间
> dtruss -eo date


### linux strace系统调用跟踪命令





--------------------------------------netstat查看所有端口进程
> netstat -a 

linux
>netstat -ntlp   //查看当前所有tcp端口·
>netstat -ntulp |grep 80   //查看所有80端口使用情况·
>netstat -an | grep 3306   //查看所有3306端口使用情况·


mac 

>lsof -i tcp //查看当前所有tcp端口
>lsof -i -s |grep 80 //查看所有80端口使用情况
>lsof -i :80 
>lsof -l //显示所有进程

>lsof -i -P | grep -i "listen"//



## firewall-cmd
> 防火墙命令



## linux etc目录
> 存放一些常规配置目录

## ip a
>显示所有IP地址


## Crond
>LINUX中，周期执行的任务一般由cron这个守护进程来处理


## 查看物理CPU个数
  cat /proc/cpuinfo| grep "physical id" | sort| uniq | wc -l

  # 查看每个物理CPU中core的个数(即核数)
  cat /proc/cpuinfo| grep "cpu cores"| uniq

  # 查看逻辑CPU的个数
  cat /proc/cpuinfo| grep "processor"| wc -l


## 查看openssl版本
>rpm -aq |grep openssl


## ip : 0 0.0.0.0:80  
- 不确定地址，可以任意一个


## 性能测试工具


multi-mechanize:https://pypi.python.org/pypi/multi-mechanize


Grinder:http://grinder.sourceforge.net/


MySQL-python:https://pypi.python.org/pypi/MySQL-python


## 磁盘测试工具


Linux命令hdparm、bonnie++、fio监控工具


Linux命令sar、top、iostat、free、ps、lsof、netstat等及proc文件系统。


## 安装brew

>ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"


## 网络工具


Linux命令tc、iptables等。

## Loaded plugins: fastestmirror

1.修改插件的配置文件

> vi  /etc/yum/pluginconf.d/fastestmirror.conf  

enabled = 1//由1改为0，禁用该插件

2.修改yum的配置文件

>vi /etc/yum.conf

//plugins=1//改为0，不使用插件



## 常见的ssl证书检测地址：
1：https://www.qcloud.com/product/ssl.html#userDefined10
     此链接用户排查域名是否支持tsl1.2，证书与域名是否匹配；必须全绿才算通过；
2：https://www.myssl.cn/tools/check-server-cert.html
     此链接主要用于排查是否缺少中间证书，必须全绿才算通过；
3：辅助检测地址：https://www.ssllabs.com/ssltest/index.html




## tee
> 数据转向文件


## chkconfig
>开机就启动服务命令



##服务器端用户组
> cat /etc/group


## make 编译
 make 
> 命令像命令行参数一样接收目标
> 目标通常存放在以 “Makefile” 来命名的特殊文件中



--------------------------------------vi/vim
行尾
>shift $
行首
>0
------------------------------------tar 打包压缩 &解压
-c 压缩  -x 解压  -v显示过程  -f使用档案名字  -u更新原包内容



打包不压缩
>tar -cvf 目标包.tar 源文件夹

打包压缩
> tar -jcvf 目标包.tar 源文件夹  

打包压缩gzip
> tar -zcvf  目标包.tar.gz 源文件夹


解压 
> tar -xvf 目标包   

Verbose详细信息
Interactive 要求确认


------------------------------------查看ip配置
>ip addr

------------------------------------tail  查看文件内容
实时查看文件内容
>tail -f 文件

>sed -n '5,10p' 文件   //查看第5行-第10行内容


-------------------------------禁止.DS_store产生命令
defaults write com.apple.desktopservices DSDontWriteNetworkStores true

-----------------------------------ls 显示
grep是一个辅助命令，搜索资料用


>ls -l |grep 'tag'

显示所有文件，包括隐藏文件
>ls -a

------------------------------------用户密码修改

>passwd cache

-----------------------------------du显示容量  
查看容量
>du -h

当前目录总容量
>du -hc

-h：以人类可读的方式显示
　　-a：显示目录占用的磁盘空间大小，还要显示其下目录和文件占用磁盘空间的大小
　　-s：显示目录占用的磁盘空间大小，不要显示其下子目录和文件占用的磁盘空间大小
　　-c：显示几个目录或文件占用的磁盘空间大小，还要统计它们的总和
　　--apparent-size：显示目录或文件自身的大小
　　-l ：统计硬链接占用磁盘空间的大小
　　-L：统计符号链接所指向的文件占用的磁盘空间大小


###  rsync一些问题
我们都是通过错误日志查看
在rsyncd.log里面或.err文件里面，大家可以用记事本打开查看。

注意windows下面我们需要给SvcwRsync用户，管理同步目录的所有权限，基本上这样就可以了

问题一： 
@ERROR: chroot failed 
rsync error: error starting client-server protocol (code 5) at main.c(1522) [receiver=3.0.3] 

原因： 
服务器端的目录不存在或无权限，创建目录并修正权限可解决问题。 

问题二： 
@ERROR: auth failed on module tee 
rsync error: error starting client-server protocol (code 5) at main.c(1522) [receiver=3.0.3] 

原因： 
服务器端该模块（tee）需要验证用户名密码，但客户端没有提供正确的用户名密码，认证失败。 
提供正确的用户名密码解决此问题。 

问题三： 
@ERROR: Unknown module ‘tee_nonexists' 
rsync error: error starting client-server protocol (code 5) at main.c(1522) [receiver=3.0.3] 

原因： 
服务器不存在指定模块。提供正确的模块名或在服务器端修改成你要的模块以解决问题。 


问题1： 
在client上遇到问题： 
rsync -auzv --progress --password-file=/etc/rsync.pas root@192.168.133.128::backup /home/ 
rsync: could not open password file "/etc/rsync.pas": No such file or directory (2) 
Password: 
@ERROR: auth failed on module backup 
rsync error: error starting client-server protocol (code 5) at main.c(1506) [Receiver=3.0.7] 
遇到这个问题：client端没有设置/etc/rsync.pas这个文件，而在使用rsync命令的时候，加了这个参数-- 
password-file=/etc/rsync.pas 

问题2： 
rsync -auzv --progress --password-file=/etc/rsync.pas root@192.168.133.128::backup /home/ 
@ERROR: auth failed on module backup 
rsync error: error starting client-server protocol (code 5) at main.c(1506) [Receiver=3.0.7] 
遇到这个问题：client端已经设置/etc/rsync.pas这个文件，里面也设置了密码111111，和服务器一致，但是 
服务器段设置有错误，服务器端应该设置/etc/rsync.pas ，里面内容root:111111 ,这里登陆名不可缺少 

问题3： 
rsync -auzv --progress --password-file=/etc/rsync.pas root@192.168.133.128::backup /home/ 
@ERROR: chdir failed 
rsync error: error starting client-server protocol (code 5) at main.c(1506) [Receiver=3.0.7] 
遇到这个问题，是因为服务器端的/home/backup 其中backup这个目录并没有设置，所以提示：chdir failed 

问题4： 
rsync: write failed on "/home/backup2010/wensong": No space left on device (28) 
rsync error: error in file IO (code 11) at receiver.c(302) [receiver=3.0.7] 
rsync: connection unexpectedly closed (2721 bytes received so far) [generator] 
rsync error: error in rsync protocol data stream (code 12) at io.c(601) [generator=3.0.7] 
磁盘空间不够，所以无法操作。 
可以通过df /home/backup2010 来查看可用空间和已用空间 

问题5：网络收集问题 
1、权限问题 
类似如下的提示：rsync: opendir "/kexue" (in dtsChannel) failed: Permission denied (13)注意查看同步的目录权限是否为755 
2、time out 
rsync: failed to connect to 203.100.192.66: Connection timed out (110) 
rsync error: error in socket IO (code 10) at clientserver.c(124) [receiver=3.0.5] 
检查服务器的端口netstat –tunlp，远程telnet测试。 
可能因为客户端或者服务端的防火墙开启 导致无法通信，可以设置规则放行 rsync（873端口） 或者直接关闭防火墙。 

还有一种在同步过程中可能会提示没有权限 （将同步目录加上SvcwRsync全部权限即可，更简单的方法就是将SvcwRsync设为管理员即可）


3、服务未启动 
rsync: failed to connect to 10.10.10.170: Connection refused (111) 
rsync error: error in socket IO (code 10) at clientserver.c(124) [receiver=3.0.5] 
启动服务：rsync --daemon --config=/etc/rsyncd.conf 
4、磁盘空间满 
rsync: recv_generator: mkdir "/teacherclubBackup/rsync……" failed: No space left on device (28) 
*** Skipping any contents from this failed directory *** 
5、Ctrl+C或者大量文件 
rsync error: received SIGINT, SIGTERM, or SIGHUP (code 20) at rsync.c(544) [receiver=3.0.5] 
rsync error: received SIGINT, SIGTERM, or SIGHUP (code 20) at rsync.c(544) [generator=3.0.5] 
说明：导致此问题多半是服务端服务没有被正常启动，到服务器上去查查服务是否有启动，然后查看下 /var/run/rsync.pid 文件是否存在，最干脆的方法是杀死已经启动了服务，然后再次启动服务或者让脚本加入系统启动服务级别然后shutdown -r now服务器

6、xnetid启动 
rsync: read error: Connection reset by peer (104) 
rsync error: error in rsync protocol data stream (code 12) at io.c(759) [receiver=3.0.5] 
查看rsync日志 
rsync: unable to open configuration file "/etc/rsyncd.conf": No such file or directory 
xnetid查找的配置文件位置默认是/etc下，根据具体情况创建软链接。例如： 
ln -s /etc/rsyncd/rsyncd.conf /etc/rsyncd.conf 
或者更改指定默认的配置文件路径，在/etc/xinetd.d/rsync配置文件中。 
Rsync configure:
配置一：
ignore errors
说明：这个选项最好加上，否则再很多crontab的时候往往发生错误你也未可知，因为你不可能天天去看每时每刻去看log，不加上这个出现错误的几率相对会很高，因为任何大点的项目和系统，磁盘IO都是一个瓶颈

Rsync error： 
错误一： 
@ERROR: auth failed on module xxxxx 
rsync: connection unexpectedly closed (90 bytes read so far) 
rsync error: error in rsync protocol data stream (code 12) at io.c(150) 
说明：这是因为密码设置错了，无法登入成功，检查一下rsync.pwd，看客服是否匹配。还有服务器端没启动rsync 服务也会出现这种情况。

错误二： 
password file must not be other-accessible 
continuing without password file 
Password: 
说明：这是因为rsyncd.pwd rsyncd.sec的权限不对，应该设置为600。如：chmod 600 rsyncd.pwd

错误三： 
@ERROR: chroot failed 
rsync: connection unexpectedly closed (75 bytes read so far) 
rsync error: error in rsync protocol data stream (code 12) at io.c(150) 
说明：这是因为你在 rsync.conf 中设置的 path 路径不存在，要新建目录才能开启同步

错误四： 
rsync: failed to connect to 218.107.243.2: No route to host (113) 
rsync error: error in socket IO (code 10) at clientserver.c(104) [receiver=2.6.9] 
说明：防火墙问题导致，这个最好先彻底关闭防火墙，排错的基本法就是这样，无论是S还是C，还有ignore errors选项问题也会导致

错误五：
@ERROR: access denied to www from unknown (192.168.1.123)
rsync: connection unexpectedly closed (0 bytes received so far) [receiver]
rsync error: error in rsync protocol data stream (code 12) at io.c(359)
说明：此问题很明显，是配置选项host allow的问题，初学者喜欢一个允许段做成一个配置，然后模块又是同一个，致使导致

错误六：
rsync error: received SIGINT, SIGTERM, or SIGHUP (code 20) at rsync.c(244) [generator=2.6.9]
rsync error: received SIGUSR1 (code 19) at main.c(1182) [receiver=2.6.9]
说明：导致此问题多半是服务端服务没有被正常启动，到服务器上去查查服务是否有启动，然后查看下 /var/run/rsync.pid 文件是否存在，最干脆的方法是杀死已经启动了服务，然后再次启动服务或者让脚本加入系统启动服务级别然后shutdown -r now服务器

错误七：
rsync: read error: Connection reset by peer (104)
rsync error: error in rsync protocol data stream (code 12) at io.c(604) [sender=2.6.9]
说明：原数据目录里没有数据存在

-----------------------------------chmod 文件夹属性

>chmod 600 目录/文件


-rw------- (600) -- 只有属主有读写权限。
-rw-r--r-- (644) -- 只有属主有读写权限；而属组用户和其他用户只有读权限。
-rwx------ (700) --只有属主有读、写、执行权限。
-rwxr-xr-x (755) -- 属主有读、写、执行权限；而属组用户和其他用户只有读、执行权限。
-rwx--x--x (711) -- 属主有读、写、执行权限；而属组用户和其他用户只有执行权限。
-rw-rw-rw- (666) --所有用户都有文件读、写权限。这种做法不可取。
-rwxrwxrwx (777) -- 所有用户都有读、写、执行权限。更不可取的做法。
drwx------ (700) - 只有属主可在目录中读、写。
drwxr-xr-x (755)- 所有用户可读该目录，但只有属主才能改变目录中的内容。

-----------------------------------chown  改变拥有者或组
>sudo chown -R [用户群组].[用户]

>sudo chown -R cache.cache homepage 

//更改服务器上的权限
sudo chown -R cache.cache homepage

-c 显示更改的部分的信息

　　　　-f 忽略错误信息

　　　　-h 修复符号链接

　　　　-R 处理指定目录以及其子目录下的所有文件

　　　　-v 显示详细的处理信息

　　　　-deference 作用于符号链接的指向，而不是链接文件本身


drwxrwxr-x 2 oracle dba 81920 Dec 5 10:10 REPORT 的含义是（从左至右分别是）：
d：此文件是个实实在在的文件而非一个目录（目录也被认为是文件）
rwx：文件拥有者对此文件有读、写、执行的权限
rwx：同群组用户对此文件有读、写、执行的权限
r-x：其它用户对此文件有读、执行的权限,没有写权限
2：文件连接数
oracle：文件拥有者是用户oracle
dba：所属群组是dba,
81920：文件大小81920（80K）
Dec 5 10:10：文件创建时间是12月5日 10:10
REPORT：文件名
drwxrwxr-x：组用户有读、写、执行的权限
drwxr-xr-x：组用户没有写的权限,只有读和执行的权限



----------------------------------ln -s   链接(link) 不占用空间


加入链接 
>ln -s 当前目录  目标目录

取消链接
>rm -rf 目标目录  

----------------------------------cp 复制命令
强制命令
> cp -R 源目录 新目录

----------------------------------ssh命令
ssh root@ip 

-1：强制使用ssh协议版本1； 
-2：强制使用ssh协议版本2；
 -4：强制使用IPv4地址；
  -6：强制使用IPv6地址；
   -A：开启认证代理连接转发功能；
    -a：关闭认证代理连接转发功能；
     -b：使用本机指定地址作为对应连接的源ip地址；
      -C：请求压缩所有数据；
       -F：指定ssh指令的配置文件；
        -f：后台执行ssh指令；
         -g：允许远程主机连接主机的转发端口；
          -i：指定身份文件； 
          -l：指定连接远程服务器登录用户名；
           -N：不执行远程指令；
            -o：指定配置选项；
             -p：指定远程服务器上的端口；
              -q：静默模式；
               -X：开启X11转发功能；
                -x：关闭X11转发功能；
                 -y：开启信任X11转发功能
来自: http://man.linuxde.net/ssh

----------------------------------scp文件传输
 从远程下载到本地
>scp cache@211.155.83.84:/home/root/others/music /home/space/music/1.mp3


从本地传到远程
>scp ./home/test/* cache@211.155.83.84:/home/cache/tomcat/

----------------------------------rsync同步命令
SSL证书是数字证书 文件后缀.pem

### 只上传需要的文件夹
>rsync -avz --include "./*" --exclude "./node_modules" cache@116.62.18.201:/home/cache/api/meet/


### 出现问题服务器端没有开启 rsync 服务
rsync error: error in rsync protocol data stream (code 12) at io.c
//
> yum install -y rsync 

> touch dev.pem

> ssh -i ./dev.pem cache@211.155.83.84

//执行shell脚本 
> sh zbin/c121.bash|sh


/home/cache/bin/tomcat/webapps/enterprise

rsync -avz ./doctor/* cache@211.155.83.84:/home/cache/bin/tomcat/webapps/enterprise/doctor/ -e 'ssh -i ./dev.pem' 
rsync -avz ./webh5/*  cache@211.155.83.84:/home/cache/bin/tomcat/webapps/enterprise/webh5/ -e 'ssh -i ./dev.pem' 

### rsync使用端口传送
//配置添加
>vi ~/.ssh/config

```
Port 26680

```
//同步,linux服务器上也要有rsync服务
>rsync -avz  /usr/local/node_modules/ root@67.218.145.233:/usr/local/node_modules/


-a 归档模式
-v 增量
-z 压缩传送
-e 远程指定shell脚本


1 -v, --verbose 详细模式输出
 2 -q, --quiet 精简输出模式
 3 -c, --checksum 打开校验开关，强制对文件传输进行校验
 4 -a, --archive 归档模式，表示以递归方式传输文件，并保持所有文件属性，等于-rlptgoD
 5 -r, --recursive 对子目录以递归模式处理
 6 -R, --relative 使用相对路径信息
 7 -b, --backup 创建备份，也就是对于目的已经存在有同样的文件名时，将老的文件重新命名为~filename。可以使用--suffix选项来指定不同的备份文件前缀。
 8 --backup-dir 将备份文件(如~filename)存放在在目录下。
 9 -suffix=SUFFIX 定义备份文件前缀
10 -u, --update 仅仅进行更新，也就是跳过所有已经存在于DST，并且文件时间晚于要备份的文件。(不覆盖更新的文件)
11 -l, --links 保留软链结
12 -L, --copy-links 想对待常规文件一样处理软链结
13 --copy-unsafe-links 仅仅拷贝指向SRC路径目录树以外的链结
14 --safe-links 忽略指向SRC路径目录树以外的链结
15 -H, --hard-links 保留硬链结
16 -p, --perms 保持文件权限
17 -o, --owner 保持文件属主信息
18 -g, --group 保持文件属组信息
19 -D, --devices 保持设备文件信息
20 -t, --times 保持文件时间信息
21 -S, --sparse 对稀疏文件进行特殊处理以节省DST的空间
22 -n, --dry-run现实哪些文件将被传输
23 -W, --whole-file 拷贝文件，不进行增量检测
24 -x, --one-file-system 不要跨越文件系统边界
25 -B, --block-size=SIZE 检验算法使用的块尺寸，默认是700字节
26 -e, --rsh=COMMAND 指定使用rsh、ssh方式进行数据同步
27 --rsync-path=PATH 指定远程服务器上的rsync命令所在路径信息
28 -C, --cvs-exclude 使用和CVS一样的方法自动忽略文件，用来排除那些不希望传输的文件
29 --existing 仅仅更新那些已经存在于DST的文件，而不备份那些新创建的文件
30 --delete 删除那些DST中SRC没有的文件
31 --delete-excluded 同样删除接收端那些被该选项指定排除的文件
32 --delete-after 传输结束以后再删除
33 --ignore-errors 及时出现IO错误也进行删除
34 --max-delete=NUM 最多删除NUM个文件
35 --partial 保留那些因故没有完全传输的文件，以是加快随后的再次传输
36 --force 强制删除目录，即使不为空
37 --numeric-ids 不将数字的用户和组ID匹配为用户名和组名
38 --timeout=TIME IP超时时间，单位为秒
39 -I, --ignore-times 不跳过那些有同样的时间和长度的文件
40 --size-only 当决定是否要备份文件时，仅仅察看文件大小而不考虑文件时间
41 --modify-window=NUM 决定文件是否时间相同时使用的时间戳窗口，默认为0
42 -T --temp-dir=DIR 在DIR中创建临时文件
43 --compare-dest=DIR 同样比较DIR中的文件来决定是否需要备份
44 -P 等同于 --partial
45 --progress 显示备份过程
46 -z, --compress 对备份的文件在传输时进行压缩处理
47 --exclude=PATTERN 指定排除不需要传输的文件模式
48 --include=PATTERN 指定不排除而需要传输的文件模式
49 --exclude-from=FILE 排除FILE中指定模式的文件
50 --include-from=FILE 不排除FILE指定模式匹配的文件
51 --version 打印版本信息
52 --address 绑定到特定的地址
53 --config=FILE 指定其他的配置文件，不使用默认的rsyncd.conf文件
54 --port=PORT 指定其他的rsync服务端口
55 --blocking-io 对远程shell使用阻塞IO
56 -stats 给出某些文件的传输状态
57 --progress 在传输时现实传输过程
58 --log-format=formAT 指定日志文件格式
59 --password-file=FILE 从FILE中得到密码
60 --bwlimit=KBPS 限制I/O带宽，KBytes per second
61 -h, --help 显示帮助信息

----------------------------------grep命令
全局搜索文字信息

搜索有s字符的所有文件日志
> git log |grep 's'


//带颜色的命令 ,内容单引号
//mac
>grep -r-color '要查找的内容' ./  

//linux
>grep -r --color 'sh' ./


-a ：将 binary 文件以 text 文件的方式搜寻数据
-c ：计算找到 '搜寻字符串' 的次数
-i ：忽略大小写的不同，所以大小写视为相同
-n ：顺便输出行号
-v ：反向选择，亦即显示出没有 '搜寻字符串' 内容的那一行！
--color=auto ：可以将找到的关键词部分加上颜色的显示喔！

----------------------------------scp上传

首先要登录服务器，使用ssh

1、从服务器上下载文件
scp username@servername:/path/filename /var/www/local_dir（本地目录）

 例如scp root@192.168.0.101:/var/www/test.txt  把192.168.0.101上的/var/www/test.txt 的文件下载到/var/www/local_dir（本地目录）


2、上传本地文件到服务器
scp /path/filename username@servername:/path   

例如scp /var/www/test.php  root@192.168.0.101:/var/www/  把本机/var/www/目录下的test.php文件上传到192.168.0.101这台服务器上的/var/www/目录中

 

3、从服务器下载整个目录
scp -r username@servername:/var/www/remote_dir/（远程目录） /var/www/local_dir（本地目录）

例如:scp -r root@192.168.0.101:/var/www/test  /var/www/  

4、上传目录到服务器
scp  -r local_dir username@servername:remote_dir
例如：scp -r test  root@192.168.0.101:/var/www/   把当前目录下的test目录上传到服务器的/var/www/ 目录

----------------------------------shell
命令：
pwd:显示工作目录（Print Working Directory）
vi:编辑内容
cat:显示内容
echo:显示一段信息，如：echo $HOME|$PATH，echo "hello"
echo:DOS批处理命令的一条子命令
ls：显示所有文件列表
mkdir:创建文件夹
rmdir:删除文件夹
df -h            命令查看整个硬盘的大小 ，-h表示人可读的
du -d 1 -h    命令查看当前目录下所有文件夹的大小 -d 指深度，后面加一个数值

如果你想一劳永逸，永久显示这些隐藏文件，可以在终端里执行：

defaults write com.apple.finder AppleShowAllFiles -bool true，

重新隐藏他们可执行：

defaults write com.apple.finder AppleShowAllFiles -bool false ，
----------------------------------apachectl
$ sudo apachectl start
$ sudo apachectl restart
$ sudo apachectl stop
----------------------------------

mac apache无法访问服务器，解决方案

在/private/var/log 建立apache2文件夹




----------------------------------
程序：
test.
cat

计算器
$ bc   
quit退出

日历
$ cal

日期
$ date

$ shutdown
$ reboot
$ poweroff
进程
$ ps

----------------------------------压缩
压缩

tar -cvf jpg.tar *.jpg //将目录里所有jpg文件打包成tar.jpg 

tar -czf jpg.tar.gz *.jpg   //将目录里所有jpg文件打包成jpg.tar后，并且将其用gzip压缩，生成一个gzip压缩过的包，命名为jpg.tar.gz

 tar -cjf jpg.tar.bz2 *.jpg //将目录里所有jpg文件打包成jpg.tar后，并且将其用bzip2压缩，生成一个bzip2压缩过的包，命名为jpg.tar.bz2

tar -cZf jpg.tar.Z *.jpg   //将目录里所有jpg文件打包成jpg.tar后，并且将其用compress压缩，生成一个umcompress压缩过的包，命名为jpg.tar.Z

rar a jpg.rar *.jpg //rar格式的压缩，需要先下载rar for linux

zip jpg.zip *.jpg //zip格式的压缩，需要先下载zip for linux

解压

tar -xvf file.tar //解压 tar包

tar -xzvf file.tar.gz //解压tar.gz

tar -xjvf file.tar.bz2   //解压 tar.bz2

tar -xZvf file.tar.Z   //解压tar.Z

unrar e file.rar //解压rar

unzip file.zip //解压zip

//指定解压到tmp目录
>unzip -n file.zip /tmp 



----------------------------------epoll
linux内核，处理大批文件，提高程序大量并发连接

优点：内核微调
工作方式：LT和ET

系统调用：epoll_create, epoll_ctl等

并发用于连接续任务时比较好

并行适合，所有用户请求接口



----------------------------------udp

并发



01:06:48 当前时间 
up 1:22 系统运行时间，格式为时:分 
1 user 当前登录用户数 
load average: 0.06, 0.60, 0.48 系统负载，即任务队列的平均长度。
三个数值分别为 1分钟、5分钟、15分钟前到现在的平均值。


----------------------------------------top命令


$ top -o m  //内存降序,在mac 中m=mem

$ top -o p  //显示cpu降序,mac中p=cpu
----------------------------------------make

make是一个命令工具，它解释Makefile 中的指令

自动化编译


----------------------------------------GNU自由操作系统







----------------------------------------端口
apc-78467846/tcp#APC7846；
apc-78467846/udp#APC7846；
ubroker7887/tcp#Universa；
ubroker7887/udp#Universa；
tnos-sp7901/tcp#TNOSServ；
tnos-sp7901/udp#TNOSServ；
tnos-dp7902/tcp#TNOSDiag；tnos-

apc-7846 7846/tcp # APC 7846

apc-7846 7846/udp # APC 7846

ubroker 7887/tcp # Universal Broker

ubroker 7887/udp # Universal Broker

tnos-sp 7901/tcp # TNOS Service Protocol

tnos-sp 7901/udp # TNOS Service Protocol

tnos-dp 7902/tcp # TNOS DiaguardProtocol

tnos-dp 7902/udp # TNOS DiaguardProtocol

tnos-dps 7903/tcp # TNOS Secure DiaguardProtocol

tnos-dps 7903/udp # TNOS Secure DiaguardProtocol

qo-secure 7913/tcp # QuickObjects secure port

qo-secure 7913/udp # QuickObjects secure port

t2-drm 7932/tcp # Tier 2 Data Resource Manager

t2-drm 7932/udp # Tier 2 Data Resource Manager

t2-brm 7933/tcp # Tier 2 Business Rules Manager

t2-brm 7933/udp # Tier 2 Business Rules Manager

supercell 7967/tcp # Supercell

supercell 7967/udp # Supercell

micromuse-ncps 7979/tcp # Micromuse-ncps

micromuse-ncps 7979/udp # Micromuse-ncps

quest-vista 7980/tcp # Quest Vista

quest-vista 7980/udp # Quest Vista

irdmi2 7999/tcp # iRDMI2

irdmi2 7999/udp # iRDMI2

irdmi 8000/tcp # iRDMI

irdmi 8000/udp # iRDMI

vcom-tunnel 8001/tcp # VCOM Tunnel

vcom-tunnel 8001/udp # VCOM Tunnel

teradataordbms 8002/tcp # Teradata ORDBMS

teradataordbms 8002/udp # Teradata ORDBMS

intu-ec-svcdisc 8020/tcp # Intuit Entitlement Service and Discovery intu-ec-svcdisc 8020/udp # Intuit Entitlement Service and Discovery intu-ec-client 8021/tcp # Intuit Entitlement Client

intu-ec-client 8021/udp # Intuit Entitlement Client

oa-system 8022/tcp # oa-system

oa-system 8022/udp # oa-system

pro-ed 8032/tcp # ProEd

pro-ed 8032/udp # ProEd

mindprint 8033/tcp # MindPrint

mindprint 8033/udp # MindPrint

us-cli 8082/tcp # Utilistor (Client)

us-cli 8082/udp # Utilistor (Client)

us-srv 8083/tcp # Utilistor (Server)

us-srv 8083/udp # Utilistor (Server)

radan-http 8088/tcp # Radan HTTP

radan-http 8088/udp # Radan HTTP

xprint-server 8100/tcp # Xprint Server

xprint-server 8100/udp # Xprint Server

mtl8000-matrix 8115/tcp # MTL8000 Matrix

mtl8000-matrix 8115/udp # MTL8000 Matrix

cp-cluster 8116/tcp # Check Point Clustering

cp-cluster 8116/udp # Check Point Clustering

privoxy 8118/tcp # Privoxy HTTP proxy

privoxy 8118/udp # Privoxy HTTP proxy

apollo-data 8121/tcp # Apollo Data Port

apollo-data 8121/udp # Apollo Data Port

apollo-admin 8122/tcp # Apollo Admin Port

apollo-admin 8122/udp # Apollo Admin Port

paycash-online 8128/tcp # PayCash Online Protocol

paycash-online 8128/udp # PayCash Online Protocol

paycash-wbp 8129/tcp # PayCash Wallet-Browser

paycash-wbp 8129/udp # PayCash Wallet-Browser

indigo-vrmi 8130/tcp # INDIGO-VRMI

indigo-vrmi 8130/udp # INDIGO-VRMI

indigo-vbcp 8131/tcp # INDIGO-VBCP

indigo-vbcp 8131/udp # INDIGO-VBCP

dbabble 8132/tcp # dbabble

dbabble 8132/udp # dbabble

isdd 8148/tcp # i-SDD file transfer

isdd 8148/udp # i-SDD file transfer

patrol 8160/tcp # Patrol

patrol 8160/udp # Patrol

patrol-snmp 8161/tcp # Patrol SNMP

patrol-snmp 8161/udp # Patrol SNMP

vvr-data 8199/tcp # VVR DATA

vvr-data 8199/udp # VVR DATA

trivnet1 8200/tcp # TRIVNET

trivnet1 8200/udp # TRIVNET

trivnet2 8201/tcp # TRIVNET

trivnet2 8201/udp # TRIVNET

lm-perfworks 8204/tcp # LM Perfworks

lm-perfworks 8204/udp # LM Perfworks

lm-instmgr 8205/tcp # LM Instmgr

lm-instmgr 8205/udp # LM Instmgr

lm-dta 8206/tcp # LM Dta

lm-dta 8206/udp # LM Dta

lm-sserver 8207/tcp # LM SServer

lm-sserver 8207/udp # LM SServer

lm-webwatcher 8208/tcp # LM Webwatcher

lm-webwatcher 8208/udp # LM Webwatcher

rexecj 8230/tcp # RexecJ Server

rexecj 8230/udp # RexecJ Server

server-find 8351/tcp # Server Find

server-find 8351/udp # Server Find

cruise-enum 8376/tcp # Cruise ENUM

cruise-enum 8376/udp # Cruise ENUM

cruise-swroute 8377/tcp # Cruise SWROUTE

cruise-swroute 8377/udp # Cruise SWROUTE

cruise-config 8378/tcp # Cruise CONFIG

cruise-config 8378/udp # Cruise CONFIG

cruise-diags 8379/tcp # Cruise DIAGS

cruise-diags 8379/udp # Cruise DIAGS

cruise-update 8380/tcp # Cruise UPDATE

cruise-update 8380/udp # Cruise UPDATE

m2mservices 8383/tcp # M2m Services

m2mservices 8383/udp # M2m Services

cvd 8400/tcp # cvd

cvd 8400/udp # cvd

sabarsd 8401/tcp # sabarsd

sabarsd 8401/udp # sabarsd

abarsd 8402/tcp # abarsd

abarsd 8402/udp # abarsd

espeech 8416/tcp # eSpeech Session Protocol

espeech 8416/udp # eSpeech Session Protocol

espeech-rtp 8417/tcp # eSpeech RTP Protocol

espeech-rtp 8417/udp # eSpeech RTP Protocol

pcsync-https 8443/tcp # PCsync HTTPS

pcsync-https 8443/udp # PCsync HTTPS

pcsync-http 8444/tcp # PCsync HTTP

pcsync-http 8444/udp # PCsync HTTP

npmp 8450/tcp # npmp

npmp 8450/udp # npmp

vp2p 8473/tcp # Virtual Point to Point

vp2p 8473/udp # Virtual Point to Point

noteshare 8474/tcp # AquaMinds NoteShare

noteshare 8474/udp # AquaMinds NoteShare

fde 8500/tcp # Flight Data Exchange

fde 8500/udp # Flight Data Exchange

rtsp-alt 8554/tcp # RTSP Alternate (see port 554)

rtsp-alt 8554/udp # RTSP Alternate (see port 554)

d-fence 8555/tcp # SYMAX D-FENCE

d-fence 8555/udp # SYMAX D-FENCE

emware-admin 8567/tcp # emWare Server Management emware-admin 8567/udp # emWare Server Management asterix 8600/tcp

asterix 8600/udp

canon-bjnp1 8611/tcp

canon-bjnp1 8611/udp

canon-bjnp2 8612/tcp

canon-bjnp2 8612/udp

canon-bjnp3 8613/tcp

canon-bjnp3 8613/udp

canon-bjnp4 8614/tcp

canon-bjnp4 8614/udp

sun-as-jmxrmi 8686/tcp

sun-as-jmxrmi 8686/udp

vnyx 8699/tcp

vnyx 8699/udp

ibus 8733/tcp

ibus 8733/udp

mc-appserver 8763/tcp

mc-appserver 8763/udp

openqueue 8764/tcp

openqueue 8764/udp

ultraseek-http 8765/tcp

ultraseek-http 8765/udp

dpap 8770/tcp

dpap 8770/udp

msgclnt 8786/tcp

msgclnt 8786/udp

msgsrvr 8787/tcp

msgsrvr 8787/udp

sunwebadmin 8800/tcp

sunwebadmin 8800/udp

truecm 8804/tcp

truecm 8804/udp

dxspider 8873/tcp

dxspider 8873/udp

cddbp-alt 8880/tcp

cddbp-alt 8880/udp

ddi-tcp-1 8888/tcp

ddi-udp-1 8888/udp

ddi-tcp-2 8889/tcp

ddi-udp-2 8889/udp

ddi-tcp-3 8890/tcp

ddi-udp-3 8890/udp # Surveillance Data # Surveillance Data # Canon BJNP Port 1 # Canon BJNP Port 1 # Canon BJNP Port 2 # Canon BJNP Port 2 # Canon BJNP Port 3 # Canon BJNP Port 3 # Canon BJNP Port 4 # Canon BJNP Port 4 # Sun App Server - JMX/RMI # Sun App Server - JMX/RMI # VNYX Primary Port # VNYX Primary Port # iBus # iBus # MC-APPSERVER # MC-APPSERVER # OPENQUEUE # OPENQUEUE # Ultraseek HTTP # Ultraseek HTTP # Digital Photo Access Protocol # Digital Photo Access Protocol # Message Client # Message Client # Message Server # Message Server # Sun Web Server Admin Service # Sun Web Server Admin Service # truecm # truecm # dxspider linking protocol # dxspider linking protocol # CDDBP # CDDBP # NewsEDGE server TCP (TCP 1) # NewsEDGE server UDP (UDP 1) # Desktop Data TCP 1 # NewsEDGE server broadcast # Desktop Data TCP 2 # NewsEDGE client broadcast

ddi-tcp-4 8891/tcp # Desktop Data TCP 3: NESS application ddi-udp-4 8891/udp # Desktop Data UDP 3: NESS application ddi-tcp-5 8892/tcp # Desktop Data TCP 4: FARM product

ddi-udp-5 8892/udp # Desktop Data UDP 4: FARM product

ddi-tcp-6 8893/tcp # Desktop Data TCP 5: NewsEDGE/Web application ddi-udp-6 8893/udp # Desktop Data UDP 5: NewsEDGE/Web application ddi-tcp-7 8894/tcp # Desktop Data TCP 6: COAL application ddi-udp-7 8894/udp # Desktop Data UDP 6: COAL application jmb-cds1 8900/tcp # JMB-CDS 1

jmb-cds1 8900/udp # JMB-CDS 1

jmb-cds2 8901/tcp # JMB-CDS 2

jmb-cds2 8901/udp # JMB-CDS 2

manyone-http 8910/tcp # manyone-http

manyone-http 8910/udp # manyone-http

manyone-xml 8911/tcp # manyone-xml

manyone-xml 8911/udp # manyone-xml

wcbackup 8912/tcp # Windows Client Backup

wcbackup 8912/udp # Windows Client Backup

dragonfly 8913/tcp # Dragonfly System Service

dragonfly 8913/udp # Dragonfly System Service

cumulus-admin 8954/tcp # Cumulus Admin Port

cumulus-admin 8954/udp # Cumulus Admin Port

sunwebadmins 8989/tcp # Sun Web Server SSL Admin Service sunwebadmins 8989/udp # Sun Web Server SSL Admin Service bctp 8999/tcp # Brodos Crypto Trade Protocol

bctp 8999/udp # Brodos Crypto Trade Protocol

cslistener 9000/tcp # CSlistener

cslistener 9000/udp # CSlistener

etlservicemgr 9001/tcp # ETL Service Manager

etlservicemgr 9001/udp # ETL Service Manager

dynamid 9002/tcp # DynamID authentication

dynamid 9002/udp # DynamID authentication

pichat 9009/tcp # Pichat Server

pichat 9009/udp # Pichat Server

tambora 9020/tcp # TAMBORA

tambora 9020/udp # TAMBORA

panagolin-ident 9021/tcp # Pangolin Identification

panagolin-ident 9021/udp # Pangolin Identification

paragent 9022/tcp # PrivateArk Remote Agent

paragent 9022/udp # PrivateArk Remote Agent

swa-1 9023/tcp # Secure Web Access - 1

swa-1 9023/udp # Secure Web Access - 1

swa-2 9024/tcp # Secure Web Access - 2

swa-2 9024/udp # Secure Web Access - 2