<template>
  <div>
    <div class="product-container">
      <div class="product-detail">
        <img
          :src="product.image"
          :alt="product.title"
          class="product-view-image"
        />
      </div>
      <div class="product-detail">
        <h3 class="title">{{ product.title }}</h3>

        <h4 class="product-info">Price: {{ product.price }}$</h4>
        <h4 class="product-info">Rate: {{ rate }}/ {{ count }}</h4>
        <h4 class="product-info">Category: {{ product.category }}</h4>

        <p class="description">Description: {{ product.description }}</p>

        <div class="product-info" v-if="totalProduct">
          <h4>In Cart: {{ totalProduct }} Items</h4>
          <h5></h5>
        </div>

        <div class="button-group">
          <button
            v-if="totalProduct"
            class="button remove-button"
            @click="removeFromCart()"
          >
            Remove Product
          </button>
          <button class="button add-button" @click="addCart()">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { getProductById } from "../services/ProductServices";
import { useRoute } from "vue-router";
export default {
  name: "ProductView",
  props: {},
  setup() {
    const totalProduct = computed(() =>
      store.getters.productQuantity(product.value)
    );

    const product = ref({});
    const rate = ref(0);
    const count = ref(0);
    const route = useRoute();
    const id = route.params.id;
    const store = useStore();

    const addCart = () => {
      console.log("product added to cart");
      store.dispatch("addProduct", product.value);
    };

    const removeFromCart = () => {
      console.log("product removed from cart");
      store.dispatch("removeProduct", product.value);
    };

    const getRate = (product) => {
      return product?.value?.rating?.rate;
    };

    const getCount = (product) => {
      return product?.value?.rating?.count;
    };

    onMounted(async () => {
      product.value = await getProductById(id);
      rate.value = getRate(product);
      count.value = getCount(product);
      console.log("product view", product.value);
    });

    return {
      totalProduct,
      product,
      addCart,
      removeFromCart,
      getRate,
      rate,
      getCount,
      count,
    };
  },
};
</script>

<style lang="scss">
.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.product-detail {
  padding: 20px 15px;
  text-align: center;
  width: 70%;
  margin: 10%;
}

.product-image-big {
  padding: 10px;
  text-align: center;
  width: 50%;
  margin: 10px;
}

.product-view-image {
  padding: 10px;
  text-align: center;
  width: 100%;
}

.title {
  margin-top: 2rem;
}

.description {
  font-size: 0.9rem;
  text-align: left;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  padding: 0;
  margin: 0;
}

.button {
  cursor: pointer;
  font-weight: medium;
  padding: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  width: 100px;
}

.add-button {
  background-color: #7db8cc;
}

.remove-button {
  background-color: #d9836c;
}

.product-info {
  margin: 10px 0;
  text-align: left;
}

@media (min-width: 450px) {
  .product-detail {
    width: 300px;
    margin: 10px;
  }
}
</style>
