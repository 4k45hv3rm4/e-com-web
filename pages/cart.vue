<template>
  <div>
    <div v-if="total">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Cart items</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense class="list">
        <strong class="px-4 d-flex flex-row justify-space-around total_div">
          <div>Item</div>
          <div>Price</div>
        </strong>
        <v-list-item v-for="(item, index) in getProducts" :key="index" link>
          <v-list-item-icon>
            <img :src="item.img" height="40" width="40" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-list-item-content>
            <v-list-item-title>{{ item.price }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="pa-2"
              ><v-icon color="red" @click="removeFromCart(item.id)"
                >mdi-close</v-icon
              ></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="d-flex justify-space-around total">
        <strong>Total </strong><strong class="mr-5">{{ total }}</strong>
      </div>

      <div class="btn-div">
        <v-btn class="btn" @click="placeOrder"> Place Order </v-btn>
      </div>
    </div>

    <div v-else class="pa-5 text-center justify-center d-flex flex-column">
      <strong class="pa-5">No items in Cart</strong>
      <v-btn color="green" width="200" class="ma-auto" @click="goToHome"
        >Continue Shopping</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import urls from "../app-js/urls";
export default {
  name: "Cart",
  layout: "default",
  data() {
    return {};
  },

  methods: {
    ...mapActions("cart", ["removeFromCart", "getCartDetails"]),

    goToHome() {
      this.$router.push("/");
    },
    placeOrder() {
      const successHandler = (res) => {
        this.$notifier.showMessage({
          text: `Order placed Successfully`,
          color: "success",
        });
        this.getCartDetails();
      };
      const errorHandler = () => {};
      const data = {
        products: this.getProducts.map((item) => item.id),
        amount: this.total,
      };
      this.request_POST(
        urls.PLACE_ORDER,
        data,
        {},
        successHandler,
        errorHandler,
        false,
        true,
        () => {}
      );
    },

    //Add item to cart
  },
  computed: {
    ...mapGetters({
      getProducts: "cart/getProducts",
    }),
    total() {
      var s = 0;
      this.getProducts.forEach((item) => {
        s += item.price;
      });
      return s;
    },
  },

  mounted() {
    // this.getCartDetails();
  },
};
</script>

<style scoped>
.total {
  border-top: 1px solid black;
}
.btn {
  background-color: rgb(104, 177, 177) !important;
  color: #fff;
  letter-spacing: 0px;

  text-transform: capitalize;
}
.btn-div {
  display: flex;

  justify-content: flex-end;
}
</style>