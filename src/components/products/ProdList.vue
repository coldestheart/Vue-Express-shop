<template>
  <div id="wrapper" class="wrapper">
    <template v-for="product in products">
      <product-item :product="product" :key="product.id"></product-item>
    </template>
  </div>
</template>

<script>
import ProductItem from './ProdItem.vue'
export default {
  name: 'product-list',
  created () {
    if (this.products.length === 0) {
      this.$store.dispatch('allProducts')
    }
  },
  computed: {
    products () {
      return this.$store.getters.allProducts
    }
  },
  data () {
    return {
    }
  },
  components: {
    'product-item': ProductItem
  }
}
</script>
<style lang="css">
  @import '../../assets/css/productanimate.css';
  @import '../../assets/css/productcard.css';
</style>
