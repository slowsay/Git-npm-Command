
纯linux下安装nginx 

>wget http://nginx.org/download/nginx-0.8.33.tar.gz

>tar -zxvf nginx-0.8.33.tar.gz 

>cd nginx-0.8.33

>./configure --prefix=/usr/local/nginx

>yum -y install pcre-devel openssl openssl-devel

>./configure --prefix=/usr/local/nginx

>make

>make install

### KeepAlive
*能够减少浏览器与服务器建立连接的次数,从而节省建立连接时间

//install
```
>yum install keepalived
>

            主配置文件：/etc/keepalived/keepalived.conf
            主程序文件：/usr/sbin/keepalived
            Unit File：keepalived.service
            Unit File的环境配置文件：/etc/sysconfig/keepalived
            
```
//config
/etc/keepalived/keepalived.conf

//url
[传送门](https://segmentfault.com/a/1190000011078937)


//command
//重启keepalived
>systemctl restart keepalived.service
//状态
>systemctl status keepalived.service




### gzip
* 服务器端压缩功能

//linux用truncate
>sudo truncate -s 1k test.html
//加载运行
>curl -H "Accept-Encoding: gzip" -I http://localhost/test.html

gzip.conf
```
##
# `gzip` Settings
#
#
gzip on;
gzip_disable "msie6";

gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_http_version 1.1;
gzip_min_length 256;
gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/javascript application/vnd.ms-fontobject application/x-font-ttf font/opentype image/svg+xml image/x-icon application/x-httpd-php image/jpeg image/gif image/png;

```

[api传送门](http://blog.lifw.org/post/57102556)

gzip on  启用gzip

gzip_disable "msie6"  排除IE6浏览器上对文件压缩，因为IE6不再支持gzip压缩的.

gzip_vary  和gzip_proxied 是让代理服务器上的浏览器和服务器能正确辨认gzip压缩功能.

gzip_comp_level 6 设置文件压缩的级别，数字越大，压缩越高，一般6是最合适的.

gzip_http_version 1.1 用来限制 gzip 是否支持浏览器HTTP/1.1  协议的 ，一般浏览器不支持的话，gzip很可能就不能支持

gzip_min_length 256  让Nginx对小于256kb的文件不压缩.小的文件一般也不用压缩的.

gzip_types  列出所有的需要压缩的MIME类型文件. 我们配置的就有, HTML 页面, CSS stylesheets, Javascript 和JSON 文件, XML 文件爱你, icons, SVG 镜像, 和web字体.


----------------------------------------------------直播 

pcre =====>先安装Perl库， 解决c语言中的正则  http://www.pcre.org/
下载
>wget https://ftp.pcre.org/pub/pcre/pcre-8.41.tar.gz

配置
>sudo ./configure 						//--prefix=/usr/local

编译
>make 

测试
>make test

安装
>sudo make install 

检查
>ls /usr/local 检查是否有pcre-7.8目录
>ls /usr/local/lib 检查是否有pcre目录
>ls /usr/local/include 检查是否有pcre目录


卸载
>



> nginx -s reload


--------------------------------------------------安装报错
./configure: error: the HTTP rewrite module requires the PCRE library.
解决办法：
>yum -y install pcre-devel



---------------------------------------------------https
入你想创建证书和私钥的目录
> cd /usr/local/nginx/conf

创建服务器私钥，命令会让你输入一个口令：
> openssl genrsa -des3 -out server.key 1024

创建签名请求的证书（CSR）：
> openssl req -new -key server.key -out server.csr

在加载SSL支持的Nginx并使用上述私钥时除去必须的口令：
> cp server.key server.key.org
> openssl rsa -in server.key.org -out server.key
writing RSA key

标记证书使用上述私钥和CSR
> openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
Signature ok
subject=/C=CH/ST=zhejiang/L=zhejiang/O=xx/OU=xx/CN=tao/emailAddress=jack@abcpen.com
Getting Private key



//livedev
server
{
    listen 80;
    server_name livedev-test.abcpen.com;
    location / {
    client_max_body_size    500m;
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:8199;
    }
    access_log /var/log/nginx/livedev.access.log;
}

server
{
    listen 443;

    ssl    on;
    ssl_certificate    /root/pem/abcpen.com.pem;
    ssl_certificate_key    /root/pem/abcpen.com.key;

    server_name livedev-test.abcpen.com;
    location / {
    client_max_body_size    500m;
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:8199;
    }
    access_log /var/log/nginx/livedev.access.log;
}


### ---------------------------------------------------nginx安装
nginx安装目录地址 -c nginx配置文件地址

从容停止
　　1、查看进程号

[root@LinuxServer ~]# ps -ef|grep nginx


　　2、杀死进程

[root@LinuxServer ~]# kill -QUIT 2072


3.重启
>nginx -s reload

4.停止 



> nginx -s stop

5.启动
> nginx 

6.验证是否启动
> nginx -t 

7.杀死进程
> kill -team 2132

8.杀死进程
>pkill -9 nginx

9.查被占用的端口
>lsof -i|grep nginx
>netstat -an | grep 1935 

安装下
>./configure --prefix=/usr/local/nginx

强制覆盖
>sudo cp -rfp objs/nginx /usr/local/nginx/sbin/nginx

创建副本进程
>kill -USR2 进程pid

关闭进程
>


### --------------------------------------------开始Nginx的SSL模块 https服务
>http.conf
server {
            listen 80 default backlog=2048;
            listen 443 ssl;
            server_name wosign.com;
            root /var/www/html;
  
            ssl_certificate /usr/local/Tengine/sslcrt/server.crt;
            ssl_certificate_key /usr/local/Tengine/sslcrt/server.Key;
        }

>nginx -t

//如果没有configure ，那就下载nginx包 
>wget http://nginx.org/download/nginx-1.10.1.tar.gz

//解压
>tar -zxvf nginx-1.10.1.tar.gz
>cd nginx-1.10.1

添加ssl模块，用于https
>./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_modul


出现问题 OpenSSL library is not used
>./configure --prefix=/usr/local/nginx  --with-openssl=/usr/local/openssl --with-http_ssl_module 

如果pcre和zlib出现类似的问题，指定路径就可。
>./configure --prefix=/usr/local/nginx  --with-pcre=/usr/local/pcre-7.7 --with-zlib=/usr/local/zlib-1.2.3 --with-http_stub_status_module

编译
>make

//停止nginx进程
>kill -QUIT pid

//备份
>cp /usr/local/nginx /usr/local/nginx.bak

//强制替换nginx目录 ->如果不停止nginx服务，可以用rfp
>cp -rfp ./objs/nginx /usr/local/nginx/sbin/nginx

>nginx -V


//配置SSL安全证书重启避免输入密码
>sudo openssl rsa -in server.key -out server.key.unsecure

===========nginx.conf======================================
===ssl_certificate  /home/cert/server.crt;             ====
===ssl_certificate_key  /home/cert/server.key.unsecure;====
===========================================================

//客户端打开网站


---------------------------------------------------直播功能Nginx服务端使用了第三方模块
OpenSSL， AccessKey，RTMP模块。
git地址：http://git.abcpen.com/liuwen/live_nginx.git
使用的文件：
Nginx-accesskey-2.0.3.tar.gz 
nginx-1.10.3.tar.gz 
nginx-rtmp-module-master.zip
1.安装SSL模块
sudo yum -y install openssl openssl-devel 
2、安装PCRE模块
sudo yum -y install pcre-devel
3、将三个压缩包解压缩倒/home/cache下（不一定是这个地址）
进入accesskey目录，修改config文件
解压后 修改conf文件，把”$HTTP_ACCESSKEY_MODULE“替换为"ngx_http_accesskey_module",然后编译nginx;
 ./configure --add-module=/home/cache/nginx-accesskey-2.0.3 --add-module=/home/cache/nginx-rtmp-module-master --with-http_ssl_module --with-debug
make
sudo make install
4、修改nginx配置
cp nginx.conf /usr/local/nginx/conf/
5、开放1945和8000端口
6、启动nginx
/usr/local/nginx/sbin/nginx 



---------------------------------------------------Redis与Memcached的区别
　实际mysql是适合进行海量数据存储的，通过Memcached将热点数据加载到cache，加速访问，很多公司都曾经使用过这样的架构，但随着业务数据量的不断增加，和访问量的持续增长，
	1.MySQL需要不断进行拆库拆表，Memcached也需不断跟着扩容，扩容和维护工作占据大量开发时间。
　　2.Memcached与MySQL数据库数据一致性问题。
　　3.Memcached数据命中率低或down机，大量访问直接穿透到DB，MySQL无法支撑。
　　4.跨机房cache同步问题。

 Redis实际更多的是一个disk-backed的功能
1  Redis不仅仅支持简单的k/v类型的数据，同时还提供list，set，zset，hash等数据结构的存储。

2  Redis支持数据的备份，即master-slave模式的数据备份。

3  Redis支持数据的持久化，可以将内存中的数据保持在磁盘中，重启的时候可以再次加载进行使用。
使用Redis特有内存模型前后的情况对比：
VM off: 300k keys, 4096 bytes values: 1.3G used
VM on:  300k keys, 4096 bytes values: 73M used
VM off: 1 million keys, 256 bytes values: 430.12M used
VM on:  1 million keys, 256 bytes values: 160.09M used
VM on:  1 million keys, values as large as you want, still: 160.09M used


-----------------------------------------------nginx配置信息80端口
```
# For more information on configuration, see:
#  * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/
```

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;
        root         /usr/share/nginx/html/home_website;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }

# Settings for a TLS enabled server.
#
#    server {
#        listen       443 ssl http2 default_server;
#        listen       [::]:443 ssl http2 default_server;
#        server_name  _;
#        root         /usr/share/nginx/html;
#
#        ssl_certificate "/etc/pki/nginx/server.crt";
#        ssl_certificate_key "/etc/pki/nginx/private/server.key";
#        ssl_session_cache shared:SSL:1m;
#        ssl_session_timeout  10m;
#        ssl_ciphers HIGH:!aNULL:!MD5;
#        ssl_prefer_server_ciphers on;
#
#        # Load configuration files for the default server block.
#        include /etc/nginx/default.d/*.conf;
#
#        location / {
#        }
#
#        error_page 404 /404.html;
#            location = /40x.html {
#        }
#
#        error_page 500 502 503 504 /50x.html;
#            location = /50x.html {
#        }
#    }

}


