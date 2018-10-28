import axios from 'axios'
import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  PRODUCT_BY_ID,
  PRODUCT_BY_ID_SUCCESS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT,
  REMOVE_PRODUCT_SUCCESS,
  ALL_PRODUCTS,
  ALL_PRODUCTS_SUCCESS,
  ALL_MANUFACTURERS,
  ALL_MANUFACTURERS_SUCCESS
} from './mtypes'

const API_DATA = 'http://localhost:8081'

export const productActions = {
  async allProducts ({commit}) {
    commit(ALL_PRODUCTS)
    axios.get(`${API_DATA}/api/products`).then(response => {
      commit(ALL_PRODUCTS_SUCCESS, response.data)
    })
  },
  async productById ({commit}, payload) {
    commit(PRODUCT_BY_ID)
    axios.get(`${API_DATA}/api/products/${payload}`).then(response => {
      console.log(payload, response.data)
      commit(PRODUCT_BY_ID_SUCCESS, response.data)
    })
  },
  async addProduct ({commit}, payload) {
    commit(ADD_PRODUCT)
    axios.post(`${API_DATA}/api/products`, payload).then(response => {
      commit(ADD_PRODUCT_SUCCESS, response.data)
    })
  },
  async updateProduct ({commit}, payload) {
    commit(UPDATE_PRODUCT)
    axios.put(`${API_DATA}/api/products/${payload._id}`, payload).then(response => {
      commit(UPDATE_PRODUCT_SUCCESS, response.data)
    })
  },
  async removeProduct ({commit}, payload) {
    commit(REMOVE_PRODUCT)
    axios.delete(`${API_DATA}/api/products/${payload}`, payload).then(response => {
      console.debug('response', response.data)
      commit(REMOVE_PRODUCT_SUCCESS, response.data)
    })
  }
}

export const manufacturerActions = {
  async allManufacturers ({commit}) {
    commit(ALL_MANUFACTURERS)
    axios.get(`${API_DATA}/api/manufacturers`).then(response => {
      commit(ALL_MANUFACTURERS_SUCCESS, response.data)
    })
  }
}

export const authActions = {
  async login ({commit}, username) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({ url: `${API_DATA}/login`, data: username, method: 'POST' })
        .then(response => {
          const token = response.data.token
          const role = response.data.role
          localStorage.setItem('token', token)
          localStorage.setItem('role', role)
          commit('auth_success', token)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  async logout ({commit}) {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}
