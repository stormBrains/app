import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//实例化Vuex.Store--创建一个vuex的store（仓库），保存需要传递的交互数据
const store = new Vuex.Store({
  //store核心属性
  //state--存放所有交互数据
  state: {
    //所有交互数据都保存在仓库的state中
    count: 0,
    data: [], //数据类型
    arrobj: [
      //通过计算属性获取名字为张三的数组
      { name: "张三", age: 18 },
      { name: "张强", age: 18 },
      { name: "张三丰", age: 18 },
      { name: "李一刀", age: 18 },
    ],
  },
  //mutations--改变，它是改变state值的唯一方式
  mutations: {
    //   函数名称（）--传入state
    increment(state) {
      state.count++; //state.count++
    },
    changearr(state, val) {
      //往数组内传参
      state.data.push(val);
    },
    //改变state内count的值
    changecount(state, val) {
      state.count = val;
    },
  },
  //vuex的计算属性
  getters: {
    getobj(state) {
      return state.arrobj.filter((res) => res.name.includes("张"));
    },
  },
});

// console.log(store.state.count); //打印state中的count--0
//调用mutations内的函数
store.commit("increment"); //相当于increment()--调用函数
// console.log(store.state.count); //调用函数之后的新的值--1

//往state的arr数组中添加新的对象
store.commit("changearr", [1, 2, 3]);
//  console.log(store.state.data);

//获取计算属性
// console.log(store.getters.getobj);

//暴露定义的store
export default store;
