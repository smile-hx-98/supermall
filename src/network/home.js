import {
  request
} from "./request";

//多增加一个层，可以对首页所有的url进行一个统一的管理
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// 函数调用 -> 压入函数栈(保存函数调用过程中所有变量)
// 函数调用结束 -> 弹出函数栈(释放函数所有的变量)
// function test() {
//   const names = ['why', 'aaa']
// }
//
// test()
//
// test()