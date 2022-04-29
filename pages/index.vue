<template>
  <div>
    <h2>Available Products</h2>
    <div v-if="products.length">
      <div class="products-container">
        <ProductCard
          @addToCart="add"
          class="d-flex"
          v-for="(item, index) in products"
          :product_data="item"
          :key="index"
        />
      </div>
      <div class="mt-7"></div>
      <v-pagination
        v-model="page"
        color="red lighten-2 "
        @input="getProductList"
        class="elevation-0 pagination"
        :length="numPages"
      ></v-pagination>
    </div>
    <div v-else class="text-center">
      <v-progress-circular
        :width="5"
        size="50"
        color="red lighten-2"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import ProductCard from "../components/product/ProductCard.vue";
import { mapActions, mapGetters } from "vuex";
import urls from "../app-js/urls";
import getAccessToken from "../app-js/methods";

export default {
  name: "IndexPage",
  layout: "default",
  components: {
    ProductCard,
  },
  data() {
    return {
      page: 1,

      numPages: 1,
      products: [],
      cart: [],
    };
  },
  computed: {
    ...mapGetters({
      getName: "cart/getProducts",
    }),
  },
  methods: {
    ...mapActions("cart", ["addToCart", "getCartDetails"]),
    // check user logged in or not
    isAuthenticated() {
      return getAccessToken();
    },
    add(item) {
      if (!this.isAuthenticated()) {
        // asking to login to add to cart
        this.$notifier.showMessage({
          text: `Login to add to cart`,
          color: "error",
        });
        return false;
      }
      this.addToCart(item);
      this.getCartDetails();
    },

    //Add item to cart
    addToCart(id) {
      const data = {
        product_id: id,
      };
      const successHandler = (res) => {
        console.log(res);
        this.$notifier.showMessage({
          text: `${res.data.message}`,
          color: "success",
        });
      };

      const finallyHandler = () => {};
      const errorHandler = (err) => {
        this.$notifier.showMessage({
          text: `${err.data.detail}`,
          color: "error",
        });
      };
      this.request_POST(
        urls.ADD_TO_CART,
        data,
        {},
        successHandler,
        errorHandler,
        false,
        true,
        finallyHandler
      );
    },

    // get Product list from backend
    getProductList() {
      this.tableloading = true;
      const successHandler = (res) => {
        console.log(res);
        this.products = res.data.results;
        this.numPages = Math.ceil(res.data.count / 10);
        this.tableloading = false;
      };
      const errorHandler = (err) => {
        console.log(err);
        this.tableloading = false;
      };
      const finallyHandler = (err) => {};

      this.request_GET(
        urls.PRODUCT_LIST + `?page=${this.page}`,
        {},
        {},
        successHandler,
        errorHandler,
        false,
        false,
        finallyHandler
      );
    },
  },
  mounted() {
    setTimeout(() => {
      this.getProductList();
    }, 1000);
  },
};
</script>


<style lang="scss" scoped>
.products {
  margin-top: 20px;
}
.products-container {
  display: grid;
  grid-template-columns: repeat(3, 31.2%);
  justify-content: space-between;
  grid-row-gap: 15px;
  width: 100% !important;
}
</style>
