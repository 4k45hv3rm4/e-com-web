<template>
  <div>
    <v-card class="mx-auto" max-width="344">
      <v-img
        :src="product_data.image"
        class="image"
        height="200"
        width="344"
      ></v-img>

      <v-card-title class="pa-2"> {{ product_data.title }} </v-card-title>

      <v-card-actions>
        <strong>Rs {{ product_data.price }}</strong>
        <v-spacer></v-spacer>
        <v-btn
          color="red lighten-2"
          :disabled="disabled"
          @click.prevent="$emit('addToCart', product_data.id)"
        >
          Add to Cart</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ProductCard",
  props: ["product_data", "cart"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getProducts: "cart/getProducts",
    }),
    disabled() {
      console.log(this.getProducts, "DATA");
      console.log(
        this.getProducts.map((item) => item.id),
        "MAP"
      );
      return this.getProducts
        .map((item) => item.id)
        .includes(this.product_data.id);
    },
  },
  mounted() {},
};
</script>

<style scoped>
.image {
  object-fit: cover;
}
</style>