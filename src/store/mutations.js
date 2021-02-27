import { mapActions } from "vuex";

export const SET_IMAGES = (state, images) => {
    state.images = images;
};

export const SET_IMAGE = (state, image) => {
    state.image = image;
};

export const ADD_TO_CART = (state, { image }) => {
    var flag = true;
    for (var key in state.cart) {
        if (!state.cart.hasOwnProperty(key)) continue;
        var obj = state.cart[key];
        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) continue;
            var id = obj[prop].photoId;
            if (id === image.photoId) {
                flag = false;
            }
        }
    }
    if (flag) {
        state.cart.push({ image });
        alert("Add to cart successfully");
    } else {
        alert("You already have this item in your cart!");
    }
    window.localStorage.setItem("cart", JSON.stringify(state.cart));
};

export const REMOVE_ITEM = (state, { image }) => {
    var indexItem = state.cart.findIndex(x => x.image === image);
    console.log("index: " + indexItem);
    state.cart.splice(indexItem, 1);
    window.localStorage.setItem("cart", JSON.stringify(state.cart));
    if (state.cart.length == 0) {
        window.localStorage.removeItem('cart');
    }
}

export const auth_request = (state) => {
    state.status = 'loading'
}

export const auth_success = (state, user) => {
    state.status = 'success'
    state.token = user.token
    console.log('in user trong mutation')
    state.user = user
    console.log(user)
}

export const auth_error = (state) => {
    state.status = 'error'
}

export const logout = (state) => {
    state.status = ''
    state.token = ''
    state.user = ''
};

export const GET_APPROVED_IMAGE = (state, approved_images) => {
    state.approved_images = approved_images
}

export const GET_DENIED_IMAGE = (state, denied_images) => {
    state.denied_images = denied_images
}