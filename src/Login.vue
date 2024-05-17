<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <b-card title="Авторизация" class="w-25">
      <b-form @submit.prevent="tryLogin">
        <b-form-group label="Имя пользователя/Email адрес">
          <b-form-input
              name="Email"
              placeholder="UserName/Email"
              v-model="model.email"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Пароль">
          <b-form-input
              type="password"
              placeholder="Введите пароль"
              name="Password"
              v-model="model.password"
          ></b-form-input>
        </b-form-group>

        <b-form-checkbox v-model="model.rememberMe">Запомнить меня</b-form-checkbox>

        <b-button type="submit" variant="primary" class="mt-3 w-100" block>Login</b-button>
        <router-link class="register-link"  to="/login">Register</router-link>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import { ApiAddress } from "@/common.ts";

export default {
  name: 'LoginForm',
  data() {
    return {
      model: {
        email: '',
        password: '',
        rememberMe: false
      }
    };
  },
  methods: {
    async tryLogin() {
      try {
        const response = await axios.post(`${ApiAddress}/login`, this.model);
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.accessToken);
          this.$router.push('/home'); // Перенаправление на главную страницу после успешного логина
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.vh-100 {
  height: 100vh;
}
.register-link{
  text-decoration: none;
  display: flex;
  margin-top: 5px;
  text-align: right;
}
</style>
