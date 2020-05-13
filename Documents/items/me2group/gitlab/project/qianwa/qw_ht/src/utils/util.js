const publicFn = {
	/*
	* 时间戳转时间格式 不传返回当前时间
	*/
	dateFormat(num){
        if(!num){
            return this.dateFormat(new Date().getTime()/1000)
        }
		var num = parseInt(num);
		var Object = new Date(num);
		var Year = String(Object.getFullYear());
		var Month = String(Object.getMonth() + 1);
		if(Month.length < 2) Month = '0' + Month;
		var Day = String(Object.getDate());
		if(Day.length < 2) Day = '0' + Day;
		var Hour = String(Object.getHours());
		if(Hour.length < 2) Hour = '0' + Hour;
		var Minute = String(Object.getMinutes());
		if(Minute.length < 2) Minute = '0' + Minute;
		var Second = String(Object.getSeconds());
		if(Second.length < 2) Second = '0' + Second;
		return(Year + '-' + Month + '-' + Day + ' ' + Hour + ':' + Minute + ':' + Second);
		// return(Year + '-' + Month + '-' + Day + ' ' + Hour + ':' + Minute);
	},
    /**
     * 时间戳转时间格式
     * 年月日
     */
    dateYMD(num){
        if(!num){
            return this.dateFormat(new Date().getTime()/1000)
        }
        var num = parseInt(num);
        var Object = new Date(num);
        var Year = String(Object.getFullYear());
        var Month = String(Object.getMonth() + 1);
        if(Month.length < 2) Month = '0' + Month;
        var Day = String(Object.getDate());
        if(Day.length < 2) Day = '0' + Day;
        var Hour = String(Object.getHours());
        if(Hour.length < 2) Hour = '0' + Hour;
        var Minute = String(Object.getMinutes());
        if(Minute.length < 2) Minute = '0' + Minute;
        var Second = String(Object.getSeconds());
        if(Second.length < 2) Second = '0' + Second;
        return(Year + '-' + Month + '-' + Day);
    },
	/**
	 * 时间转时间戳 不传返回当前时间戳
	 */
	Time2Timestamps(Number){
		if(Number == undefined){
			return new Date().getTime();
		}
		return new Date(Date.parse(Number.replace(/-/g, '/'))).getTime();
	},
	/**
	 * 获取 localStorage 里的参数
	 */
	getStore(key){
		var value = localStorage.getItem(key);
        if (value) {
            // try {
				var value_json = JSON.parse(value);
				return value_json;
                if (typeof value_json === 'object') {
                    return value_json;
                } else if (typeof value_json === 'number') {
                    return value_json;
                }
            // } catch(e) {
            //     return value;
            // }
        } else {
            return false;
        }
	},
	/**
	 * 设置 localStorage 里的参数
	 */
	setStore(key, value){
		localStorage.setItem(key, JSON.stringify(value));
	},
	/**
	 * 删除 localStorage 里的参数
	 */
	removeStore: function(key) {
        localStorage.removeItem(key);
	},
	/**
	 * 获取 sessionStorage 里的参数
	 */
	getSession(key){
		var value = sessionStorage.getItem(key);
        if (value) {
            try {
                var value_json = JSON.parse(value);
                if (typeof value_json === 'object') {
                    return value_json;
                } else if (typeof value_json === 'number') {
                    return value_json;
                }
            } catch(e) {
                return value;
            }
        } else {
            return false;
        }
	},
	/**
	 * 设置 sessionStorage 里的参数
	 */
	setSession(key,value){
		sessionStorage.setItem(key, JSON.stringify(value));
	},
	/**
	 * 删除 sessionStorage 里的参数
	 */
	removeSession: function(key) {
        sessionStorage.removeItem(key);
	},
	/***
	 * 获取cookie
	 */
	getCookie(name) {
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)){
			return unescape(arr[2]);
		}else{
			return null;
		}
	},
	/***
	 * 设置cookie
	 */
	setCookie(name,value) {
		var days = 1;
		var exp = new Date();
		exp.setTime(exp.getTime() + days*24*60*60*1000);
		document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
	},
	/***
	 * 删除cookie
	 */
	removeCookie(name) {
		var cval=this.readCookie(name);
		if(cval!=null){
			document.cookie= name + "=;path=/;expires="+(new Date(0)).toGMTString();
		}
	},
	/*超出长度...显示
	* test:文本内容
	* len:长度
	*/
	overFlowTest(test,len){
		if(test.length > len){
			return test.substring(0,len)+'...'
		}else{
			return test
		}
	},
	/**
	 * 获取地址栏参数
	 */
	getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if(r != null) return decodeURI(r[2]);
		return null; //返回参数值
	},
	/**
	 * 倒计时获取剩余多少时间
	 */
	dateCount(number){
		// 获取现在的时间
		var date = Date.parse(new Date());
		console.log(date,number,3123123)
		// 计算时会发生隐式转换，调用valueOf()方法，转化成时间戳的形式
		var days = (number - date)/1000/3600/24;
		// 下面都是简单的数学计算
		var day = Math.floor(days);
		var hours = (days - day)*24;
		var hour = Math.floor(hours);
		var minutes = (hours - hour)*60;
		var minute = Math.floor(minutes);
		var seconds = (minutes - minute)*60;
		var second = Math.floor(seconds);
		var back = day+'天'+hour+'小时'+minute+'分'+second+'秒';
		return back;
	},
	/***
	 * 冒泡排序 arr 数据 pargams参数，更具pargams排序
	 */
	bubbleSort(arr,pargams){
		for(var i=0;i<arr.length-1;i++){
			for(var j=i+1;j<arr.length;j++){
				if(arr[i][pargams] > arr[j][pargams]){//如果前面的数据比后面的大就交换
					var temp=arr[i];
					arr[i]=arr[j];
					arr[j]=temp;
				}
			}
		}
		return arr;
	},
	/**
	 * 验证手机号
	 */
	isPoneAvailable($poneInput) {
		var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
		if (!myreg.test($poneInput)) {
			return false;
		} else {
			return true;
		}
	},
	/**
	 * 验证邮箱
	*/
	isEmail(email){
		var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
	　　var obj = document.getElementById("mazey"); //要验证的对象
	　　if(!reg.test(email)){ //正则验证不通过，格式不对
	　　　　return false;
	　　}else{
	　　　　return true;
	　　}
	},
	/**
	 * 验证身份证
	 */
	IdentityCodeValid(code) {
		var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
		var tip = "";
		var pass= true;

		if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
			tip = "身份证号格式错误";
			pass = false;
		}

	   else if(!city[code.substr(0,2)]){
			tip = "地址编码错误";
			pass = false;
		}
		else{
			//18位身份证需要验证最后一位校验位
			if(code.length == 18){
				code = code.split('');
				//∑(ai×Wi)(mod 11)
				//加权因子
				var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
				//校验位
				var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
				var sum = 0;
				var ai = 0;
				var wi = 0;
				for (var i = 0; i < 17; i++)
				{
					ai = code[i];
					wi = factor[i];
					sum += ai * wi;
				}
				var last = parity[sum % 11];
				if(parity[sum % 11] != code[17]){
					tip = "校验位错误";
					pass =false;
				}
			}
		}
		return pass;
	},
	/**
	 * 根据身份证号获取参数 num： 1表示获取获取出生日期 2//获取性别 3//获取年龄
	*/
	IdCard(UUserCard, num) {
		if (num == 1) {
			//获取出生日期
			birth = UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
			return birth;
		}
		if (num == 2) {
			//获取性别
			if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
				//男
				return 1;
			} else {
				//女
				return 2;
			}
		}
		if (num == 3) {
			//获取年龄
			var myDate = new Date();
			var month = myDate.getMonth() + 1;
			var day = myDate.getDate();
			var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
			if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
				age++;
			}
			return age;
		}
	},
	/**
	 * 更具身份证号，计算当前年龄
	 */
	getNowAge(idCard){
		return new Date().getFullYear() - parseInt(idCard.substring(6,10))
	},
	/**
	 * 价格正则  https://blog.csdn.net/alice9969/article/details/78280801 多种正则
	 *  onkeyup="clearNoNum(this)" onblur="clearNoNum(this)"  在行内写，vue中不适合
		clearNoNum(obj) {
			//先把非数字的都替换掉，除了数字和.
			obj.value = obj.value.replace(/[^\d.]/g, "");
			//保证只有出现一个.而没有多个.
			obj.value = obj.value.replace(/\.{2,}/g, ".");
			//必须保证第一个为数字而不是.
			obj.value = obj.value.replace(/^\./g, "");
			//保证.只出现一次，而不能出现两次以上
			obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
			//只能输入两个小数
			obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
		},
	 * */
	clearNoNum(value) {//适合在vue中watch使用
		value = value.toString();
		if(!value){
			return value
		}
		// if(val == '') return -1
		//适合在vue中watch使用
		value = value.replace(/[^\d.]/g, "");
		//保证只有出现一个.而没有多个.
		value = value.replace(/\.{2,}/g, ".");
		//必须保证第一个为数字而不是.
		value = value.replace(/^\./g, "");
		//保证.只出现一次，而不能出现两次以上
		value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
		//只能输入两个小数
		value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
		return value
	},
	/**
	 * 只允许输入数字
	 * $(document).on("keyup", "input[num=1]", function () {
		this.value = this.value.replace(/[^\d]/g, '')
    	});
	*/
	onlyNumber(val){
		if(!val){
			return
		}
		val = val.toString()
		return val.replace(/[^\d]/g, '')
	},
	/**
	 * 更具身份证号，计算当前年龄
	 */
	getNowAge(idCard){
		return new Date().getFullYear() - parseInt(idCard.substring(6,10))
	},


	/**
	 * 验证手机号 有问题暂时
	 */
	isvalidatemobile(phone) {
		return
		let list = [];
		let result = true;
		let msg = '';
		var isPhone = /^0\d{2,3}-?\d{7,8}$/;
		//增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
		var isMob = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[012356789][0-9]{8}|14[57][0-9]{8}|17[3678][0-9]{8})$/;
		if (!validatenull(phone)) {
			if (phone.length == 11) {
				if (isPhone.test(phone)) {
					msg = '手机号码格式不正确';
				} else {
					result = false;
				}
			} else {
				msg = '手机号码长度不为11位';
			}
		} else {
			msg = '手机号码不能为空';
		}
		list.push(result);
		list.push(msg);
		return list;
	},
	/**\
	 * //将base64转换为文件
	 * */
	dataURLtoFile(dataurl) {
		var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		var filename =  new Date().getTime();
		if(mime == 'image/jpeg'){
			filename += '.jpg';
		}else if(mime == 'image/png'){
			filename += '.png';
		}
		return new File([u8arr], filename, {type:mime});
	},
	/**
	 *
	 * 深度拷贝
	 * */
	deepClone(obj){
		let objClone = Array.isArray(obj)?[]:{};
		if(obj && typeof obj==="object"){
			for(var key in obj){
				if(obj.hasOwnProperty(key)){
					//判断ojb子元素是否为对象，如果是，递归复制
					if(obj[key]&&typeof obj[key] ==="object"){
						objClone[key] = this.deepClone(obj[key]);
					}else{
						//如果不是，简单复制
						objClone[key] = obj[key];
					}
				}
			}
		}
		return objClone;
	},
	/**
	 * 数组去重
	*/
	arrDeduplication(arr,garms){
		var temp = [];
		var index = [];
		var l = arr.length;
		for(var i = 0; i < l; i++) {
			for(var j = i + 1; j < l; j++){
				if (arr[i][garms] === arr[j][garms]){
					i++;
					j = i;
				}
			}
			temp.push(arr[i]);
		}
		return temp;
	}
}

export {
    publicFn
}

