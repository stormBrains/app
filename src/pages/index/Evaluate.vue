<template>
  <div id="eval">
    <van-grid :border="false" :column-num="2" gutter="1px" class="eval_count">
      <van-grid-item>
        <h3 style="color:orange">{{this.storevalue}}</h3>
        <div>综合评分</div>
        <div>高于周围商家62%</div>
      </van-grid-item>
      <van-grid-item class="service_title">
        <div>
          服务态度
          <van-rate v-model="storevalue" allow-half void-icon="star" void-color="#eee" readonly />
          {{this.storevalue}}
        </div>
        <div>
          服务态度
          <van-rate v-model="storevalue" allow-half void-icon="star" void-color="#eee" readonly />
          {{this.storevalue}}
        </div>
        <div class="send_time">送达时间 {{this.deliveryTime}}分钟</div>
      </van-grid-item>
    </van-grid>

    <div class="eval_desc">
      <!-- 总体满意度 -->
      <div class="satisfaction">
        <van-button
          type="info"
          :class="`${allcheck==true?'click_active':''}` "
          class="inform_btn"
          size="small"
          @click="all_choice"
          plain
        >全部{{this.all_count}}</van-button>
        <van-button
          type="info"
          :class="{inform_btn:true,click_active:this.faisecheck==true}"
          plain
          size="small"
          @click="good_choice"
        >满意{{this.yes_order}}</van-button>
        <van-button
          type="info"
          :class="{inform_btn:true,click_active:this.badcheck==true}"
          plain
          size="small"
          @click="bad_choice"
        >不满意{{this.all_count-this.yes_order}}</van-button>
      </div>
      <div class="content_desc">
        <p>
          <van-checkbox v-model="checked" icon-size="24px" @click="text_content ">只看有内容的评价</van-checkbox>
        </p>
      </div>
      <!-- 具体描述 -->
      <div v-for="item in contentarr" :key="item.id" class="eval_desces">
        <van-image round width="2rem" height="2rem" :src="item.avatar" />
        <div class="eval_desces_right">
          <div class="store">
            <div>{{item.username}}</div>
            <div class="ccc_class">{{change_time((new Date(item.rateTime)))}}</div>
          </div>
          <div>
            <van-rate v-model="item.score" readonly />
            <span>{{item.deliveryTime}}分钟送达</span>
          </div>
          <div>{{item.text}}</div>
          <div class="like_count">
            <!-- 是否满意 -->
            <div>
              <!-- 根据返回的item.rateType-0和1进行判断：0：false 1:true -->
              <van-icon v-if="item.rateType" name="good-job-o" style="transform:rotateZ(-180deg) " />
              <van-icon v-if="!item.rateType" name="good-job-o" color="#1989fa" />
            </div>

            <van-tag
              v-for="res in item.recommend"
              :key="res.id"
              plain
              style="font-size:12px"
              class="text_tag"
            >{{ res }}</van-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入商家详情接口 商家评价
