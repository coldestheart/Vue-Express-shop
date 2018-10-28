<template>
  <div v-if="cart.length > 0">
    <div class="ifoundu" v-for="product in cart" v-bind:key="product.id">
      <product-details :product="product" :key="product.id"></product-details>
    </div>
  </div>
  <div v-else class="title"><i class="fa fa-superpowers"></i>Ваша корзина пуста, добавьте что-нибудь</div>
</template>

<script>
import ProductDetails from './products/ProdDetails'
export default {
  data () {
    return {
      cart: this.$store.state.cart
    }
  },
  components: {
    productDetails: ProductDetails
  }
}
</script>
<style lang="css">
  @import '../assets/css/cart.css';
</style>
