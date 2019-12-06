==================linux配置gitlab服务器 ===================

第一步安装或者配置一些必要环境：
>sudo yum install curl openssh-server openssh-clients postfix cronie
>sudo service postfix start
>sudo chkconfig postfix on
>sudo lokkit -s http -s ssh


//下载gitlab包
>curl -sS https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | sudo bash

//安装gitlab
>yum install gitlab-ce

//配置并启动
>gitlab-ctl reconfigure


//修改配置 unicorn['port'] = 8080
>/etc/gitlab/gitlab.rb

//检测网页是否通
>lynx 127.0.0.1:8080



================git出现提交不上去================
> git add ./
> git commit -am "update"
发现有冲突,没有pull到本地，先用了commit解决办法 
> git stash 保存当前修改内容
> git pull  
> git stash pop 回退到保存的版本
> git stash list 会发现保存过的版本不存在，因为已经pop过了
> git push -u origin master

//检测remote
>git remote -v

//当git不到任何分支时可以用checkout -b创建分支
>git checkout -b master

//使用哪个暂存
>git stash apply stash@{0}


//忽略文件大小写
>git config core.ignorecase false

//图形显示分支提交
>git log --graph

=================================git checkout master 切换不过去
解决方法
//新建分支
> git checkout -b temp


//删除commit的提交代码
> git rm commitID
>git checkout master




//恢复某commitID
>git reset --hard commitID

//如果有修改，且没有提交的
> git stash
> git checkout 目标分支

=================================remotes/origin/HEAD -> origin/master

>vim .git/refs/remotes/origin/

没有就创建HEAD文件
ref: refs/remotes/origin/master
=================================

//显示具体信息
>git branch -av 

//撤消commit提交	(意味着会删除当前在git下的修改)
>git log 
>git revert daa884c8f2aecdf30e0385277114a21e50b98abe

回退到merge之前
>git reset --merge

如果还不行
> git fetach
> git merge
> esc :wq
> git push -u orgin master

出现索引错误you need to resolve your current index first
>git reset --merge
>git checkout 获取最新


>git checkout master
>git merge test1.1.0   当前在master分支，把test1.1.0版本修改的，合并到当前master分支


//获取某个分支
>git clone git@github.com:taoring/test


//回退到最近一次commit
>git reset --hard
>git clean -df 删除commit提交的东西

-------------------------------------------------创建密钥
>ssh-keygen -t rsa 


-------------------------------------------------merge时产生head冲突


>git rm 提交过的commit id    //超过两个rm会提示file-name : needs merge，不必理会




------------------------------------------------重链接-查看链接是否正确
>ssh -T git@abcpen.com

//修改config配置路径 
//git@git.abcpen.com/项目名称.git
>vi ./git/config




================gitignore================
跟踪某个文件夹

!/plutommi/mmi

跟踪某类文件

!*.c

!*.h

指定过滤某个文件：
/mtk/do.c

/mtk/if.h



================npmignore================





================ssh================
cd ～/.ssh  //检查是否已经存在ssh

建立ssh
ssh-keygen -t rsa -C xxxxx@gmail.com（注册github时的email）

检测是否连接成功
ssh -t slowsay@gmail.com




================git================

//生成密钥
>ssh-keygen -t rsa 


搜索有s字符的所有文件日志
> git log |grep 's'


当git网络卡住时可以用增大提交缓冲区域
git config --global http.postBuffer 1048576000

撤消push，回退上一步
git reset 
删除大的文件，然后再add ./就可以

git自带hock
git hock

https://git-scm.com/book/zh/ch7-3.html

直接从一个git包下到某个指定文件夹
$ git clone https://github.com/henryhuang/oishi.git themes/oishi


gh-pages获取
---------
git branch -a
git symbolic-ref HEAD refs/heads/gh-pages或者git checkout -b gh-pages
git checkout gh-pages
git rm -rf ./
git remote add origin git@github.com:slowsay/项目名.git
不行，可以用下面方法
git pull origin gh-pages

================git================
 解决：Git could not resolve the host github.com error／Git push 403 error
