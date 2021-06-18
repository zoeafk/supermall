<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="home-nav">
      <div slot="middle">购物车({{cartCount}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <scroll class="content"
            :pull-up-load='true'
            ref="scroll">
      <cart-list :cartList='cartList'></cart-list>

    </scroll>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import CartBottomBar from './childcomps/CartBottomBar.vue'
import CartList from './childcomps/CartList.vue'
export default {
  name: 'Cart',

  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  computed: {
    cartList () {
      return this.$store.state.cartList
    },
    cartCount () {
      return this.$store.state.cartList.length
    }
  },
  activated () {
    this.$refs.scroll.Scroll.refresh()
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
.content {
  /* position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px; */
  height: calc(100% - 44px - 99px);
  overflow: hidden;
}
</style>