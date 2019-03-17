import Api from '@/services/Api'

export default {
  fetch () {
    return Api().get('employees')
  },

  add (params) {
    return Api().post('employees', params)
  },

  update (params) {
    return Api().patch('employees/' + params.id, params)
  },

  get (params) {
    return Api().get('employees/' + params.id)
  },

  delete (id) {
    return Api().delete('employees/' + id)
  }
}
