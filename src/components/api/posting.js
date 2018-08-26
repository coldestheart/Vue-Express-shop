import Api from '@/components/api/api'

export default {
  fetchPosts () {
    return Api().get('/api/products/')
  },
  addPost (params) {
    return Api().post('/api/products/', params)
  },
  updatePost (params) {
    return Api().put('/api/products/' + params.id, params)
  },

  getPost (params) {
    return Api().get('/api/products/' + params.id)
  },

  deletePost (id) {
    return Api().delete('/api/products/' + id)
  }
}
