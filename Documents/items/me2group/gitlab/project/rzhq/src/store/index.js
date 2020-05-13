import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    title: '',
    point: ''
}

const mutations = {
    add(state, val) {
        state.title = val.title
        state.point = val.point
        console.log(1);
    }
}

export default new Vuex.Store({
    state, mutations
})