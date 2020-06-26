<template>
  <div class="home">
    <!-- 店铺头部 -->
    <div :style="`background:url('http://${data.avatar}') no-repeat  `" class="bg_header">
      <div class="header" style="background:rgba(75,55,45,0.85);width:100%">
        <div class="content_header">
          <img :src="`http://${data.avatar}`" alt style="margin-right:10px;width:60px;height:60px" />
          <div class="content_header_right">
            <div class="right_title">
              <img src="../assets/imgs/brand@2x.png" width="30" alt />

              <span @click="show = true">{{data.name}}</span>
              <!-- 遮罩层 -->
              <van-overlay :show="show" @click="show = false" class="over_div">
                <div style="text-align:center">{{data.name}}</div>
                <div style="text-align:center">
                  <van-rate v-model="value" allow-half void-icon="star" void-color="#eee" />
                </div>
                <van-divider :style="{ color: '#ccc', padding: '0 16px',fontSize:'18px' }">优惠信息</van-divider>
                <div
                  v-for="item in data.supports"
                  :key="item.id"
                  style="text-align:center"
                >{{ item }}</div>
                <van-divider style="font-size:18px;padding: 0 16px">商家公告</van-divider>
                <div class="over_div_arg">{{data.bulletin}}</div>
                <div
                  style="display:flex;justify-content:center; align-items:flex-end;margin-top:50px"
                >
                  <van-icon name="close" size="40" />
                </div>
              </van-overlay>
            </div>
            <div>{{data.description}}/{{data.deliveryTime}}分钟送达</div>
            <div class="right_time">
              <div class="right_send">
                <img src="../assets/imgs/decrease_1@2x.png" width="18" alt />
                <div class="right_send_span">{{this.move_index}}</div>
                <div>
                  <van-tag round>{{this.move_count}}个></van-tag>
                </div>
              </div>
            </div>
          </div>
        </div>
        <van-notice-bar scrollable :text="data.bulletin" />
      </div>
    </div>

    <!-- vue自带的class添加减少类名方法 -->
    <!-- :class="{router_active:this.$route.path=='/',router_default_color:this.$route.path!='/'}" -->
    <!-- 原生js的添加减少类名方法 -->
    <!-- :class="`${this.$route.path=='/'?'router_active':'router_default_color'}`" -->
    <!-- //路由点击的激活样式
        .router_active {
          color: red;
        }
        //路由的默认样式
        .router_default_color {
          color: black;
    }-->

    <div class="details">
      <router-link
        :class="`${this.$route.path=='/'?'router_active':'router_default_color'}`"
        to="/"
      >商品</router-link>
      <router-link
        :class="{router_active:this.$route.path=='/evaluate',router_default_color:this.$route.path!='/evaluate'}"
        to="/evaluate"
      >评价</router-link>
      <router-link
        :class="{router_active:this.$route.path=='/merchant',router_default_color:this.$route.path!='/merchant'}"
        to="/merchant"
      >商家</router-link>
    </div>
    <router-view class="main"></router-view>
    <div>
      <!-- 购物车点击展示+动画 -->
      <transition name="slide-fade">
        <!-- 引用组件 -->
        <Shopcar v-show="shopflag" class="showcar" />
      </transition>
    </div>

    <div class="shopcar">
      <!-- 判断标准--购物车中是否传入了长度大于1 的数组 -->
      <img :src="receivenum" @click="clickimg" width="40" alt />
      <!-- 购物车的商品总价 -->
      <div>￥{{countall}}</div>
      <div>另需配送费4元</div>
      <div style="background:#2B343B;padding:0 10px">￥20起送</div>
    </div>
  </div>
</template>

<script>
//获取店铺详细接口
import { Goods_list_API } from "@/api/apis.js";
//引入商家详情接口
import { Shop_seller_API } from "@/api/apis.js";
//引入购物车组件
import Shopcar from "./Shop";
export default {
  data() {
    return {
      //商家详情
      data: "",
      //活动个数
      move_count: 0,
      //活动详情
      move_index: "",
      show: false,
      value: 0,
      //购物车的点击显示隐藏
      shopflag: false
    };
  },
  methods: {
    //判断购物车中是否有商品，有就出现，没有就不出现，还可以在有商品的状态下点击出现与消失
    clickimg() {
      if (this.getarrlength.length == 0) {
        this.shopflag = false;
      } else {
        this.shopflag = !this.shopflag;
      }
    }
  },
  created() {
    //进入页面就开始发送请求
    Shop_seller_API().then(res => {
      this.data = res.data.data;
      // console.log(this.data);
      this.move_count = this.data.supports.length;
      this.move_index = this.data.supports.map(res => res).join(",");
      this.value = this.data.score;
    });
    Goods_list_API().then(res => {
      // setTimeout(() => {
      //   // 3s之后显示页面
      //   this.data = res.data.goodsList;
      //   // console.log(this.data);

      //   this.flag = true;
      // }, 3000);
      //将后台响应的数据保存到vuex中,方便后续的多页面数据联动
      //添加自定义的属性:num--每个商品的数量
      let arr = res.data.goodsList;
      for (let obj of arr) {
        for (let number of obj.foods) {
          //判断，如果重新加载时，购物车中的数量不为0
          number.num = 0;
        }
      }
      // console.log(arr);
      this.$store.commit("goodsList", arr);
    });
  },
  //注册组件
  components: {
    Shopcar
  },
  computed: {
    getarrlength() {
      //引入商品数量大于1的商品
      return this.$store.getters.receivenum;
    },
    //获取商品数量大于0的商品，用于改变购物车颜色
    receivenum() {
      //引入商品数量大于1的商品
      if (this.$store.getters.receivenum.length > 0) {
        return require("./../assets/imgs/shopcar_light.png");
      }
      return require("./../assets/imgs/shopcar.png");
    },
    //计算选中商品的总价
    countall() {
      //循环商品数量大于0的数组
      let countall = 0;
      for (let obj of this.getarrlength) {
        countall += obj.price * obj.num;
      }

      return countall.toFixed(2);
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
$base: #131d26;
$font_color: #ccc;
body,
html {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.home {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  color: $font_color;
  .header {
    width: 100%;

    .content_header {
      display: flex;
      justify-content: center;
      padding: 20px;
      .content_header_right {
        .right_title {
          .over_div {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .over_div_arg {
              text-indent: 40px;
              display: flex;
              justify-content: center;
              align-content: center;
            }
          }
        }
        .right_time {
          .right_send {
            display: flex;
            justify-content: space-between;
            .right_send_span {
              width: 200px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
  .details {
    display: flex;
    border: 1px solid #ccc;
    border-left: none;
    border-right: none;
    height: 40px;
    line-height: 40px;
    justify-content: space-around;
  }
  .main {
    flex: 1;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
  }
  .showcar {
    position: fixed;
    bottom: 42px;
    width: 100%;

    border: 1px solid #ccc;
  }
  .shopcar {
    height: 40px;
    display: flex;
    border: 1px solid #000;
    justify-content: space-between;
    line-height: 40px;
    padding: 0 0 0 20px;
    color: #ccc;
    background: $base;
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
//路由点击的激活样式
.router_active {
  color: red;
}
//路由的默认样式
.router_default_color {
  color: black;
}
// 点击购物车的动画
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(300px);
  opacity: 0;
}
</style>
