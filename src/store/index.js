import Vue from 'vue'
import Vuex from 'vuex'
import init from '../modules/init';
import categories from '../modules/categories';
import products from '../modules/products';
import cart from '../modules/cart';
import auth from '../modules/auth';
import dashboard from '../modules/dashboard';
import operation from '../modules/operation';

import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth','cart']

})
export default new Vuex.Store({
  state: {
    loading: false //lo defino aqui porque lo podría ocupar de manera global
  },

  //para modificar el loading
  mutations:{
    setLoading(state,bool) {
      state.loading = bool
    }
  },
  modules:{
    init,
    products, 
    categories,
    cart,
    auth,
    dashboard,
    operation
  },
  plugins:[vuexLocal.plugin]
})
