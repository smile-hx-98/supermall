<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- 属性：topImages 传入值：top-images -->
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addToCart="addToCart" />
    <!-- <toast :message="message" :show="show" /> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  // import Toast from 'components/common/toast/Toast'

  import {
    getDetail,
    Goods,
    Shop,
    GoodsParam,
    getRecommend
  } from 'network/detail'
  // import {debounce} from 'common/utils'
  import {
    itemListenerMixin,
    backTopMixin
  } from 'common/mixin'

  import {
    mapActions
  } from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      // Toast
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex: 0,
        // message: '',
        // show: false
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res)
        //2.1获取顶部的展示图片
        const data = res.result
        this.topImages = data.itemInfo.topImages
        //2.2获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //2.3创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        //2.4保存商品的详情数据
        this.detailInfo = data.detailInfo;
        //2.5获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //2.6获取评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
        //1.第一次获取，值不对
        //值不对的原因：this.$refs.params.$el压根没有渲染
        // this.themeTopYs = []
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs)

        // //2.第二次获取，值不对
        // //值不对的原因：offsetTop值不对的时候，都是因为图片依然没有加载完
        // this.$nextTick(() => {
        //   //根据最新的数据，对应的DOM是已经被渲染出来了
        //   //但是图片依然没有加载完（目前获取到的offsetTop不包含其中的图片）
        //   //offsetTop值不对的时候，都是因为图片的问题
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTopYs)
        // })
      })

      getRecommend().then(res => {
        // console.log(res)
        this.recommends = res.data.list
      })

      //给getThemeTopY赋值（对this.themeTopY赋值的操作进行防抖）
      // this.getThemeTopY = debounce(() => {
      //     this.themeTopYs = []
      //     this.themeTopYs.push(0)
      //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //     console.log(this.themeTopYs)
      // }, 100)

    },
    mounted() {
      // let newRefresh = debounce(this.$refs.scroll.refresh, 100)
      // this.itemImgListener = () => {
      //   newRefresh()
      // }
      // this.$bus.$on('itemImageLoad', this.itemImgListener)
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh()
        // this.newRefresh()
        // this.getThemeTopY()//防抖操作
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs)
      },
      titleClick(index) {
        // console.log(index)
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },
      contentScroll(position) {
        // console.log(position)
        //1.获取Y值
        const positionY = -position.y
        //2.positionY和主题中的值进行对比 [0, 2901, 4322, 4517]
        // positionY在0和2901 之间 index = 0
        // positionY在2901和4322 之间 index = 1
        // positionY在4322和4517 之间 index = 2
        // positionY在超过4517 index = 3
        let length = this.themeTopYs.length
        for (let i = 0; i < length - 1; i++) {
          //不可以实现
          // if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
          //   console.log(i)
          // }
          //可以实现
          // if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this
          //       .themeTopYs[i + 1]) ||
          //     (i === length - 1 && positionY >= this.themeTopYs[i]))) {
          //   this.currentIndex = i;
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }
          //更简洁的写法
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        //1.判断BackTop是否显示
        this.isShowBackTop = -position.y > 1000
        //2.决定tabControl是否吸顶(position:fixed)
        this.isTabFixed = -position.y > this.tabOffsetTop
      },
      addToCart() {
        // console.log('---')
        //1.获取购物车需要展示的商品信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        // product.count = 0
        //2.将商品加入到购物车中(1. Promise)
        // this.$store.commit('addCart', product)
        this.addCart(product).then(res => {
          // this.show = true
          // this.message = res
          // setTimeout(() => {
          //   this.show = false
          //   this.message = ''
          // }, 1000);
          this.$toast.show(res, 500)
        })

        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res)
        // })

        //3.添加到购物车成功

      }
    }
  }

</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 51px);
  }

</style>
