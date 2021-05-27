import { VirtualTimeScheduler } from 'rxjs';
import Vue from 'vue';
import {mapActions} from 'vuex';
import { checkIsYour } from './actions';

export const SET_IMAGES = (state, images) => {
  state.images = images;
};

export const SET_IMAGES_FOLLOWING = (state, imagesOfFollowing) =>{
  state.imagesOfFollowing = imagesOfFollowing;
}

export const SET_UNKNOWNPEOPLE = (state, unknownPeople) =>{
  state.unknownPeople = unknownPeople;
}

export const SET_IMAGES_ALL = (state, allImages) =>{
  state.allImages = allImages;
}
export const SET_IMAGE = (state, image) => {
  state.image = image;
};

export const SET_IMAGES_ALL_EXCLUSIVE = (state, allImagesExclusive) =>{
  state.allImagesExclusive = allImagesExclusive
}

export const SET_TRANSACTIONS = (state, transactions) => {
  state.transactions = transactions;
};

export const SET_FOLLOWINGUSERS = (state, followingUsers) => {
  state.followingUsers = followingUsers;
};

export const SET_FOLLOWINGSTRANGERS = (state, followingStranger) =>{
  state.followingStranger = followingStranger;
}

export const SET_STRANGER = (state, stranger) => {
  state.stranger = stranger;
  window.localStorage.setItem('stranger', JSON.stringify(state.stranger));
};

export const DOWNLOAD_IMAGE = (state, downloadURL) => {
  state.downloadURL = downloadURL;
  window.open(downloadURL);
};

export const ADD_TO_CART = (state, {image}) => {
  if (image.typeId === 1) {
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
      state.cart.push({image});
      // alert('Add to cart successfully');
      Vue.$toast.success('Add to cart successfully', {
        // override the global option
        position: 'bottom-right'
      })
 
    } else {
      // alert('You already have this item in your cart!');
      Vue.$toast.error('You already have this item in your cart!', {
        // override the global option
        position: 'bottom-right'
      })
    }
    window.localStorage.setItem('cart', JSON.stringify(state.cart));
  } else {
    if (state.ucart.length === 1) {
      Vue.$toast.warning('You can only add a single exclusive photo to the cart!', {
        // override the global option
        position: 'bottom-right'
      })
    } else {
      state.ucart.push({image});
      // alert('Add to cart successfully');
      Vue.$toast.success('Add to cart successfully', {
        // override the global option
        position: 'bottom-right'
      })
    }

    window.localStorage.setItem('ucart', JSON.stringify(state.ucart));
  }
};

export const SET_HISTORY = (state, history) => {
  state.history = history;
};

export const SET_IMAGES_USER_NON_EXCLUSIVE = (state, user_non_exlusive_images) =>{
  state.user_non_exlusive_images = user_non_exlusive_images;
}

export const SET_IMAGES_USER_EXCLUSIVE = (state, user_exlusive_images) =>{
  state.user_exlusive_images = user_exlusive_images;
}

export const SET_NOTIFICATIONS = (state, notifications) =>{
  state.notifications = notifications;
}

export const SET_IMAGES_EXCLUSIVE_PROPERTY = (state, user_exlusive_property) =>{
  state.user_exlusive_property = user_exlusive_property;
}

export const GET_HISTORY_DETAIL = (state, transaction_detail) => {
  state.transaction_detail = transaction_detail;
};

export const REMOVE_ITEM = (state, {image}) => {
  if (state.cartFlag === true) {
    var indexItem = state.cart.findIndex((x) => x.image === image);
    ('index: ' + indexItem);
    state.cart.splice(indexItem, 1);
    window.localStorage.setItem('cart', JSON.stringify(state.cart));
    if (state.cart.length == 0) {
      window.localStorage.removeItem('cart');
    }
  } else {
    state.ucart.splice(0, 1);
    window.localStorage.setItem('ucart', JSON.stringify(state.ucart));
    if (state.ucart.length == 0) {
      window.localStorage.removeItem('ucart');
    }
  }
};

export const auth_request = (state) => {
  state.status = 'loading';
};

export const CHECK_IS_FOLLOWED = (state, checkIsFollowed) =>{
  state.checkIsFollowed = checkIsFollowed;
}

export const SET_IMAGES_STRANGER_EXCLUSIVE = (state, stranger_exlusive_images) =>{
  state.stranger_exlusive_images = stranger_exlusive_images;
}
export const SET_IMAGES_STRANGER_NON_EXCLUSIVE = (state, stranger_non_exlusive_images) =>{
  state.stranger_non_exlusive_images = stranger_non_exlusive_images;
}

export const CHECK_IS_BOUGHT = (state, checkIsBought) =>{
  state.checkIsBought = checkIsBought;

}

export const CHECK_IS_YOUR = (state , checkIsYour) =>{
  state.checkIsYour = checkIsYour;
}

export const auth_success = (state, user) => {
  state.status = 'success';
  state.token = user.token;

  state.user = user;
  
};

export const auth_error = (state) => {
  state.status = 'error';
};

export const logout = (state) => {
  state.status = '';
  state.token = '';
  state.user = '';
};

export const GET_APPROVED_IMAGE = (state, approved_images) => {
  state.approved_images = approved_images;
};

export const GET_APPROVED_IMAGE_STRANGER = (
  state,
  approved_images_stranger
) => {
  state.approved_images_stranger = approved_images_stranger;
};

export const GET_DENIED_IMAGE = (state, denied_images) => {
  state.denied_images = denied_images;
};

export const GET_PENDING_IMAGE = (state, pending_images) =>{
  state.pending_images = pending_images;
}
