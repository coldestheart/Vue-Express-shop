<template>
  <form @submit.prevent="saveProduct">
    <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
      <div class="form-group">
        <label>Name</label>
        <input type="text" placeholder="Name" v-model="name" name="name" class="form-control" />
      </div>
      <div class="form-group">
        <label>Price</label>
        <input type="number" placeholder="Price" v-model="price" name="price" class="form-control" />
      </div>
    </div>

    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <div class="form-group">
        <label>Image</label>
        <input type="text" lass="form-control" placeholder="Image" v-model="image" name="image" class="form-control" />
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea placeholder="Description" rows="5" v-model="description" name="description" class="form-control"></textarea>
      </div>
      <div class="form-group new-button">
        <button class="app_post_btn" @click="updatePost">Update</button>
      </div>
    </div>
  </form>
</template>

<script>
import PostsService from '@/components/api/posting'
export default {
  name: 'Edit',
  data () {
    return {
      name: '',
      description: ''
    }
  },
  mounted () {
    this.getPost()
  },
  methods: {
    async getPost () {
      const response = await PostsService.getPost({
        id: this.$route.params.id
      })
      this.name = response.data.name
      this.description = response.data.description
      this.price = response.data.price
      this.image = response.data.image
    },
    async updatePost () {
      await PostsService.updatePost({
        id: this.$route.params.id,
        name: this.name,
        description: this.description,
        price: this.price,
        image: this.image
      })
      this.$router.push({ name: 'Products' })
    }
  }
}
</script>
<style type="text/css">
  .form input, .form textarea {
    width: 500px;
    padding: 10px;
    border: 1px solid #e0dede;
    outline: none;
    font-size: 12px;
  }
  .form div {
    margin: 20px;
  }
  .app_post_btn {
    background: #4d7ef7;
    color: #fff;
    padding: 10px 80px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    width: 520px;
    border: none;
    cursor: pointer;
  }
</style>
