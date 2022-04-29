import urls from '../app-js/urls';
import axios from 'axios';
import getAccessToken from '../app-js/methods';
const state = {
  cartItems: [],
};

const getters = {
  getProducts: state => {
    console.log (state);
    return state.cartItems;
  },
};

const actions = {
  async getCartDetails({commit}) {
    const successHandler = res => {
      console.log (res, 'PRODUCTS');
      commit ('SET_CART_ITEMS', res.data.product);
    };
    const errorHandler = err => {
      console.log (err);
    };
    const finallyHandler = err => {
      console.log (err);
    };
    let config = {
      headers: {
        Authorization: `Bearer ${getAccessToken ()}`,
      },
    };
    console.log (config, 'CONFIG');
    try {
      const res = await axios.get (`${urls.CART_DETAILS}`, config);
      successHandler (res);
    } catch (error) {
      errorHandler (error);
    }
  },
  async removeFromCart ({commit}, product_id) {
    console.log (product_id, 'PROD ID');
    const successHandler = res => {
      console.log (res, 'PRODUCTS');
      commit ('REMOVE_ITEM_FROM_CART', product_id);
    };
    const errorHandler = err => {
      console.log (err);
    };
   
    let config = {
      headers: {
        Authorization: `Bearer ${getAccessToken ()}`,
      },
    };
    console.log (config, 'CONFIG');
    let data = {product_id: product_id};
    try {
      const res = await axios.put(`${urls.REMOVE_FROM_CART}`, data, config);
      console.log(res, 'RES FROM REMOVE')
      if(res.status===200){
      successHandler (res)}
    } catch (error) {
      errorHandler (error);
    }
  },

  addToCart ({commit}, payload) {
    console.log (payload, 'PAYLOAD INSIDE cart.js');
    commit ('ADD_ITEM_TO_CART', payload);
  },

  emptyCart({commit}) {
    commit ('EMPTY_CART');
  },
};

const mutations = {
  SET_CART_ITEMS: (state, payload) => {
    state.cartItems = payload;
    console.log (state.cartItems, 'STATE');
  },
  ADD_ITEM_TO_CART: (state, payload) => {
    console.log (payload, 'PAYLOPAD INSIDE MUTATIONS');
    state.cartItems.push (payload);
    console.log (state.cartItems, 'CART ITEM');
  },
  REMOVE_ITEM_FROM_CART: (state, payload) => {
    console.log(payload, 'REOV')
    let item= state.cartItems.findIndex(object => {
      return object.id === payload;
    });
    state.cartItems.splice(item, 1);
  },
  EMPTY_CART (state) {
    state.cartItems = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
