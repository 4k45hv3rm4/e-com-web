<template>
  <div>
    <br />
    <input type="text" placeholder="Input here" @input="changeValue" />
    {{ this.inputValue }}
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    changeValue(e) {
      console.log(e.target.value);
      this.inputValue = e.target.value;
    },
  },
};
</script>
