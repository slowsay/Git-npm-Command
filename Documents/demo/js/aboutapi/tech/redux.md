
step1
action/index.js
export function getData(data){
	return {
		dataSource:data
	}
}


step2
reducer/index.js
//获取data要从action下面的dataSource
//object.assin()合并对象方法
export default function(state,action){
	
	switch(action.type)
	case types.GETDATA:
		return Object.assin({},state,{data:action.dataSource});
	break;
}


step3
intro.js
actions.getData('ok');
console.log(state.data)

# install 

### $ npm i react react-dom react-router redux react-redux redux-thunk --save