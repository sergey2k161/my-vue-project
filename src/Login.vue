<template>
  <div class="login-page d-flex justify-content-center align-items-center vh-100">
    <b-card class="login-card w-25">
      <div class="auht-text text-center">
        <b-card-title>Авторизация</b-card-title>
      </div>
      <b-form @submit.prevent="login">
        <b-form-group label="Имя пользователя">
          <b-form-input
              name="Email"
              placeholder="User Name"
              v-model="model.userName"
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

        <div class="d-flex justify-content-between justify-content-center ">
          <b-form-checkbox v-model="model.rememberMe">Запомнить меня</b-form-checkbox>
          <b-button type="submit" class="loginButton w-30" block>Login</b-button>
        </div>
        <router-link class="register-link"  to="/register">Register</router-link>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import {ApiAddress} from "@/common.ts";
export default {
  name: 'LoginForm',
  data() {
    return {
      model: {
        userName: '',
        password: '',
        rememberMe: false
      }
    };
  },
  methods: {
    login() {
      axios.post(ApiAddress + 'Account/LoginModel', {
        userName: this.model.userName,
        password: this.model.password,
        rememberMe: this.model.rememberMe
      })
          .then(response => {
            localStorage.removeItem("accessToken");
            // window.location = `http://localhost:8080/home`;
            this.$toast.add({severity: 'success', summary: 'Успех', detail: 'Вы авторизованны', life: 3000});
            console.log(response.data);
          })
          .catch(error => {
            this.$toast.add({severity: 'error', summary: 'Ошибка', detail: 'Не авторизоваться', life: 3000});
            console.log(error);
          });
    }

  }
};
</script>

<style scoped>
.vh-100 {
  height: 100vh;
}
.register-link{
  color: #355957;
  text-decoration: none;
  display: flex;
  margin-top: 5px;
  text-align: right;
}
.login-page{
  background-color: #355957;
}
.login-card{
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  font-family: Natural Mono Alt Regular;
}
.auht-text{
  color: black;
}
.loginButton{
  background-color: #355957;
  border-radius: 10px;
}
</style>
