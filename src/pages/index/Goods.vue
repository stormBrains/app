<template>
  <div>
    <div v-show="!flag" id="goods">
      <!-- 左边部分 -->
      <div id="goods_left" class="left_goods">
        <div>
          <!-- class类名判断
          :class={类名1:true,类名2:false}-->
          <!-- class="left_list" -->
          <div
            v-for="(item, index) in goodsList"
            :key="item.id"
            :id="item.name"
            :class="{ left_list: true, left_active: leftflag == index }"
            @click="left_div(index)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <!-- 右边部分 -->
      <div id="goods_right" class="right_goods">
        <div>
          <div v-for="(item, index) in goodsList" :key="item.id" :id="index">
            <div style="text-indent:20px">{{ item.name }}</div>
            <div v-for="res in item.foods" :key="res.id">
              <van-card
                :price="res.price.toFixed(2)"
                :desc="res.goodsDesc"
                :title="res.name"
                :thumb="res.imgUrl"
                class="card_right"
              >
                <template #tags class="rating_right">
                  <van-button
                    plain
                    hairline
                    type="primary"
                    size="mini"
                    style="margin-right:5px"
                    >月售{{ res.sellCount }}份</van-button
                  >
                  <van-button
                    plain
                    hairline
                    type="info"
                    size="mini"
                    @click="hashchange(res.id)"
                    >好评率{{ res.rating }}%</van-button
                  >
                </template>
                <template #footer class="rating_footer">
                  <!-- 减少,添加数量 -->
                  <!-- 当数量小于1时,左侧的减号不显示 -->

                  <button v-show="res.num > 0" @click="changenum(-1, res.id)">
                    -
                  </button>

                  <button v-show="res.num > 0" @click="change">
                    {{ res.num }}
                  </button>

                  <button @click="changenum(1, res.id)">+</button>
                </template>
              </van-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 默认显示白屏 -->
    <!-- <img v-show="!flag" src="../../assets/imgs/default.jpg" alt /> -->
  </div>
</template>

<script>
//引入滚动条
import BScroll from "better-scroll";
export default {
  data() {
    return {
      data: [],
      //获取vuex的数组
      gdlist: [],
      value: 1,
      //进入页面,默认显示白屏
      flag: false,
      //左侧按钮的标杆
      leftflag: 0,
    };
  },
  methods: {
    //页面请求
    page_set() {},
    //左边的点击事件 index--每一个盒子的索引
    left_div(index) {
      //将当前索引复制给左侧标杆
      this.leftflag = index;
      //左联右
      this.goods_right.scrollToElement(document.getElementById(index), 600);
    },
    //加减购物车
    changenum(val, id) {
      this.$store.commit("changenum", { val, id });
      // console.log(this.goodsList);
    },
    hashchange(id) {
      this.$store.commit("hashchange", id);
      location.hash = "/Goodsimg";
    },
    change() {
      location.hash = "/Go";
    },
  },

  created() {
    //进入页面就开始发送请求
    this.page_set();
  },
  mounted() {
    //左侧盒子
    this.goods_lefg_box = new BScroll(document.getElementById("goods_left"), {
      click: true, //运行点击
    });

    this.goods_right = new BScroll(document.getElementById("goods_right"), {
      probeType: 3, //允许实时派发 scroll 事件
    });
    // console.log(this.goods_lefg_box);
    //右侧的滚动事件
    this.goods_right.on("scroll", (obj) => {
      //将纵坐标转为正值
      let abs_y = Math.abs(obj.y);
      // console.log(abs_y);
      //调用计算属性
      for (let res of this.scroll_height_div) {
        //当前坐标是否在该区间内，如果满足，则将该索引复制给左侧标杆
        if (abs_y >= res.min && abs_y < res.max) {
          //左侧盒子的激活样式
          this.leftflag = res.id;
          //右滚左，滚动左侧盒子的id获取--循环的时候左侧的盒子id 根据循环数组的名字命名
          this.goods_lefg_box.scrollToElement(
            document.getElementById(res.name),
            600
          );

          break;
        }
      }
    });
  },
  //计算属性
  computed: {
    scroll_height_div() {
      //获取右侧每一个盒子所在的高度区间
      let right_arr = [];
      //初始高度
      let scroll_first = 0;
      //调用goodList()计算属性
      // console.log(this.goodsList);
      for (let obj = 0; obj < this.goodsList.length; obj++) {
        let right_div = document.getElementById(obj).offsetHeight; //每一个盒子的高度
        right_arr.push({
          id: obj,
          min: scroll_first,
          max: scroll_first + right_div,
          //左滚右--name:左侧每一个盒子的id
          name: this.goodsList[obj].name,
        });
        //后面的盒子高度加上之前盒子的高度
        scroll_first += right_div;
      }
      // console.log(right_arr);
      return right_arr;
    },
    //获取商品列表
    goodsList() {
      return this.$store.state.goodsList;
    },
  },
};
</script>

<style lang="scss" scoped>
$base: #f4f5f7;
#goods {
  width: 100%;
  height: 100%;
  display: flex;
  .left_goods {
    width: 100px;
    height: 100%;
    overflow: auto;
    border-right: 1px solid $base;

    .left_list {
      height: 60px;
      border-bottom: 1px solid white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .right_goods {
    flex: 1;
    display: flex;
    overflow-y: scroll;
    flex-direction: column;
    .card_right {
      .rating_right {
        span {
          margin-right: 10px;
        }
      }
      .rating_footer {
        .rating_footer_span {
          display: block;
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
.msg_btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
//点击左侧的激活样式
.left_active {
  background: $base;
}
</style>
