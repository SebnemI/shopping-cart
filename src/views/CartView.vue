<template>
  <div>
    <h2>Shopping Cart</h2>
    <div class="cart-container">
      <CartItem
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
      <CartTotal />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import CartItem from "@/components/CartItem.vue";
import CartTotal from "@/components/CartTotal.vue";

export default {
  name: "CartView",
  components: { CartItem, CartTotal },
  setup() {
    const store = useStore();
    const products = computed(() => store.getters.getCart);

    onMounted(() => {
      console.log("products", products);
    });

    return { products };
  },
};
</script>

<style lang="scss">
.cart-container {
  padding: 10px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

@media (max-width: 450px) {
  .cart-container {
    width: 350px;
    margin: 10px;
  }
}
</style>
