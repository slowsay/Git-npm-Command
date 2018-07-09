
> pm2 restart 项目名

//检测
> pm2 monit


---------------------------------------授权被拒绝
Error while launching application Error: EACCES: permission denied

>sudo chmod 755 目录
>sudo chown -R slowsay 目录


---------------------------------------出现服务器接口不能调用
var app=express();
app.listen(8585,'127.0.0.1',funtion(){
	console.log('connect ok')
})
1.查看netstat -lnp 外网地址是否是0.0.0.0 *
2.外网地址全是0，则去掉127.0.0.1


如果用的是阿里云那接口不能调用 ，也可能是端口没添加，加一下就好了
---------------------------------------



### pm2 配置文件

>pm2 startOrRestart config.json

//config.json
```
 {
    /**
    * Application configuration section
    * http://pm2.keymetrics.io/docs/usage/application-declaration/
    * 多个服务，依次放到apps对应的数组里
    */
    apps : [
    // First application
        {
            name      : "nova",
            max_memory_restart: "300M",
            script    : "/root/nova/app.js",
            out_file : "/logs/nova_out.log",
            error_file : "/logs/nova_error.log",
            instances  : 4,
            exec_mode  : "cluster",
            env: {
                NODE_ENV: "production"
            }
        }
    ]
 }
```

### 发布到服务器

//econfig.json
```
{
  "apps" : [{
    "name"      : "student",
    "script"    : "app.js",
    "env": {
      "COMMON_VARIABLE": "true"
    },
    "env_production" : {
      "NODE_ENV": "production"
    }
  }],
  "deploy" : {
    "production" : {
      "user" : "gongjie",
      "host" : ["119.29.32.25"],
      "port" :22,
      "ref"  : "origin/master",
      "repo" : "https://github.com/15011464244/fuwuqi.git",
      "path" : "/home/gongjie",
      "ssh_options": "StrictHostKeyChecking=no",
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
}
```

- 是在服务器上创建相应的文件，如上面的path:/home/gongjie 然后将这个的文件的所属用户赋给 gongjie 然后给所属组赋给gongjie，这样gongjie这个用户就可以操作path里的文件了，命令是chown gongjie /home/gongjie(把home目录下的gongjie目录的拥有者改为gongjie用户) chgrp gongjie /home/gongjie 这是更改所属组的

- 在服务器终端上运行 ssh-keygen -t rsa -C “username” (注：username为你git上的用户名15011464244) 
然后复制在github里settings里设置，然后测试一下，clone到服务器，是否需要秘密，

>pm2 deploy ecosystem.json production setup




