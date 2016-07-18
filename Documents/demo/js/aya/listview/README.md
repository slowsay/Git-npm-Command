# react-native-listview

> listview是react native中上拉翻页插件

## install
npm install --save react-native-listview


[![NPM](https://nodei.co/npm/react-native-listview.png)](https://nodei.co/npm/react-native-listview/)

## example
```
'use sturct';
import React,{Component} from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import Listv from 'react-native-listview';
/**
 *@decsription 组件
 */
import Util from './../core/utils';


export default class extends Component {
    render() {
     const {navigator}=this.props;
        return (<View style={styles.container}>
            <Listv pagesize={5}
                   component={NewsContent}
                   navigator={navigator}
                   url='http://o9ji2nqbn.bkt.clouddn.com/news.json'/>
        </View>);
    }
}
const styles = StyleSheet.create({
    container: {
        width: Util.size.width, height: Util.size.height - 50,
        backgroundColor: '#eee'
    }
    })
```

## API

###pagesize

每页条数

###navigator

组件导航继承,没有这个无法进入子页面操作,会报bug

###url

数据源地址,可以异步,里面封装fetch


## version
v0.0.1 init update