import { Shop_seller_API, Shop_ratings_API } from "@/api/apis.js";
export default {
  data() {
    return {
      //订单评分
      value: 3,
      //店铺送达时间
      deliveryTime: "",
      //店铺评分
      storevalue: 0,
      //全部订单数
      all_count: 0,
      //订单详情
      arr: [],
      //订餐时间
      ordertime: "",
      //每单的评价
      orderscore: [],
      //满意人数
      yes_order: 0,
      //不满意人数
      no_order: 0,
      //点击展示有内容的评价
      checked: false,
      // 有内容的数组
      contentarr: [],
      allcheck: false,
      faisecheck: false,
      badcheck: false
    };
  },
  methods: {
    //转换时间格式
    change_time(data) {
      return (
        data.getFullYear() +
        "/" +
        this.add_zero(data.getMonth() + 1) +
        "/" +
        this.add_zero(data.getDate()) +
        " " +
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
    //全部选中
    all_choice() {
      this.allcheck = true;
      this.faisecheck = false;
      this.badcheck = false;
      if (this.allcheck == true && this.checked == false) {
        this.contentarr = this.arr;
      }
      if (this.allcheck == true && this.checked == true) {
        this.contentarr = this.arr.filter(res => {
          return res.text != "";
        });
      }
    },

    //满意
    good_choice() {
      this.allcheck = false;
      this.badcheck = false;
      this.faisecheck = true;
      if (this.faisecheck == true && this.checked == false) {
        this.contentarr = this.arr.filter(res => res.rateType == 0);
      }
      if (this.faisecheck == true && this.checked == true) {
        this.contentarr = this.arr.filter(res => {
          return res.rateType == 0 && res.text != 0;
        });
      }
    },
    //不满意的选择
    bad_choice() {
      this.allcheck = false;
      this.faisecheck = false;
      this.badcheck = true;
      if (this.badcheck == true && this.checked == false) {
        this.contentarr = this.arr.filter(res => res.rateType != 0);
      }
      if (this.badcheck == true && this.checked == true) {
        this.contentarr = this.arr.filter(
          res => res.rateType != 0 && res.text != ""
        );
      }
    },
    text_content() {
      //只看有内容的评价
      if (
        this.checked == true &&
        this.allcheck == false &&
        this.faisecheck == false &&
        this.badcheck == false
      ) {
        this.contentarr = this.arr.filter(res => res.text != "");
      }
      // 只看全部有内容的评价
      if (this.checked == true && this.allcheck == true) {
        this.contentarr = this.arr.filter(res => res.text != "");
      }
      if (this.checked == false && this.allcheck == true) {
        this.contentarr = this.arr;
      }
      // 只看满意的评价
      if (this.checked == true && this.faisecheck == true) {
        this.contentarr = this.arr.filter(
          res => res.rateType == 0 && res.text != ""
        );
      }
      // 只看满意的评价，不看内容
      if (this.checked == false && this.faisecheck == true) {
        this.contentarr = this.arr.filter(res => res.rateType == 0);
      }
      //只看不满意的评价
      if (this.badcheck == true && this.checked == true) {
        this.contentarr = this.arr.filter(
          res => res.rateType == 1 && res.text != ""
        );
      }
      //只看不满意的部分，不看内容
      if (this.badcheck == true && this.checked == false) {
        this.contentarr = this.arr.filter(res => res.rateType == 1);
      }
    }
  },
  created() {
    //进入页面就开始发送请求
    Shop_seller_API().then(res => {
      this.data = res.data.data;
      // console.log(this.data);
      //送达时间
      this.deliveryTime = this.data.deliveryTime;
      //评分
      this.storevalue = this.data.score;
    });
    //发送店铺评价接口
    Shop_ratings_API().then(res => {
      this.all_count = res.data.data.length;
      this.arr = res.data.data;
      // console.log(this.arr);

      //满意人数
      this.yes_order = this.arr.filter(obj => obj.rateType == 0).length;
      //新数组默认等于渲染的老数组
      this.contentarr = this.arr;
    });
  }
};
</script>

<style lang="scss" scoped>
$base: #f4f5f7;
// 白色
.ccc_class {
  color: #ccc;
}
// 激活样式
.click_active {
  color: green;
  border-color: green;
}
#eval {
  background: $base;
  .eval_count {
    .service_title {
      .send_time {
        text-indent: -60px;
      }
    }
  }
  .grade {
    display: flex;
    justify-content: space-around;
    background: white;
    height: 100px;
  }
  .eval_desc {
    background: white;
    margin-top: 20px;
    padding: 0 30px;
    .satisfaction {
      width: 100%;
      height: 80px;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .inform_btn {
        margin-right: 5px;
      }
    }
    .content_desc {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #ccc;
      p {
        margin-left: 5px;
        color: #ccc;
      }
    }
    .eval_desces {
      background: white;
      border-bottom: 1px solid #ccc;
      padding: 5px 0;
      display: flex;
      align-items: flex-start;
      .eval_desces_right {
        flex: 1;
        .store {
          display: flex;
          justify-content: space-between;
        }
        .like_count {
          display: flex;
          align-items: center;
          .text_tag {
            display: block;
            width: 30px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 2px;
          }
        }
      }
    }
  }
}
</style>
