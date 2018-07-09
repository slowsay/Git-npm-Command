---------------------------------------------jest

step 1
$mkdir __tests__

step 2
$ touch test.js

step 3 
test.js
```
//检测test文件
jest.unmock('../test');

//调用test文件

describe('test',()=>{
//test todo
	it('test',()=>{
		const _s=require('../test');
		expect(调用方法).toBe(传递自定义值)；
	})
})

```
