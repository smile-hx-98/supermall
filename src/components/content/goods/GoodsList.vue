<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goods" :key="index" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'

  export default {
    name: 'GoodsList',
    props: {
      goods: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }

</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap; /*包裹：根据组件大小，决定一行显示几个*/
    justify-content: space-around;
    padding: 2px;
  }
</style>
