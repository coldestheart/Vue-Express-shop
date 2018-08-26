<template>
  <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
        <th>ID</th>
        <th>Manufacturer</th>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" v-bind:key="product.id">
        <td>{{product.name}}</td>
        <td>{{product.price}}</td>
        <td>{{product.description}}</td>
        <router-link v-bind:to="{ name: 'Edit', params: { id: product._id } }">Edit</router-link>
        <td><a href="#" @click="deletePost(product._id)">Del</a></td>
        <td width="500px" class="">{{product._id}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PostsService from '@/components/api/posting'

export default {
  name: 'products',
  data () {
    return {
      products: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.products = response.data
    },
    async deletePost (id) {
      await PostsService.deletePost(id)
      this.getPosts()
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
