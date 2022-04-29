import Vue from "vue";
import Vuex from "vuex";
import cart from "./cart";
import snackBar from "./snackBar";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    cart,
    snackBar
  }
});
