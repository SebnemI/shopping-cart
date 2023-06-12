<template>
  <div class="cart-total">
    <div class="cart-total-detail">
      <h3>Cart Total: {{ cartTotal }}$</h3>
    </div>
    <div class="cart-total-detail">
      <button class="pay-button">Proceed to checkout</button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "CartTotal",
  setup() {
    const store = useStore();

    const cartTotal = computed(() => store.getters.getTotal);
    return { cartTotal };
  },
};
</script>

<style lang="scss">
.pay-button {
  cursor: pointer;
  font-weight: medium;
  padding: 10px;
  background-color: #7db8cc;
  border: none;
  border-radius: 3px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
.cart-total {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 1px 5px rgb(0 0 0 / 0.2);
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
}
.cart-total-detail {
  width: 70%;
  margin: 1rem;
}

@media (max-width: 400px) {
  .cart-total {
    width: 350px;
    margin: 5px;
  }
}
</style>
