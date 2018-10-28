<template>
  <div>
    <div v-if="!this.$store.state.token">
        <form class="login">
          <i class="icon-users head"></i>
          <p>К сожалению, в данный момент доступно только <a> Администратору </a></p>
        </form>
    </div>
  <row v-if="this.$store.state.token" class="justify-content-md-center">
    <col cols="6">
      <h2>Please Register</h2>
      <div v-if="errors && errors.length" v-bind:key="errors">
        <div v-for="error of errors" v-bind:key="error.id">
          <alert show>{{error.message}}</alert>
        </div>
      </div>
      <form @submit="onSubmit">
        <group id="fieldsetHorizontal"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      label="">
          <input id="username" placeholder="Имя пользователя" :state="state" v-model.trim="register.username">
          <select id="role" v-model.trim="register.role" >
            <option value="owner">Owner</option>
            <option value="admin">Admin</option>
            <option value="client">Client</option>
          </select>
        </group>
        <group id="fieldsetHorizontal"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      label="">
          <input type="password" id="password" placeholder="пароль" :state="state" v-model.trim="register.password">
          <input id="email" placeholder="email" :state="state" v-model.trim="register.email">
        </group>
        <button type="submit" variant="primary">Register</button>
        <button type="button" variant="success" @click="$router.go(-1)">Cancel</button>
      </form>
  </row>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Register',
  data () {
    return {
      register: {},
      errors: []
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://localhost:8081/register/`, this.register)
        .then(response => {
          alert('Пользователь Зарегистрирован')
          this.$parent.Showpopup()
        })
        .catch(e => {
          console.log(e)
          this.errors.push(e)
        })
    }
  }
}
</script>
<style lang="scss">
  @import '../../assets/css/input.css';
</style>
