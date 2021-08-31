<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" />
      <span>全选</span>
    </div>

    <div class="total-price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate">
      去计算: ({{checkLength}})
    </div>
  </div>
</template>
<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import {mapGetters} from 'vuex'
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
        return this.cartList.filter(item => item.checked ).length
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
