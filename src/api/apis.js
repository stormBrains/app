import axios from "axios";
// 添加服务器地址--后端数据库地址 IP+端口
const API = " http://192.168.43.175:5000/";
axios.defaults.baseURL = API;

//暴露定义的LOGIN_API接口:1.获取商品详情  --get方法
export const Goods_list_API = () =>
  axios.get("/goods/goods_list", { params: {} });

//暴露定义的LOGIN_ADD接口：2.获取商家  --get方法
export const Shop_seller_API = () => axios.get("/shop/seller", { params: {} });

//  3.获取评价数据
export const Shop_ratings_API = () =>
  axios.get("/shop/ratings", {
    params: {},
  });
