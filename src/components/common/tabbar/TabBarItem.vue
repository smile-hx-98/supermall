<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
    <!-- <img src="assets/img/tabbar/home.svg">
    <div>首页</div> -->
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props: {
      path: String,
      activeColor: {
        types: String,
        default: 'pink'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        // console.log('itemClick')
        // this.$router.push()  //使用push时，浏览器的返回有作用，使用replace时，浏览器的返回没有作用
        this.$router.replace(this.path)
      }
    }
  }

</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    /*tabbar的高度一般都是49px*/
    font-family: 14px;
  }

  .tab-bar-item img {
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;
    /*去掉img默认的3px*/
    margin-bottom: 2px;
  }

</style>
