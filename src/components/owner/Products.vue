<template>
  <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Имя</th>
        <th>Цена</th>
        <th>Производитель</th>
        <th>Редактировать</th>
        <th>Удалить</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" v-bind:key="product.id">
        <td>{{product.name}}</td>
        <td>{{product.price}}</td>
        <td>{{product.manufacturer}}</td>
        <td><router-link :to="'/owner/edit/'+product._id">Редактировать</router-link></td>
        <td><a v-on:click="deleteProduct(product._id)" >Удалить</a></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'products',
  data () {
    return {
    }
  },
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
  methods: {
    deleteProduct (id) {
      console.log(id)
      this.$store.dispatch('removeProduct', id)
      this.$store.getters.allProducts()
      this.$store.dispatch('allProducts')
    }
  }
}
</script>

<style type="text/css">
  .table-wrap {
    width: 60%;
    margin: 0 auto;
    text-align: center;
  }
  table th, table tr {
    text-align: left;
  }
  table thead {
    background: #f2f2f2;
  }
  table tr td {
    padding: 10px;
  }
  table tr:nth-child(odd) {
    background: #f2f2f2;
  }
  table tr:nth-child(1) {
    background: #4d7ef7;
    color: #fff;
  }
  a {
    color: #4d7ef7;
    text-decoration: none;
  }
  a.add_post_link {
    background: #4d7ef7;
    color: #fff;
    padding: 10px 80px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
  }
</style>
