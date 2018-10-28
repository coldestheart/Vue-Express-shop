import Vue from 'vue'
import Vuex from 'vuex'
import {productGetters, manufacturerGetters, authGetters} from './components'
import {productMutations, cartMutations, manufacturerMutations, authMutations} from './states'
import {productActions, manufacturerActions, authActions} from './actions'

Vue.use(Vuex)

// Получаем Данные
export default new Vuex.Store({
  strict: true,
  state: {
    cart: [],
    showLoader: true,
    product: {},
    products: [],
    manufacturers: [],
    token: localStorage.getItem('token') || '',
    role: localStorage.getItem('role') || ''
  },
  mutations: Object.assign({}, productMutations, cartMutations, manufacturerMutations, authMutations),
  getters: Object.assign({}, productGetters, manufacturerGetters, authGetters),
  actions: Object.assign({}, productActions, manufacturerActions, authActions)
})
