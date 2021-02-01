import axios from "axios";

export const getImages = ({ commit }) => {
  axios
    .get("https://capstonerestapi.azurewebsites.net/api/v1/Photo/random")
    .then((response) => {
      commit("SET_IMAGES", response.data);
    });
};

export const getImage = ({ commit }, photoId) => {
  axios
    .get(`https://capstonerestapi.azurewebsites.net/api/v1/Photo/${photoId}`)
    .then((response) => {
      commit("SET_IMAGE", response.data);
    });
};

export const addPhotoToCart = ({ commit }, { image }) => {
  commit("ADD_TO_CART", { image });
};

export const removeItem = ({commit}, image) => {
  commit("REMOVE_ITEM", image);
};

export const login = ({commit}, user) =>{
  return new Promise((resolve, reject) => {
    commit('auth_request')
    axios({url: 'https://capstonerestapi.azurewebsites.net/api/v1/Auth', data: user, method: 'POST' })
    .then(resp => {
      const token = resp.data.token
      const user = resp.data.user
      window.localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = token
      commit('auth_success', token, user)
      resolve(resp)
    })
    .catch(err => {
      commit('auth_error')
      window.localStorage.removeItem('token')
      reject(err)
    })
  })
};

export const register = ({commit}, user) => {
  return new Promise((resolve, reject) => {
    commit('auth_request')
    axios({url: 'https://capstonerestapi.azurewebsites.net/api/v1/Auth/Register', data: user, method: 'POST' })
    .then(resp => {
      const token = resp.data.token
      const user = resp.data.user
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = token
      commit('auth_success', token, user)
      resolve(resp)
    })
    .catch(err => {
      commit('auth_error', err)
      localStorage.removeItem('token')
      reject(err)
    })
  })
};

export const logout = ({commit}) => {
  return new Promise((resolve, reject) => {
    commit('logout')
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    resolve()
  })
}