http://blog.csdn.net/fengzei886/article/details/47727021

$ git remote set-url origin https://<username>@github.com/<username>/<username_repo>.git


git clone https://github.com/slowsay/react-native-listview-git
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/slowsay/react-native-listview.git
git push -u origin master


================git================
远端进行仓库的初始化
git --bare init 

git clone link.git下载东西

step1
git commit -amend -m 修改文件内容提交
step2
git push命令 完成本次提交， 发布到线上


================git================
git config --local -l (in your repo .git/config)

git config --global -l (in your homedir: ~/.gitconfig)
================git================





================git================
touch README.md //新建一个记录提交操作的文档
git init //初始化本地仓库
git add README.md //添加
git commit -m "first commit"//提交到要地仓库，并写一些注释
git remote add origin git@github.com:youname/Test.git //连接远程仓库并建了一个名叫：origin的别名
git push -u origin master //将本地仓库的东西提交到地址是origin的地址，master分支下

================git================
//创建分支
>git branch 新分支名

//创建分支
>git checkout -b 新分支名

//切换到目标分支
>git checkout 目标分支

//合并分支
>git merge 分支名 

1、git checkout the_branch

2、git pull

3、git branch the_branch_backup //备份一下这个分支当前的情况

4、git reset --hard the_commit_id //把the_branch本地回滚到the_commit_id

5、git push origin :the_branch //删除远程 the_branch

6、git push origin the_branch //用回滚后的本地分支重新建立远程分支

7、git push origin :the_branch_backup //如果前面都成功了，删除这个备份分支

8、更改branch路径   git remote set-url origin https://github.com/slowsay/slowsay.github.io

9、git rebase -i 


选择编辑器
> vi ~/.gitconfig
[core]
	editor=emacs  => vim

-----------------------命令集
git init                                                  # 初始化本地git仓库（创建新仓库） 
git config --global user.name "xxx"                       # 配置用户名 
git config --global user.email "xxx@xxx.com"              # 配置邮件 
git config --global color.ui true                         # git status等命令自动着色 
git config --global color.status auto 
git config --global color.diff auto 
git config --global color.branch auto 
git config --global color.interactive auto 
git clone git+ssh://git@192.168.53.168/VT.git             # clone远程仓库 
git status                                                # 查看当前版本状态（是否修改） 
git add xyz                                               # 添加xyz文件至index 
git add .                                                 # 增加当前子目录下所有更改过的文件至index 
git commit -m 'xxx'                                       # 提交 	
git commit --amend -m 'xxx'                               # 合并上一次提交（用于反复修改） 
	git commit -am 'xxx'                                      # 将add和commit合为一步 
