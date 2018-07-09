---------------------------------------------svn服务器搭建
mac上创建svn服务器管理
svnadmin自带svn服务器和客户端

-------------step1
$ svnadmin create svndir

-------------step2
conf > svnserve.conf修改配置

# anon-access = read  
# auth-access = write  
# password-db = passwd  
# authz-db = authz 
去掉这几个前面的#和空格，
anon-access 表示匿名访问权限
anon-access = none代表禁止匿名访问，需要帐号密码才能访问

-------------step3
conf >passwd文件
在[users]后面加zyx=123456，表示创建了zyx帐户，密码是123456.
如:

[users]
# harry = harryssecret
# sally = sallyssecret
xyz=123456


-------------step4
conf >authz文件
passwd用户xyz加到 => jackgroup创建用户组，

如: jackgroup=xyz

-------------step5 
组权限设置
rw读写权限，[/]表示根目录

如：@jackgroup=rw

-------------step6
开启svn服务器
$svnserve -d -r svndir


-------------关闭svn服务器
找到pid
ps -e | grep svnserve

关闭pid
kill 1190
或
killall svnserve


-------------使用svn客户端功能

从本地导入代码到服务器
svn import weibo 

将weibo所有内容,上传到服务器svn仓库weibo目录下,引号中的内容是注释说明
$ svn import weibo svn://localhost/svn/weibo --username=xyz --password=123456 -m "初始化导入"


出现Authorization failed问题：
在conf>authz文件内，加入[/]代表根目录下所有的资源

-------------从服务器端下载代码到客户端本地

svn checkout svn://localhost/svn/weibo --username=xyz --password=123456 /Users/apple/Documents/code

签下，到当前目录 /Users/apple/Documents/code

-------------提交更改过的代码到服务器
添加
svn add 文件/文件夹

更改
svn commit -m "修改了main.m文件"
出现问题时：
The log message is a pathname (was -F intended?); use '--force-log' to override
解决方法：
svn  ci 提交文件 -m "改变新描述"

-------------更新服务器端的代码到客户端
svn update

其他方法
svn help
