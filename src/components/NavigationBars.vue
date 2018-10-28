<template>
  <div>
    <div id="mainmenu" class="mainmenu">
      <nav class="menu--esc">
    <div class="mainmenu__item">
      <a class="menu__item" href="#">
        <span class="menu__item-name"><a v-on:click="this.$router.push('Main')" href="/" > Главная </a></span>
    </a>
    </div>
    <div class="mainmenu__item">
      <a v-on:click="showPopup('register')" class="menu__item" href="#">
          <span class="menu__item-name"> Регистрация </span>
        </a>
    </div>
      <div v-if="!isLoggedIn" class="mainmenu__item">
        <a v-on:click="showPopup('login')" class="menu__item" href="#">
          <span class="menu__item-name"> Авторизация </span>
        </a>
      </div>
      <div v-if="isLoggedIn" class="mainmenu__item">
          <a class="menu__item" href="#">
            <span class="menu__item-name"><a v-on:click="logout" href="/" > Выход </a></span>
          </a>
      </div>
      <div v-if="this.$store.state.role === 'admin' && isLoggedIn" class="mainmenu__item">
          <a class="menu__item" href="#">
            <span class="menu__item-name"><router-link to="/owner"> Управление </router-link></span>
          </a>
      </div>
        <div class="mainmenu__item">
          <a v-on:click="showPopup('cart')" class="menu__item" href="#">
            <span class="menu__item-name">Корзина</span><br>
            <span class="menu__item-label">В Корзине ({{cartItemsCount}}) объектов</span>
          </a>
        </div>
      </nav>
  </div>
  <div class="placefix">
    <div id="pureline" class="pureline"></div>
    <div id="menu-icon-wrapper" class="menu-icon-wrapper" style="visibility: hidden">
      <svg width="1000px" height="1000px">
        <path id="pathA" d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"></path>
        <path id="pathB" d="M 300 500 L 700 500"></path>
        <path id="pathC" d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"></path>
      </svg>
      <button id="menu-icon-trigger" class="menu-icon-trigger"></button>
    </div>
    <div id="frontmenu" class="frontmenu">
      <nav class="menu menu--esc">
        <a class="menu__item" href="#">
          <span class="menu__item-name">Главная</span>
          <div class="menu__item-label">Выбирайте только лучшее</div>
        </a>
        <a v-on:click="showPopup('cart')" class="menu__item" href="#">
          <span class="menu__item-name">Корзина</span>
          <span class="menu__item-label">В Корзине ({{cartItemsCount}}) объектов</span>
        </a>
      </nav>
    </div>
  </div>
    <div class="modal popup-effect" v-bind:class="{ show: isActive }" id="popup-effect">
      <h3>{{ Popupname }} <a v-on:click="showPopup(param)" href="#"><i class="icon-cross"></i></a></h3>
      <div class="modal-content">
        <cart class="scroll-hide" v-if="param === 'cart'"></cart>
        <login class="scroll-hide" v-if="param === 'login'" ><button type="submit">Вход</button></login>
        <register class="scroll-hide" v-if="param === 'register'" ></register>
      </div>
    </div>
    <div class="md-overlay"></div>
  </div>
</template>

<script>
import '../assets/effects/navigationmenu'
import Cart from './Cart'
import Login from './auth/Login'
import Register from './auth/Register'
export default {
  name: 'NavigationBars',
  data () {
    return {
      Popupname: '',
      isActive: false,
      param: '',
      cartItems: this.$store.state.cart
    }
  },
  computed: {
    isLoggedIn: function () { return this.$store.getters.isLoggedIn },
    cartItemsCount () {
      return this.cartItems.length
    },
    showLoader () {
      return this.$store.state.showLoader
    }
  },
  methods: {
    showPopup: function (param) {
      let placer = param
      if (param === placer) {
        this.isActive = !this.isActive
        this.param = placer
        switch (param) {
          case 'login':
            this.Popupname = 'Вход'
            break
          case 'register':
            this.Popupname = 'Регистрация'
            break
          case 'cart':
            this.Popupname = 'Корзина'
            break
          default:
            break
        }
      }
    },
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('Main')
        })
    }
  },
  components: {
    'Cart': Cart,
    'Login': Login,
    'Register': Register
  }
}

</script>
<style lang="css">
  @import '../assets/css/navigationmenu.css';
</style>
