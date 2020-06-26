<template>
  <!-- 购物车如果商品为0，则消失，否则出现 -->
  <div id="shopcar" v-show="receivenum.length>0?true:false">
    <div v-for="item in receivenum" :key="item.id" class="car_div">
      <div class="car_div_img">
        <img :src="item.imgUrl" alt />
      </div>
      <div class="car_div_content">
        <!-- 加入的商品名字 -->
        <div>{{item.name}}</div>

        <div class="content_price_change">
          <!-- 商品价格  -->
          <div>{{item.price.toFixed(2)}}</div>
          <!-- 商品数量-->
          <div>
            <!-- 当数量小于1时,左侧的减号不显示 -->
            <button
              v-show="item.num>0"
              style="width:20px;border-radius:100%"
              @click="changenum(-1,item.id)"
            >-</button>
            <button v-show="item.num>0" style="width:20px;background:white">{{item.num}}</button>
            <button
              @click="changenum(1,item.id)"
              style="width:20px;margin-right:20px;border-radius:100%"
            >+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    // console.log(this.$store.state.goodsList);
  },
  methods: {
    //加减购物车
    changenum(val, id) {
      this.$store.commit("changenum", { val, id });
    }
  },
  computed: {
    receivenum() {
      //引入商品数量大于1的商品
      return this.$store.getters.receivenum;
    }
  }
};
</script>

<style lang="scss" scoped>
$base: black;
$bdcolor: #fafafa;
* {
  margin: 0;
  padding: 0;
}
body,
html {
  width: 100%;
  height: 100%;
}
#shopcar {
  color: $base;
  background: $bdcolor;

  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  height: 150px;
  overflow: auto;
  .car_div {
    display: flex;
    align-items: center;
    padding: 20px 0 0 0;
    margin-top: 10px;
    margin-bottom: 20px;
    .car_div_img {
      margin-right: 20px;
      img {
        width: 50px;
      }
    }
    .car_div_content {
      flex: 1;
      .content_price_change {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>