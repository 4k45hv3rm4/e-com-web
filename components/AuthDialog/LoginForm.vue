<template>
  <div>
    <v-dialog persistent v-model="login_data.flag" max-width="500">
      <v-card height="400">
        <v-card-title class="text-h5 card-title">
          {{ this.login_data.type }} Here <v-spacer></v-spacer>
          <v-icon @click="closeForm">mdi-close</v-icon>
        </v-card-title>
        <v-form ref="authForm" class="form" @submit.prevent="action">
          <v-text-field
            label="Email"
            :rules="emailRules"
            v-model="email"
          ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            :rules="rules"
            v-model="password"
          ></v-text-field>
          <v-btn width="400" class="submit_btn" type="submit">{{
            this.login_data.type
          }}</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import urls from "../../app-js/urls";
export default {
  name: "LoginForm",
  props: ["login_data"],
  data() {
    return {
      email: "",
      password: "",
      rules: [],
      emailRules: [],
    };
  },
  methods: {
    closeForm() {
      this.login_data.flag = false;
    },
    action() {
      this.emailRules = [
        (v) => !!v || "Required",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ];
      this.rules = [(v) => !!v || "Required"];
      console.log(this.$refs.authForm.validate());
      if (this.email && this.password) {
        const data = {
          email: this.email,
          password: this.password,
        };
        var url;
        if (this.login_data.type == "Login") {
          url = urls.LOGIN;
        } else {
          url = urls.SIGNUP;
        }

        const successHandler = (res) => {
          console.log(res);
          if (this.login_data.type == "Login") {
            localStorage.setItem("accessToken", res.data.access);
            localStorage.setItem("refreshToken", res.data.refresh);
            this.$notifier.showMessage({
              text: "Login Successfull",
              color: "success",
            });
          } else {
            localStorage.setItem("accessToken", res.data.token.access);
            localStorage.setItem("refreshToken", res.data.token.refresh);
            this.$notifier.showMessage({
              text: `${res.data.message}`,
              color: "success",
            });
          }
          this.closeForm();
        };
        // this.$router.go();

        const finallyHandler = () => {};
        const errorHandler = (err) => {
          console.log(err, "EE");
          this.$notifier.showMessage({
            text: `${err.data.detail}`,
            color: "error",
          });
        };
        this.request_POST(
          url,
          data,
          {},
          successHandler,
          errorHandler,
          false,
          false,
          finallyHandler
        );
      } else {
        return false;
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.form {
  margin: 50px;
}
.card-title {
  background-color: rgb(244, 252, 142);
}
.submit_btn {
  background-color: rgb(104, 177, 177) !important;
  color: #fff;
  letter-spacing: 0px;
  text-transform: capitalize;
}
</style>