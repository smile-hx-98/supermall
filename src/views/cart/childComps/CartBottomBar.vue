<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick" />
      <span>全选</span>
    </div>

    <div class="total-price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算: ({{checkLength}})
    </div>
  </div>
</template>
<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.cartList.length === 0) return false //不管第几种方案，这个判断是必须的
        //第一种方案
        return !this.cartList.find(item => !item.checked)
        //第二种方案：
        // return !(this.cartList.filter(item => !item.checked).length)
        //第三种方案：
        // for (let item of this.cartList) {
        //   if(!item.checked) {
        //     return false
        //   }
        // }
        // return true
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) { //全部选中
          this.cartList.forEach(item => item.checked = false)
        } else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if(!this.isSelectAll) {
          this.$toast.show('请选择购买的商品', 500)
        }
      }
    }
  }

</script>
<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    line-height: 40px;
    display: flex;
    font-size: 14px;
  }

  .check-content {
    display: flex;
    align-items: center;
    width: 80px;
  }

  .check-button {
    width: 22px;
    height: 22px;
    line-height: 22px;
    margin-left: 5px;
    margin-right: 8px;
  }

  .total-price {
    margin-left: 20px;
    flex: 1
  }

  .calculate {
    width: 90px;
    color: #fff;
    background-color: pink;
    text-align: center;
  }

</style>
