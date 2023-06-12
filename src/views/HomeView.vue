<template>
  <div>
    <div class="container">
      <div class="">
        <input
          class="search-container"
          id="search-input"
          type="text"
          placeholder="Search..."
          v-model="searchTerm"
          @input="searchProducts"
        />
        <select
          v-model="selectedCategory"
          class="search-container"
          placeholder="Search..."
        >
          <option v-for="category in categories" :key="category">
            {{ category }}
          </option>
          <option :value="selectedCategory" disabled hidden>
            Select a category
          </option>
        </select>
      </div>
    </div>
    <div class="container">
      <ProductCart
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @view-product="(product) => viewProduct(product)"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import ProductCart from "../components/ProductCart.vue";
import { getProducts } from "../services/ProductServices";
import { useRouter } from "vue-router";

export default {
  name: "HomeView",
  components: { ProductCart },
  setup() {
    const products = ref([]);
    const chosenProduct = ref([]);
    const router = useRouter();
    const categories = ref([]);
    const searchTerm = ref("");
    const selectedCategory = ref("");

    const filteredProducts = computed(() => {
      const query = searchTerm.value.toLowerCase().trim();
      const category = selectedCategory.value;

      return products.value.filter((product) => {
        const titleMatch = product.title.toLowerCase().includes(query);
        const descriptionMatch = product.description
          .toLowerCase()
          .includes(query);
        const categoryMatch =
          category === "" ||
          category === "All" ||
          product.category === category;

        return (titleMatch || descriptionMatch) && categoryMatch;
      });
    });

    const viewProduct = (product) => {
      chosenProduct.value = product;
      router.push(`/product/${product.id}`);
    };

    onMounted(async () => {
      products.value = await getProducts();
      categories.value = new Set(
        products.value.map((product) => product.category)
      );
      categories.value = ["All", ...categories.value];
      console.log(filteredProducts);
      console.log(categories.value);
    });

    return {
      viewProduct,
      chosenProduct,
      products,
      categories,
      searchTerm,
      filteredProducts,
      selectedCategory,
    };
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  max-width: 1800px;
  margin: auto;
}

.search-container {
  border: 1px solid gray;
  border-radius: 3px;
  box-shadow: 0 1px 5px rgb(0 0 0 / 0.2);
  padding: 10px;
  margin: 10px;
  min-width: 200px;
}

@media (min-width: 450px) {
  .search-container {
    width: 300px;
  }
}
</style>
