<template>
  <div class="card">
    <img :src="product.image" :alt="product.title" class="product-image" />
    <h4 class="title">{{ product.title }}</h4>

    <h5 class="price">Price: {{ product.price }}$</h5>
    <h5 class="category">Category:{{ product.category }}</h5>
    <button class="view-button" @click="$emit('view-product', product)">
      View Product
    </button>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: { product: { type: Object } },
  setup() {
    return {};
  },
};
</script>

<style lang="scss">
.card {
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 1px 5px rgb(0 0 0 / 0.2);
  padding: 10px;
  text-align: center;
  width: 70%;
  margin: 10%;
}

.product-image {
  width: 150px;
  height: 150px;
}

.category {
  margin-top: 5px;
}

.price {
  margin-bottom: 5px;
}

.title {
  color: #517683;
}

.view-button {
  cursor: pointer;
  font-weight: medium;
  padding: 10px;
  background-color: #7db8cc;
  border: none;
  border-radius: 3px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}

@media (min-width: 450px) {
  .card {
    width: 300px;
    margin: 10px;
  }
}
</style>
