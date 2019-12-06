# Docker
> 虚拟机

### 架构
>客户端-服务器 c/s架构

容器与镜像 >  对象与类

//安装虚拟环境ubuntu并输出hello world

>docker run ubuntu:15.10 /bin/echo "Hello world"


//进入虚拟机
>docker run -i -t ubuntu:15.10 /bin/bash
	
-t:在新容器内指定一个伪终端或终端。

-i:允许你对容器内的标准输入 (STDIN) 进行交互。	

### 查看进程

>docker ps

### 镜像情况
> docker images

### 镜像备份

>docker commit -m='has update' -a='runoob' f68f817edfbe runoob/ubuntu:v2

-m:提交的描述信息

-a:指定镜像作者

e218edb10161：容器ID

runoob/ubuntu:v2:指定要创建的目标镜像名


###  创建镜像
//先建立Dockerfile文件
> vi Dckerfile

```
FROM    centos:6.7
MAINTAINER      slowsay "slowsay@icloud.com"

RUN     /bin/echo 'root:123456' |chpasswd
RUN     useradd jack
RUN     /bin/echo 'jack:123456' |chpasswd
RUN     /bin/echo -e "LANG=\"en_US.UTF-8\"" >/etc/default/local
EXPOSE  22
EXPOSE  80
CMD     /usr/sbin/sshd -D
```


### 查看窗口信息

>docker inspect 容器ID


### 删除容器
>docker rm 容器id

### 停止容器
>docker stop 容器id

### 删除镜像
> docker rmi 镜像id




docker run -it -p 40400:40400 -u root -dit --network fthis --name node.test  -v /tmp/bonds.txt:/var/lib/rnode/validators/bonds.txt -v /tmp/2:/var/lib/rnode rchain/rnode:latest run --validator-private-key 07079abafe8e84ce1c6de0ad7199f9e8d09d40c22b5821dde854f58c15145f9b -b rnode://e794817f871b68c344c823e2b2934686647b1c06@172.23.0.2:30304








