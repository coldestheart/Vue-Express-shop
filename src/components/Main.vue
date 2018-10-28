<template>
  <div class="container">
    <div class="content">
  <slider></slider>
  <product-list></product-list>
    </div>
  </div>
</template>

<script>
import ProductList from './products/ProdList.vue'
import Slider from './Slider'
export default {
  name: 'home',
  data () {
    return {
      swiperOption: {
        speed: 600,
        parallax: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  components: {
    'product-list': ProductList,
    'slider': Slider
  }
}
</script>
