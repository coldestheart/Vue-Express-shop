<template>
  <div>
    <button v-if="isAdding" class="button button--esc button--round-l" @click="addToCart"><i class="icon-add_shopping_cart"></i></button>
    <button v-else class="button button--esc-red button--round-l" @click="removeFromCart(product._id)"><i class="icon-remove_shopping_cart"></i></button>
  </div>
</template>

<script>
import {
  ADD_TO_CART,
  REMOVE_FROM_CART
} from '../../assets/api/shop/mtypes'
export default {
  props: ['product'],
  data () {
    return {
      cart: this.$store.state.cart
    }
  },
  computed: {
    isAdding () {
      return this.cart.indexOf(this.product) < 0
    }
  },
  methods: {
    addToCart () {
      this.$store.commit(ADD_TO_CART, this.product)
    },
    removeFromCart (id) {
      this.$store.commit(REMOVE_FROM_CART, id)
    }
  }
}
</script>
