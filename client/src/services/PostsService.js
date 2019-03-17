import Api from '@/services/Api'

export default {
  fetchPosts () {
    return Api().get('posts')
  },

  addPost (params) {
    return Api().post('posts', params)
  },

  updatePost (params) {
    return Api().patch('posts/' + params.id, params)
  },

  getPost (params) {
    return Api().get('posts/' + params.id)
  },

  deletePost (id) {
    return Api().delete('posts/' + id)
  }
}
