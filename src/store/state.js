let cart = window.localStorage.getItem('cart');

export default{
    images: [],
    image: null,
    cart: cart ? JSON.parse(cart) : [],
    status: '',
    token: localStorage.getItem('token') || '',
    user:  localStorage.getItem('user') || null,
} 



 