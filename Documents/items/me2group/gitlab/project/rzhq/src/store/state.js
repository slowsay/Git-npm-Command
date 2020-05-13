import {imgUrl} from '../utils/api'
const state = {
    windowWidth: null,
    windowHeight: null,
    openId: null,//存储openid
    imgUrl: imgUrl,//图片地址
    uploadUrl: 'https://yuelin.tdkj-yun.com/public/index.php/index/upload/uploadIamge',
    dynamicPhotos: [],
    brand: {},//品牌
    myAddressList:[],//我的 地址列表数据
    goodsForBuy:{},//下单商品
    myAddressEdit:{//保存我的地址，修改页需要回显的数据
        Address:'',
        Area:'',
        Id:'',
        Name:'',
        Phone:'',
        Status:1,
        Tag:1
    },
    myAddBank:{//我的银行卡添加 保存数据
        Name:'',
        Number:''
    },
	order_back:{},//退货
	shopid:'',
	Token:'',
	userId:''
}
export default state;