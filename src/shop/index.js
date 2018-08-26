import Vue from 'vue'
import Vuex from 'vuex'
import { productGetters, manufacturerGetters } from './components'
import { productMutations, cartMutations, manufacturerMutations } from './states'
import { productActions, manufacturerActions } from './actions'

Vue.use(Vuex)

// Получаем Данные
export default new Vuex.Store({
  strict: true,
  state: {
    cart: [],
    showLoader: false,
    product: {},
    products: [],
    manufacturers: []
  },
  mutations: Object.assign({}, productMutations, cartMutations, manufacturerMutations),
  getters: Object.assign({}, productGetters, manufacturerGetters),
  actions: Object.assign({}, productActions, manufacturerActions)
})
