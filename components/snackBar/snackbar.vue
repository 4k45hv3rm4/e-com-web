<template>
  <v-snackbar
    app
    v-model="show"
    :color="color"
    :timeout="timeout"
    top
    right
    rounded
    v-if="show"
    elevation="2"
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-icon text v-bind="attrs" @click="show = false"> mdi-close </v-icon>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      color: "",
      timeout: 2000,
      show: false,
    };
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "snackBar/SHOW_MESSAGE") {
        this.text = state.snackBar.text;
        this.color = state.snackBar.color;
        this.timeout = state.snackBar.timeout;
        this.show = true;
      }
    });
  },
};
</script>
