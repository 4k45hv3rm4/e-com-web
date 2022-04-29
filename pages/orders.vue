<template>
  <div>
    My Orders
    <v-data-table :items="orders" hide-default-footer :headers="header">
      <template v-slot:item.product="{ item }">
        <div>
          <div v-if="item.product.length" class="ma-auto">
            <div
              v-for="x in item.product"
              :key="x.id"
              class="product-div d-flex align-center justify-center"
            >
              <div>
                <div>
                  <strong>Product ID:</strong>
                  {{ x.id }}
                </div>
                <div>
                  <strong>Price:</strong>
                  RS {{ x.price }}
                </div>
                <div>
                  <!-- <strong>Product Id:</strong> -->
                  <strong>Title</strong>: {{ x.title }}
                </div>
              </div>

              <div class="text-center image-div">
                <v-img
                  :src="x.image"
                  class="image"
                  height="100"
                  width="100"
                ></v-img>
              </div>
            </div>
          </div>
          <div v-else>--</div>
        </div>
      </template>
      <template v-slot:item.amount="{ item }">
        <div class="text-center">
          <div>Rs: {{ item.amount }}</div>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import urls from "../app-js/urls";
export default {
  name: "Order",
  data() {
    return {
      orders: [],
      header: [
        {
          text: "Order id",
          align: "center",
          sortable: false,
          class: "head",
          value: "id",
        },
        {
          text: " Product Detail",
          align: "center",
          sortable: false,
          class: "head ",

          value: "product",
        },
        {
          text: "Total",
          class: "head ",
          align: "center",
          sortable: false,
          value: "amount",
        },
      ],
    };
  },
  methods: {
    getOrders() {
      const successHandler = (res) => {
        this.orders = res.data.results;
        console.log(this.orders);
      };

      const finallyHandler = () => {};
      const errorHandler = (err) => {};
      this.request_GET(
        urls.ORDER_LIST,
        {},
        {},
        successHandler,
        errorHandler,
        false,
        true,
        finallyHandler
      );
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>

<style scoped>
.image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.image-div {
  align-content: center;
  width: 100px;
  height: 120px;
}
.product-div {
  border: 1pc;
}
</style>