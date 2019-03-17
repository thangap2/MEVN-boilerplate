import Api from '@/services/Api'

export default {
 
  login (params) {
	return Api().post('users/auth/', params)
		.then(handleResponse)
		.then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
  },
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
},

  signup (params) {
    return Api().patch('users/', params)
  },

  getUser (params) {
    return Api().get('users/' + params.id)
  },
  handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
}
