<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list class="cart-list"></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import NavBar from 'components/common/navbar/NavBar'

  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'Cart',
    components: {
      CartList,
      CartBottomBar,
      NavBar
    },
    computed: {
      // cartLength() {
      //   return this.$store.getters.cartLength()
      // }
      //两种语法，第一种：
      // ...mapGetters(['cartLength'], ['cartList'])
      //第二种：起别名
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }

</script>
<style scoped>
  #cart {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }

</style>
