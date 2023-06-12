<template>
  <div>
    <nav class="navbar-class">
      <router-link  to="/"
        >Products
      </router-link>
      <router-link  to="/cart"
        ><font-awesome-icon icon="fa-shopping-cart"
      /></router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("updateCartFromLocalStorage");
    });
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html,
body {
  padding: 0;
  margin: 0;
}

body {
  background: white;
}

nav {
  display: flex;
  line-height: 30px;
  height: 25px;
  width: 100%;
  font-size: 1.3rem;
  padding: 25px;
  align-content: center;
  border-bottom: 0.2rem solid lightgray;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.1);
}

.navbar-class {
  flex-wrap: wrap;
  justify-content: space-around;
}

nav > a {
  text-decoration: none;
  font-weight: 500;
  color: black;
}

nav > a.active {
  color: black;
}

.text-center {
  text-align: center;
}
</style>