### Nginx负载均衡与高可用的实现
* 依赖ngx_http_upstream_module模块
* 所支持的代理方式有：
* proxy_pass
* fastcgi_pass
* memcached_pass。

>IP HASH负载均衡

upstream linuxidc {
    ip_hash;        #采用IP HASH算法
    server 192.168.1.100;
    server 192.168.1.110;
    server 192.168.1.120;
}

>加权负载均衡
http {      
    upstream  linuxidc{        
        server 192.168.1.100 weight=3;        #指定后端服务器地址，权重为3
        server 192.168.1.110;      
    }

    server {
        listen 80;
        server name www.linuxidc.com;
        location / {
            proxy_pass http://linuxidc;        
        }
    }
}


>backup标签
* 实现高可用，当主服务挂掉后，backup服务器会自动接管服务，当主服务恢复后，backup也会自动放弃服务
http {      
    upstream  linuxidc{        
        server 192.168.1.100 
        server 192.168.1.110 backup;  
    }
    server {
        listen 80;
        server name www.linuxidc.com;
        location / {
            proxy_pass http://linuxidc;        
        }
    }
}

>转发动态页面给Tomcat处理
location ~ \.(jsp|jspx|do)?$ {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://tomcat_server;

http_proxy_module 模块常用参数：

proxy_set_header：让后端服务器能获取到前端用户真实IP，而不只是代理服务器的IP

proxy_set_header Host $host;   当后端服务器配置多个web站点时，该选项可以让服务器识别出具体要访问的是哪个站点，而不会将第一个站点作为默认站点传递给用户

proxy_set_header X-Forwarded-For $remote_addr;    如果后端服务器需要获取用户的真实IP，需要该选项

client_body_buffer_size：客户端请求主体缓冲区大小

proxy_connect_timeout：代理服务器和后端真实服务器握手连接超时时间

proxy_send_timeout：后端服务器回传数据给Nginx的时间，需要在设置的时间范围内发送完所有数据，否则Nginx将断开连接

proxy_read_timeout：代理服务器和后端服务器连接成功后，等待后端服务器响应时间
