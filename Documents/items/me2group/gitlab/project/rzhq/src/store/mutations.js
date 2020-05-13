
const matations = {
    windowWidth(state, res) {
        state.windowWidth = res.windowWidth
        state.windowHeight = res.windowHeight
    },
    dynamicPhotos(state, arr){
        state.dynamicPhotos = arr
    },
    myAddressList(state, data){//地址列表
        state.myAddressList = data;
    },
    myAddBank(state, data){//银行卡信息
        state.myAddBank = data;
    },
   	myAddressEdit(state, data){//存储地址信息
        state.myAddressEdit = data;
    },
    openId(state, data){
        state.openId = data
    },
    goodsForBuy(state, data){
        state.goodsForBuy = data
    },
    brand(state, data){
        state.brand = data
    },
    shopid(state, data){
        state.shopid = data
    }
}
export default matations