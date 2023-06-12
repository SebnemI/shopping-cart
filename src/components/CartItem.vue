<template>
  <div class="shopping-cart-item">
    <div class="shopping-cart-detail">
      <img
        :src="product.image"
        :alt="product.title"
        class="shopping-cart-image"
      />
    </div>
    <div class="shopping-cart-detail">
      <div class="shopping-cart-header"></div>
      <h3 class="title">{{ product.title }}</h3>
      <h4>Quantity: {{ product.quantity }}</h4>
      <h4>Cost: {{ productCost }}$</h4>
      <button class="button remove-button">Remove Product</button>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
export default {
  name: "CartItem",
  props: { product: { type: Object } },

  setup(props) {
    const productCost = computed(() => {
      return props.product.quantity * props.product.price;
    });
    onMounted(() => {
      console.log("cart item", props.product);
    });
    return { productCost };
  },
};
</script>

<style lang="scss">
.shopping-cart-item {
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
.shopping-cart-detail {
  padding: 20px 15px;
  text-align: center;
  margin: 10px;
  text-align: left;
}
.shopping-cart-header {
}
.shopping-cart-image {
  width: 150px;
}

@media (max-width: 450px) {
  .shopping-cart-item {
    width: 350px;
    margin: 10px;
  }
}
/*
@media (min-width: 1200px) {
  .shopping-cart-item {
    width: 500px;
  }
}
*/
</style>
