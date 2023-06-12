import { createStore } from "vuex";

const updateStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export default createStore({
  state: {
    cart: [],
  },

  mutations: {
    addProduct(state, product) {
      let item = state.cart.find((i) => i.id === product.id);
      if (item) item.quantity++;
      else {
        state.cart.push({ ...product, quantity: 1 });
      }
      updateStorage(state.cart);
    },

    removeProduct(state, product) {
      let item = state.cart.find((i) => i.id === product.id);
      if (item) {
        if (item.quantity > 1) item.quantity--;
        else {
          state.cart = state.cart.filter((i) => i.id !== product.id);
        }
      }
      updateStorage(state.cart);
    },

    updateCartFromLocalStorage(state) {
      const cart = localStorage.getItem("cart");
      if (cart) state.cart = JSON.parse(cart);
    },
  },

  actions: {
    addProduct({ commit }, product) {
      commit("addProduct", product);
    },
    removeProduct({ commit }, product) {
      commit("removeProduct", product);
    },
    updateCartFromLocalStorage({ commit }) {
      commit("updateCartFromLocalStorage");
    },
  },

  getters: {
    productQuantity: (state) => (product) => {
      const item = state.cart.find((i) => i.id === product.id);

      if (item) return item.quantity;
      else return null;
    },
    getCart: (state) => {
      return state.cart;
    },
    getTotal: (state) => {
      let total = 0;
      state.cart.map((product) => {
        total += product.price * product.quantity;
      });
      return total.toFixed(2);
    },
  },

  modules: {},
});
