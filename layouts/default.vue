<template>
  <v-app>
    <v-app-bar fixed app elevate-on-scroll>
      <snackbar></snackbar>
      <login-form :login_data="login_data" v-if="login_data.flag"></login-form>
      <strong class="logo" @click="goToHome">E-COM</strong>
      <v-spacer></v-spacer>
      <div v-if="!isAuthenticated()">
        <strong class="auth-cta" @click="Login()">Login</strong>
        <strong class="auth-cta" @click="Signup()"> Signup</strong>
      </div>
      <div v-else>
        <strong class="auth-cta" @click="goToOrders">My Orders</strong>
        <v-btn @click="Logout()" color="orange lighten-2">Logout</v-btn>
        <v-btn color="pink" height="40" class="auth-cta" @click="goToCart">
          Cart
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import global from "../mixins.js/global";
import LoginForm from "../components/AuthDialog/LoginForm.vue";
import snackbar from "../components/snackBar/snackbar.vue";
import { mapActions } from "vuex";
import getAccessToken from "../app-js/methods";

Vue.mixin(global);

export default {
  name: "DefaultLayout",
  mixins: [global],
  components: {
    "login-form": LoginForm,
    snackbar,
  },
  data() {
    return {
      clipped: false,
      login_data: {
        flag: false,
      },
      drawer: null,
      items: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    };
  },

  methods: {
    ...mapActions("cart", ["getCartDetails"]),
    goToCart() {
      this.$router.push("/cart");
    },
    Logout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      this.$router.go("/");
    },
    goToOrders() {
      this.$router.push("/orders");
    },
    goToHome() {
      this.$router.push("/");
    },
    Login() {
      this.login_data.flag = true;
      this.login_data.type = "Login";
    },
    Signup() {
      this.login_data.flag = true;
      this.login_data.type = "Signup";
    },
    isAuthenticated() {
      return getAccessToken();
    },
  },
  mounted() {
    if (this.isAuthenticated) {
      this.getCartDetails();
    }
  },
};
</script>


<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand&display=swap");
*,
#public-section {
  font-family: "Quicksand", sans-serif;
}
.auth-cta {
  margin: 5px;
  color: #fff;
  background-color: rgb(104, 177, 177);
  padding: 10px;
  border-radius: 10%;
  cursor: pointer;
}
.logo {
  font-weight: 800;
  color: rgb(255, 160, 36);
}
.list {
  border-bottom: 1px solid #333;
}
.total_div {
  margin: 10px;
}
.button {
  background-color: rgb(104, 177, 177) !important;
  color: #fff;
  letter-spacing: 0px;
  text-transform: capitalize;
  width: 50%;
}
</style>