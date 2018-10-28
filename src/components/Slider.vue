<template>
  <div class="slider-init" id="slider-init" style="">
    <nav class="nav-circleslide">
      <a class="prev" v-on:click="slidePre">
        <span class="icon-wrap"><i class="icon icon-navigate_before"></i></span>
        <div><img :src="prevPage"></div>
      </a>
      <a class="next" v-on:click="slideNext">
        <span class="icon-wrap"><i class="icon icon-navigate_next"></i></span>
        <div><img :src="nextPage"></div>
      </a>
    </nav>
    <slider ref="slider" :options="options" @slide='slide' @tap='onTap' @init='onInit'>
      <slideritem v-for="(item,index) in someList" :key="index" :style="item.style"><h3>{{item.h3}}</h3>
      <h4>{{item.h4}}</h4></slideritem>
      <div slot="loading">ЗАГРУЗКА</div>
    </slider>
  </div>
</template>
<script>
import slider from './slider/slider'
import slideritem from './slider/slider_item'
export default {
  data () {
    return {
      someList: [],
      prevPage: 0,
      nextPage: 0,
      options: {
        currentPage: 0,
        thresholdDistance: 500,
        thresholdTime: 100,
        autoplay: 4000,
        loop: true,
        direction: 'mixed',
        loopedSlides: 1,
        slidesToScroll: 1,
        timingFunction: 'ease',
        speed: 700
      }
    }
  },
  computed: {
  },
  components: {
    slider,
    slideritem
  },
  mounted () {
    let that = this
    setTimeout(function () {
      that.someList = [
        {
          h3: 'Добро пожаловать в Experts Skin Care',
          h4: 'Красота и здоровье наша профессия',
          uri: '../../../static/assets/img/1.jpg',
          style: {
            'background-image': 'url(../../../static/assets/img/1.jpg)',
            'background-size': 'cover'
          }
        },
        {
          h3: 'Добро пожаловать в Experts Skin Care',
          h4: 'Красота и здоровье наша профессия',
          uri: '../../../static/assets/img/2.jpg',
          style: {
            'background-image': 'url(../../../static/assets/img/2.jpg)',
            'background-size': 'cover'
          }
        },
        {
          h3: 'Добро пожаловать в Experts Skin Care',
          h4: 'Красота и здоровье наша профессия',
          uri: '../../../static/assets/img/3.jpg',
          style: {
            'background-image': 'url(../../../static/assets/img/3.jpg)',
            'background-size': 'cover'
          }
        },
        {
          h3: 'Добро пожаловать в Experts Skin Care',
          h4: 'Красота и здоровье наша профессия',
          uri: '../../../static/assets/img/4.jpg',
          style: {
            'background-image': 'url(../../../static/assets/img/4.jpg)',
            'background-size': 'cover'
          }
        },
        {
          h3: 'Добро пожаловать в Experts Skin Care',
          h4: 'Красота и здоровье наша профессия',
          uri: '../../../static/assets/img/5.jpg',
          style: {
            'background-image': 'url(../../../static/assets/img/5.jpg)',
            'background-size': 'cover'
          }
        }
      ]
    }, 1000)
  },
  methods: {
    // event Listener
    slide (data) {
      this.prevPage = data.prevPage
      this.nextPage = data.nextPage
    },
    onTap (data) {
      console.log(data)
    },
    onInit (data) {
      console.log(data)
    },
    slideNext () {
      this.$refs.slider.$emit('slideNext')
    },
    slidePre () {
      this.$refs.slider.$emit('slidePre')
    }
  }
}
</script>
<style scoped lang="scss">
  @import '../assets/css/slider.css';
</style>
