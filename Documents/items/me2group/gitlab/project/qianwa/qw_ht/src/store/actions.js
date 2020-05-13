
const actions = {
    saveSyetemInfo({commit}, res){
        commit(windowWidth, res)
    },
    saveDynamicPhotos({commit}, arr){
        commit(dynamicPhotos, arr)
    },
    saveOpenId({commit}, res){
        commit(openId, res)
    },
    saveBrand({commit}, res){
        commit(brand, res)
    },
    saveShopid({commit}, res){
        commit(shopid, res)
    }
}
export default actions