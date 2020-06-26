<template>
  <div class="merc">
    <!-- 商家详情 -->
    <div class="merc_desc">
      <!-- 总体满意度 -->
      <div class="satisfaction">
        <div>
          <div style="font-size:18px;margin-bottom:5px">{{data.name}}</div>
          <div class="merc_desc_count">
            <van-rate v-model="scorevalue" allow-half void-icon="star" void-color="#eee" readonly />
            <span>(661)</span>
            <div>月售{{data.sellCount}}单</div>
          </div>
        </div>
        <div class="merc_desc_star">
          <van-icon
            name="like"
            @click="select_color=select_color=='redcolor'?'eee':'redcolor'"
            :class="select_color"
          />
          <div v-html="select_color=='redcolor'?'取消收藏':'点击收藏'"></div>
        </div>
      </div>
      <div class="content_desc">
        <div class="content_desc_price">
          <div>起送价</div>
          <div style="font-size:20px">{{data.minPrice}}元</div>
        </div>
        <div class="content_desc_price">
          <div>配送费用</div>
          <div style="font-size:20px">{{data.deliveryPrice}}元</div>
        </div>
        <div class="content_desc_price">
          <div>平均送达时间</div>
          <div style="font-size:20px">{{data.deliveryTime}}min</div>
        </div>
      </div>
    </div>
    <!-- 商家公告 -->
    <div class="announcement">
      <div style="font-size:18px">公告与活动</div>
      <van-divider />
      <div style="color:red">{{data.bulletin}}</div>
      <van-divider />
      <div v-for="item in data.supports" :key="item.id">
        <!-- 返回根据活动显示的图片 -->
        <img :src=" returnimg(item)" alt width="20" />
        {{ item }}
        <van-divider />
      </div>
    </div>
    <!-- 商家实景 -->
    <div class="announcements">
      <div style="font-size:18px">商家实景</div>
      <van-divider />
      <div class="imgs">
        <img v-for="item in data.pics" :key="item.id" :src="item" class="ann_img" />
      </div>
    </div>
    <!-- 商家信息 -->
    <div class="announcement">
      <div style="font-size:18px">商家信息</div>
      <van-divider />
      <div class="indent_div">该商家支持开发票</div>
      <van-divider />
      <div class="indent_div">品类：粥类，包子店</div>
      <van-divider />
      <div
        class="indent_div"
      >营业时间： {{change_time(new Date(this.time[0])) }}-{{change_time(new Date(this.time[1])) }}</div>
    </div>
    <!-- 获取vuex中的值 -->
    <div>
      <p @click="change_vuestate">获取的vuex中的数据是：{{getvuex}}</p>
    </div>
  </div>
</template>

<script>
import { Shop_seller_API } from "@/api/apis.js";
export default {
  data() {
    return {
      value: 0,
      data: [],
      //店铺活动
      move_index1: "",
      move_index2: "",
      //店铺得分
      scorevalue: 0,
      //营业时间
      time: [],
      select_color: "eee"
    };
  },
  methods: {
    //转换时间格式
    change_time(data) {
      return (
        this.add_zero(data.getHours()) +
        ":" +
        this.add_zero(data.getMinutes()) +
        ":" +
        this.add_zero(data.getSeconds())
      );
    },
    //补零函数
    add_zero(num) {
      return num < 10 ? "0" + num : num;
    },
    //根据返回的活动加入相应的图片
    returnimg(item) {
      if (item.search("折") != -1) {
        return require("./../../assets/imgs/discount_3@2x.png");
      }
      if (item.search("减") != -1) {
        return require("./../../assets/imgs/decrease_3@2x.png");
      }
      if (item.search("保") != -1) {
        return require("./../../assets/imgs/guarantee_3@2x.png");
      }
      if (item.search("票") != -1) {
        return require("./../../assets/imgs/invoice_3@2x.png");
      } else {
        return require("./../../assets/imgs/special_3@2x.png");
      }
    },
    //点击p标签修改vuex中的数据
    change_vuestate() {
      //点击修改数据
      this.$store.commit("changecount", "666");
    }
  },

  created() {
    //进入页面就开始发送请求
    Shop_seller_API().then(res => {
      this.data = res.data.data;
      // console.log(this.data);
      this.move_index1 = this.data.supports[0];
      this.move_index2 = this.data.supports[1];
      this.scorevalue = this.data.score;
      //营业时间：
      this.time = this.data.date;
    });
    //打印vuex中的值
    // console.log(this.$store);
  },
  computed: {
    getvuex() {
      //获取vuex中的state数据
      return this.$store.state.count;
    }
  }
};
</script>

<style lang="scss" scoped>
$base: #f4f5f7;
.merc {
  background: $base;
}
.merc_desc {
  background: white;
  padding: 0 30px;
  .satisfaction {
    width: 100%;
    height: 80px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .merc_desc_star {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .merc_desc_count {
      display: flex;
      height: 20px;
      align-items: center;
    }
  }
  .content_desc {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80px;

    .content_desc_price {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
.announcement {
  margin-top: 20px;
  padding: 10px 30px;
  background: white;
  .ann_img {
    width: 50px;
    margin-right: 10px;
  }
}
.announcements {
  margin-top: 20px;
  padding: 10px 30px;
  background: white;
  .imgs {
    display: flex;
    justify-content: space-around;
    padding-bottom: 20px;
  }
  .ann_img {
    width: 40px;
    height: 40px;
  }
}
.indent_div {
  text-indent: 10px;
}
.redcolor {
  color: red;
}
.eee {
  color: #eee;
}
</style>
