
-----------------------hexo
	
$ npm install -g hexo-cli

$ hexo install

$ hexo init 博客名

	
# hexo new 文章名

主站配置文件 _config.yml
一般就修改几个属性title,subtitle,description,author,theme,language,themes
关键的来了,language,这个配置要到themes/languages里面去看看,有哪些语言文件zh.yml中文版,en.yml英文版,看清了啊
public_dir: 指向要生成所有静态页面 命令会后面提到$ hexo generate
themes: 选择你下载的模板包文件夹名称

模板配置文件 themes/模板名/_config.yml
一般去掉注释# duoshuo_shortname,duoshuo_share,menu,menu_icons,avatar
menu 菜单增加
menu_icons 菜单的图标
avatar 右侧边栏,添加logo,直接加图片路径

配置好后,那就跑起来,
$ hexo server


打包静态文件	
$ hexo generate

部署路由
$ hexo deploy

添加feed
$npm install hexo-generator-feed
添加站点
npm install hexo-generator-sitemap

=======================所有命令集

hexo
npm install hexo -g #安装  
npm update hexo -g #升级  
hexo init #初始化
简写
hexo n "我的博客" == hexo new "我的博客" #新建文章
hexo p == hexo publish
hexo g == hexo generate#生成
hexo s == hexo server #启动服务预览
hexo d == hexo deploy#部署

服务器
hexo server #Hexo 会监视文件变动并自动更新，您无须重启服务器。
hexo server -s #静态模式
hexo server -p 5000 #更改端口
hexo server -i 192.168.1.1 #自定义 IP

hexo clean #清除缓存 网页正常情况下可以忽略此条命令
hexo g #生成静态网页
hexo d #开始部署

监视文件变动
hexo generate #使用 Hexo 生成静态文件快速而且简单
hexo generate --watch #监视文件变动

完成后部署
两个命令的作用是相同的
hexo generate --deploy
hexo deploy --generate
hexo deploy -g
hexo server -g


草稿
hexo publish [layout] <title>

模版
hexo new "postName" #新建文章
hexo new page "pageName" #新建页面
hexo generate #生成静态页面至public目录
hexo server #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
hexo deploy #将.deploy目录部署到GitHub

hexo new [layout] <title>
hexo new photo "My Gallery"
hexo new "Hello World" --lang tw

变量	描述
layout	布局
title	标题
date	文件建立日期
title: 使用Hexo搭建个人博客
layout: post
date: 2014-03-03 19:07:43
comments: true
categories: Blog
tags: [Hexo]
keywords: Hexo, Blog
description: 生命在于折腾，又把博客折腾到Hexo了。给Hexo点赞。
模版（Scaffold）
hexo new photo "My Gallery"

变量	描述
layout	布局
title	标题
date	文件建立日期
设置文章摘要
以上是文章摘要 <!--more--> 以下是余下全文 
写作
hexo new page <title>
hexo new post <title>

变量	描述
:title	标题
:year	建立的年份（4 位数）
:month	建立的月份（2 位数）
:i_month	建立的月份（去掉开头的零）
:day	建立的日期（2 位数）
:i_day	建立的日期（去掉开头的零）
推送到服务器上
hexo n #写文章
hexo g #生成
hexo d #部署 #可与hexo g合并为 hexo d -g

报错
1.找不到git部署
ERROR Deployer not found: git
解决方法

npm install hexo-deployer-git --save

3.部署类型设置git
hexo 3.0 部署类型不再是github，_config.yml 中修改

# Deployment
## Docs: http://hexo.io/docs/deployment.html
deploy:
  type: git
  repository: git@***.github.com:***/***.github.io.git
  branch: master
4. xcodebuild
xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance

npm install bcrypt

5. RSS不显示
安装RSS插件

npm install hexo-generator-feed --save

开启RSS功能

编辑hexo/_config.yml，添加如下代码：

rss: /atom.xml #rss地址  默认即可