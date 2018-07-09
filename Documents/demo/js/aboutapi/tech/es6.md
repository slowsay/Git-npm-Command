
-------------------------------------------export default语法 
//文件y.js
function pp(){
	
}
export const str='fuck';
export pp
//引入
import {pp,str} from 'y.js';



//文件w.js
function ww(){
	
}
export default 	ww
//引入
import ww from 'w.js';




-------------------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
let names = ['Alice', 'Emily', 'Kate'];

ReactDOM.render(
  <div>
  {
    names.map(function (name) {
      return <div>Hello, {name}!</div>
    })
  }
  </div>,
  document.getElementById('example')
);



