<template>
  <div id="app">
    <preload class="intro" v-bind:class="{ hidden: !intro }"></preload>
      <div class="pattern pattern-hidden" ></div>
      <navigation-bars></navigation-bars>
    <router-view class="wrap" v-bind:class="{ back: intro }"></router-view>
  </div>
</template>
<script>
import toastr from 'toastr'
import { ERROR_MSG,
  ADD_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_SUCCESS
} from './assets/api/shop/mtypes'
import NavigationBars from './components/NavigationBars'
import Preloader from './components/Preloader'
export default {
  name: 'app',
  components: {
    'navigation-bars': NavigationBars,
    'preload': Preloader
  },
  data () {
    return {
      intro: true
    }
  },
  created () {
    this.$store.subscribe((mutation) => {
      if (mutation.payload) {
        switch (mutation.type) {
          case ERROR_MSG:
            toastr.error(mutation.payload.content, mutation.payload.title)
            break
          case ADD_PRODUCT_SUCCESS:
            toastr.success('Продукт успешно добавлен', 'Success!')
            break
          case UPDATE_PRODUCT_SUCCESS:
            toastr.success('Данные обновлены.', 'Updated!')
            break
          case REMOVE_PRODUCT_SUCCESS:
            toastr.warning('Продукт удален.', 'Deleted!')
            break
        }
      }
    })
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
    showLoader () {
      return this.$store.state.showLoader
    }
  },
  mounted () {
    let that = this
    setTimeout(function () { that.intro = false }, 3000)
  }
}
</script>
<style lang="scss">
  @import 'assets/css/normalize.css';
  @import 'assets/css/buttons.css';
  @import 'assets/css/fonts.css';
</style>
