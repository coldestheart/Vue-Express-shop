<template>
  <div>
    <div class="title">
      <h1><i class="fa fa-braille"></i>В продаже</h1>
    </div>
    <product-list></product-list>
  </div>
</template>

<script>
import ProductList from './products/ProdList.vue'
export default {
  name: 'home',
  components: {
    'product-list': ProductList
  }
}
</script>
