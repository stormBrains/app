<template>
  <div>
    <div v-for="item in hashchange" :key="item.id">
      {{ item.name }}
      {{item.price}}
      <img :src="item.imgUrl" alt />
      <button @click="addshopcar(item.id,1)">点击添加到购物车</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    hashchange() {
      return this.$store.state.imgarr;
    }
  },
  methods: {
    addshopcar(id, val) {
      this.$store.commit("addshopcar", { id, val });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>