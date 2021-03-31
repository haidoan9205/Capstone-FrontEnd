let cart = window.localStorage.getItem('cart');
let ucart = window.localStorage.getItem('ucart');

export default {
    images: [],
    followingUsers: [],
    image: null,
    cart: cart ? JSON.parse(cart) : [],
    ucart: ucart ? JSON.parse(ucart) : [],
    status: '',
    cartFlag: '',
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user') || null,
    approved_images: [],
    denied_images: [],
    transactions: [],
    donwloadURL: '',
}