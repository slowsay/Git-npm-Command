# Karma 
> 自动测试框架

## install 
```
npm install --save karma


//index.js
function isNum(num) {

  if (typeof num === 'number') {

    return true

  } else {

    return false

  }

}

exports.isNum = isNum

//test.js

const Util = require('../src/index')

describe('index.js: ', () => {

  it('isNum() should work fine.', () => {

    expect(Util.isNum(1)).toBe(true)

    expect(Util.isNum('1')).toBe(false)

  })



```

## Command

> karma init

> 

## 问题

* 如果出现Unable to run Coverage with Karma
加入如下组件
> npm install --save-dev karma-coverage
```
plugins: [
            'karma-phantomjs-launcher',
            'karma-requirejs',
            'karma-coverage',
            'karma-jasmine'
        ],
```



