import { mapActions } from "vuex";

export const SET_IMAGES = (state, images) => {
  state.images = images;
};

export const SET_IMAGE = (state, image) => {
  state.image = image;
};

export const ADD_TO_CART = (state, { image }) => {
  state.cart.push({ image });
  window.localStorage.setItem("cart", JSON.stringify(state.cart));
};

export const REMOVE_ITEM = (state, image) => {
    let item = state.cart.indexOf(image);
    state.cart.splice(item, 1);
    window.localStorage.setItem("cart", JSON.stringify(state.cart));
    if(state.cart.length == 0){
      window.localStorage.removeItem('cart');
    }
}

export const auth_request = (state) =>{
  state.status = 'loading'
}

export const auth_success = (state, token, user) =>{
  state.status = 'success'
  state.token = token
  state.user = user
}

export const auth_error = (state) =>{
  state.status = 'error'
}

export const logout = (state) => {
  state.status = ''
  state.token = ''
};
