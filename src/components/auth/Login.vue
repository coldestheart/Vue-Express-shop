<template>
  <div>
    <form class="login" @submit.prevent="login">
<!--      <h1>Sign in</h1>
      <label>User</label>
      <input required v-model="username" type="username" placeholder="Name"/>
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password"/>
      <hr/>-->
      <i class="icon-users head"></i>
      <span class="input input--manami">
        <input required v-model="username" class="input__field input__field--manami" type="text"/>
        <label class="input__label input__label--manami">
          <span class="input__label-content input__label-content--manami"><i class="icon-login dee"></i> ИМЯ ПОЛЬЗОВАТЕЛЯ</span>
        </label>
      </span>
      <span class="input input--manami">
        <input required v-model="password" class="input__field input__field--manami" type="password"/>
        <label class="input__label input__label--manami">
          <span class="input__label-content input__label-content--manami"><i class="icon-lock"></i> ПАРОЛЬ</span>
        </label>
      </span>
      <div><router-link :to="{ name: 'Main' }" ><i class="icon-shop"></i> Регистрация</router-link> | <router-link :to="{ name: 'Main' }" ><i class="icon-lock-open"></i> Забыли пароль?</router-link></div>
      <button class="button button--aylen button--round-l button--text-thick" type="submit">ВХОД</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      let username = this.username
      let password = this.password
      this.$store.dispatch('login', { username, password })
        .then(() => this.$parent.showPopup())
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss">
  @import '../../assets/css/input.css';
</style>