git rm xxx                                                # 删除index中的文件 
git rm -r *                                               # 递归删除 
git rm -r ./												#  删除当前文件夹的文件
git log                                                   # 显示提交日志 
git log -1                                                # 显示1行日志 -n为n行 
git log -5
git log --stat                                            # 显示提交日志及相关变动文件 
git log -p -m 
git show dfb02e6e4f2f7b573337763e5c0013802e392818         # 显示某个提交的详细内容 
git show dfb02                                            # 可只用commitid的前几位 
git show HEAD                                             # 显示HEAD提交日志 
git show HEAD^                                            # 显示HEAD的父（上一个版本）的提交日志 ^^为上两个版本 ^5为上5个版本 
git tag          	                                         # 显示已存在的tag 
git tag -a v2.0 -m 'xxx'                                  # 增加v2.0的tag 
git show v2.0                                             # 显示v2.0的日志及详细内容 
git log v2.0                                              # 显示v2.0的日志 
git diff                                                  # 显示所有未添加至index的变更 
git diff --cached                                         # 显示所有已添加index但还未commit的变更 
git diff HEAD^                                            # 比较与上一个版本的差异 
git diff HEAD -- ./lib                                    # 比较与HEAD版本lib目录的差异 
git diff origin/master..master                            # 比较远程分支master上有本地分支master上没有的 
git diff origin/master..master --stat                     # 只显示差异的文件，不显示具体内容 
git remote add origin git+ssh://git@192.168.53.168/VT.git # 增加远程定义（用于push/pull/fetch） 
git clean  -d  -fx ""                                     # 删除文件和目录信息
git clean -x 											  # 删除忽略文件已经对git来说不识别的文件
git clean -d 											  # 删除未被添加到git的路径中的文件
git clean -f 											  # 强制运行
git branch                                                # 显示本地分支 
git branch --contains 50089                               # 显示包含提交50089的分支 
git branch -a                                             # 显示所有分支 
git branch -r                                             # 显示所有原创分支 
git branch --merged                                       # 显示所有已合并到当前分支的分支 
git branch --no-merged                                    # 显示所有未合并到当前分支的分支 
git branch -m master master_copy                          # 本地分支改名 
git checkout -b master_copy                               # 从当前分支创建新分支master_copy并检出 
git checkout -b master master_copy                        # 上面的完整版 
git checkout features/performance                         # 检出已存在的features/performance分支 
git checkout --track hotfixes/BJVEP933                    # 检出远程分支hotfixes/BJVEP933并创建本地跟踪分支 
git checkout v2.0                                         # 检出版本v2.0
git checkout -b devel origin/develop                      # 从远程分支develop创建新本地分支devel并检出 
git checkout -- README                                    # 检出head版本的README文件（可用于修改错误回退） 
git merge origin/master                                   # 合并远程master分支至当前分支 
git cherry-pick ff44785404a8e                             # 合并提交ff44785404a8e的修改 
git push origin master                                    # 将当前分支push到远程master分支 
git push origin :hotfixes/BJVEP933                        # 删除远程仓库的hotfixes/BJVEP933分支 
git push --tags                                           # 把所有tag推送到远程仓库 
git fetch                                                 # 获取所有远程分支（不更新本地分支，另需merge） 
git fetch --prune                                         # 获取所有原创分支并清除服务器上已删掉的分支 
git pull origin master                                    # 获取远程分支master并merge到当前分支 
git mv README README2                                     # 重命名文件README为README2 
git reset --hard HEAD                                     # 将当前版本重置为HEAD（通常用于merge失败回退） 
git rebase 													#  从最开始到某一刻全部都删除或者是中间一截可以删除
git branch -d hotfixes/BJVEP933                           # 删除分支hotfixes/BJVEP933（本分支修改已合并到其他分支） 
git branch -D hotfixes/BJVEP933                           # 强制删除分支hotfixes/BJVEP933 
git ls-files                                              # 列出git index包含的文件 
git show-branch                                           # 图示当前分支历史 
git show-branch --all                                     # 图示所有分支历史 
git whatchanged                                           # 显示提交历史对应的文件修改 
git revert dfb02e6e4f2f7b573337763e5c0013802e392818       # 撤销提交dfb02e6e4f2f7b573337763e5c0013802e392818 
git ls-tree HEAD                                          # 内部命令：显示某个git对象 
git rev-parse v2.0                                        # 内部命令：显示某个ref对于的SHA1 HASH 
git reflog                                                # 显示所有提交，包括孤立节点 
git show HEAD@{5} 
git show master@{yesterday}                               # 显示master分支昨天的状态 
git log --pretty=format:'%h %s' --graph                   # 图示提交日志 
git show HEAD~3
git show -s --pretty=raw 2be7fcb476 
git stash                                                 # 暂存当前修改，将所有至为HEAD状态 
git stash list                                            # 查看所有暂存 
git stash show -p stash@{0}                               # 参考第一次暂存 
git stash apply stash@{0}                                 # 应用第一次暂存 
git stash pop											  # 返回到最后一次暂存，并且移除之前的暂存
git stash clear											  # 清除所有暂存
git grep "delete from"                                    # 文件中搜索文本“delete from” 
git grep -e '#define' --and -e SORT_DIRENT 
git log |grep  's'										  # 多命令使用，显示log日志，以搜索s为字符的内容
git gc                     								  #垃圾回收
git fsck