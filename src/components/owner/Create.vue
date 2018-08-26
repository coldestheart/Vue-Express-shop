<template>
  <div class="posts">
    <h1>Добавить Продукт</h1>
    <div class="form">
      <div>
        <input type="text" name="name" placeholder="Название" v-model="name">
        <input type="number" min="0" name="price" placeholder="Цена" v-model="price">
      </div>
      <div>
        <input type="text" name="price" placeholder="URL IMG" v-model="image">
      </div>
      <div>
        <textarea rows="15" cols="15" placeholder="Описание" v-model="description"></textarea>
      </div>
      <div>
        <button class="app_post_btn" @click="addPost">Добавить</button>
      </div>
    </div>
  </div>
</template>

<script>
import PostsService from '@/components/api/posting'
export default {
  name: 'NewPost',
  methods: {
    async addPost () {
      await PostsService.addPost({
        name: this.name,
        price: this.price,
        image: this.image,
        description: this.description,
        manufacturer: this.manufacturer
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
