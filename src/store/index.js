import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//实例化Vuex.Store--创建一个vuex的store（仓库），保存需要传递的交互数据
const store = new Vuex.Store({
  //store核心属性
  //state--存放所有交互数据
  state: {
    //所有交互数据都保存在仓库的state中
    //后台获取的数组
    goodsList: [],
    //点击单个图片出现的某个商品详细信息
    imgarr: [],
    //购物车的商品列表数组
    shoparr: [],
  },
  //mutations--改变，它是改变state值的唯一方式
  mutations: {
    //   函数名称（state）--传入state
    goodsList(state, val) {
      state.goodsList = val;
    },
    //获取购物车的数目和每一个商品的id--obj:一个对象，获取点击加减传过来的两个参数{val:val,id:id}
    changenum(state, obj) {
      for (let changes of state.goodsList) {
        for (let res of changes.foods) {
          if (res.id == obj.id) {
            res.num += obj.val; //通过点击改变购物车显示的值
            return; //满足条件就退出双重for循环
          }
        }
      }
    },
    //跳转时保存当前id的所有信息
    hashchange(state, val) {
      for (let changes of state.goodsList) {
        for (let res of changes.foods) {
          if (res.id == val) {
            state.imgarr.push(res);
            //循环定义的数组，保证数组中只出现当前商品的信息
            for (let obj = 0; obj < state.imgarr.length; obj++) {
              if (state.imgarr.length > 1) {
                state.imgarr.splice(0, 1);
              }
            }
          }
        }
      }
    },
    //跳转页面之后添加到购物车
    addshopcar(state, obj) {
      //obj:接受传递过来的参数：{id:id,val:1}
      for (let changes of state.goodsList) {
        for (let res of changes.foods) {
          if (res.id == obj.id) {
            res.num += obj.val; //通过点击改变购物车显示的值
            return; //满足条件就退出双重for循环
          }
        }
      }
    },
  },
  //vuex的计算属性
  getters: {
    //   函数名称（state）--传入state
    //购物车中数量大于1的计算属性
    receivenum(state) {
      let arr = [];
      for (let add of state.goodsList) {
        for (let res of add.foods) {
          if (res.num > 0) {
            arr.push(res);
          }
        }
      }
      return arr;
    },
  },
});
// store.commit("goodsList");
// console.log(store.state.goodsList);
//暴露定义的store
export default store;
