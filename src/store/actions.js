import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'
export default {
  addCart(context, payload) {
    //方法1：
    //payload新添加的商品
    // let oldProduct = null
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    //2.判断oldProduct
    // if (oldProduct) {
    //   oldProduct.count += 1
    // } else {
    //   payload.count = 1
    //   state.cartList.push(payload)
    // }
    //方法2：
    // let index = state.cartList.indexOf(payload)
    // if (index === -1) {
    //   let oldProduct = state.cartList[index]
    //   oldProduct.count += 1
    // } else {
    //   payload.count = 1
    //   state.cartList.push(payload)
    // }
    let oldProduct = context.state.cartList.find(item => item.iid == payload.iid)
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}
