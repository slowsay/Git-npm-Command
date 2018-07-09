---------------------------------------------jsdoc

step1
npm install -g jsdoc
step2
jsdoc conf.json



---------------------------------------------添加注释变量
@param  @argument 指定参数名和说明来描述一个函数参数 
@returns         描述函数的返回值 
@author          指示代码的作者 
@deprecated    指示一个函数已经废弃，而且在将来的代码版本中将彻底删除。要避免使用这段代码 
@see               创建一个HTML链接，指向指定类的描述 
@version         指定发布版本 
@requires        创建一个HTML链接，指向这个类所需的指定类 
@throws @exception   描述函数可能抛出的异常的类型 
{@link}           创建一个HTML链接，指向指定的类。这与@see很类似，但{@link}能嵌在注释文本中 
@fileoverview   这是一个特殊的标记。如果在文件的第一个文档块中使用这个标记，则指定该文档块的余下部分将用来提供这个文件的概述 
@class            提供类的有关信息，用在构造函数的文档中 
@constructor   明确一个函数是某个类的构造函数 
@type            指定函数的返回类型 
@extends       指示一个类派生了另一个类。JSDoc通常自己就可以检测出这种信息，不过，在某些情况下则必须使用这个标记 
@private         指示一个类或函数是私有的。私有类和函数不会出现在HTML文档中，除非运行JSDoc时提供了--private命令行选项 
@final             指示一个值是常量值。要记住JavaScript无法真正保证一个值是常量 
@ignore         JSDoc忽略有这个标记的函数