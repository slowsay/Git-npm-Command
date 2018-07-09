1.npm install -g grunt-cli (组件作用是，跨目录执行grunt)
2.当前项目下npm install grunt-contrib-imagemin --save-dev 
3.npm init 初始化package.json文件
4.https://www.npmjs.org/doc/files/package.json.html#keywords
5.配置gruntfile.js所需要的
6.终端输入grunt 或者输入grunt 项目名




-------------------
npm install grunt --save-dev //安装Grunt最新版本到项目目录中，并将其添加到devDependencies(package.json)内





在前端工程中使用css预编译器（less/sass/stylus）用于弥补css的语言缺陷，基本上是标配了，其中less和sass用的最多，但明河最喜欢使用的是stylus，grunt官方有对应的编译插件。

这里以grunt-contrib-stylus为例。

stylus: {
            options: {
                //指定要扫描的目录（针对@import内的路径）
                paths: ['src'],
                //指定将图片路径转成base64数据的函数（比如配置urlfunc:"embedurl"，扫描embedurl(test.png)）
                urlfunc: 'embedurl',
                import: [      //  @import 'foo', 'bar/moo', 每一个.styl文件
                    'foo',
                    'bar/moo'
                ]
            },
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: '*.styl',
                        dest: 'src',
                        ext: '.css'
                    }
                ]
            }
        }

上述任务将src目录下的所有.styl文件编译成.css文件。

less，sass的编译插件用法类似，配置上有差异，sass推荐使用grunt-contrib-compass。

（PS:如果你使用webstrom或idea，其实不需要grunt来处理css的预编译，IDE已经内置处理了。）

如果每次修改完都要运行命令编译次，是非常麻烦的，所以我们还需要个实时监听插件grunt-contrib-watch，后面会讲到。

当然亲也可以使用一些编译工具，比如livereload（livereload非常强大，但win平台的软件很弱）和koala。
coffeescript编译

关于coffeescript的争议非常多，上次明河还听到facebook同学关于coffeescript的批评，在阿里技术论坛里也有过争论，不管如何coffeescript的确很诱人。

coffeescript有带了编译工具，可以满足实时编译需求，就是每次运行很麻烦，结合grunt使用，可以很好的消化coffeescript的编译成本（如果你使用webstrom，可以无视编译，已经自动处理鸟。）

grunt-contrib-coffee用法举例：

coffee: {
            compile: {
                options: {
                    //去掉匿名函数包裹
                    bare:true,
                    //当编译多个.coffee文件成单个.js时，先合并
                    join:true,
                    //编译.coffee文件时生成个.map文件，用于链接到coffee源码文件
                    sourceMap:true
                },
                files:[
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**/*.coffee'],
                        dest: 'src',
                        ext: '.js'
                    }
                ]
            }

        }

实时监听插件

grunt-contrib-watch非常重要，它能监测文件的修改，触发指定任务，比如less、coffee编译等。

先来看个最简单的demo：

        watch: {
            options: {
                spawn: false
            },
            scripts: {
                files: [ '<%= pkg.version %>/**/*.coffee' ],
                tasks: [ 'coffee']
            }
        }

监听源码目录下所有的.coffee文件的修改，触发coffee任务（编译coffee文件）。

spawn配置一般禁掉，设置为true时，运行任务会开启子进程处理，可能会出现不稳定的问题。
files：监听哪些文件的修改
tasks：文件修改后触发哪些任务

coffee: {
            compile: {
                options: {
                    //去掉匿名函数包裹
                    bare:true
                },
                files:[
                    {
                        expand: true,
                        cwd: '<%= pkg.version %>',
                        src: ['**/*.coffee'],
                        dest: '<%= pkg.version %>',
                        ext: '.js'
                    }
                ]
            }

        }

    grunt.registerTask('w',['watch:scripts']);

运行grunt w后，没有报错的情况下，随便修改个coffee文件，会出现类似如下结果：

（PS:registerTask的name不能和task的名称重复，不然会出现死循环，比如这里不能grunt.registerTask(‘watch’]);）

grunt-1

grunt-contrib-watch拥有丰富的配置，一般采用默认配置即可，grunt-contrib-watch可以结合livereload插件使用，可以实现文件发生改变后刷新页面，这个功能很有意思。

grunt.initConfig({
  watch: {
    options: {
      livereload: true,
    },
    css: {
      files: ['public/scss/*.scss'],
      tasks: ['compass'],
    },
  },
});

livereload会开启个服务器，默认端口号为35729。

在页面中引入监控脚本：


或者安装livereload的浏览器插件。
图片压缩工具插件

grunt-contrib-imagemin，能够快速的压缩工程内的图片，非常实用的前端工具，用法非常简单：

       imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/'                
                }]
            }
        }

yuidoc文档生成插件

grunt-contrib-yuidoc：基于YUIDOC生成js API文档

 yuidoc: {
    compile: {
      name: '<%= pkg.name %>',
      description: '<%= pkg.description %>',
      version: '<%= pkg.version %>',
      url: '<%= pkg.homepage %>',
      options: {
        paths: 'path/to/source/code/',
        themedir: 'path/to/custom/theme/',
        outdir: 'where/to/save/docs/'
      }
    }
  }

paths：js源码位置；
themedir：文档模板位置；
outdir：文档输出位置。
karma单测回归插件

grunt-karma：是karma的grunt插件版，webstrom内置karma回归功能。

demo：

karma: {
  unit: {
    configFile: 'karma.conf.js'
  }
}

会寻找karma.conf.j配置文件。
------------------------------------------------
解决grunt-contrib-cssmin压缩默认会删除一些css hack的问题
cssmin: {
    minify: { 
        expand: true, 
        cwd: srcName + '/', 
        src: ['*\*/\*.css', '!*.min.css'], 
        dest: buildPath + '/', 
        ext: '.css' 
    } 
}
运行后发现一些*zoom:1;_zoom:1;\9等一些hack会被删除，后来经群里人提醒，发现grunt-contrib-cssmin是依赖另一个node模块clean-css的，并找到了解决方法。

看介绍，这个模块默认是会合并属性的，同时还忽略了ie8及以下版本的兼容性，好在它同时提供了相应的配置项，我尝试着用在grunt-contrib-cssmin中，放弃了它的这些高级功能，问题得到解决，下面是新的配置代码片段：
cssmin: { 
    options : { 
        compatibility : 'ie8', //设置兼容模式 
        noAdvanced : true //取消高级特性 
    },
    minify: { 
        expand: true, 
        cwd: srcName + '/', src: ['*\*/\*.css', '!*.min.css'], 
        dest: buildPath + '/', 
        ext: '.css' 
    } 
}