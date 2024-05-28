<template>
  <div class="register-page d-flex justify-content-center align-items-center vh-100">
    <b-card class="register-card w-25">
      <div class="register-text text-center">
        <b-card-title>Регистрация</b-card-title>
      </div>
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Имя пользователя">
          <b-form-input
              name="Email"
              placeholder="UserName"
              :rules="{required: true, userName: true}"
              v-model="model.userName"
          ></b-form-input>
        </b-form-group>
  
        <b-form-group label="Пароль">
          <b-form-input
              type="password"
              placeholder="Введите пароль"
              name="Password"
              :rules="{required:true, min: 5, verify_password: true}"
              v-model="model.password"
          ></b-form-input>
        </b-form-group>
  
        <b-form-group label="Повторите пароль">
          <b-form-input
              type="password"
              placeholder="Повторите пароль"
              name="Confirm Password"
              :rules="{required:true, min: 3, confirmPassword: model.password !== model.confirmPassword }"
              v-model="model.confirmPassword"
          ></b-form-input>
        </b-form-group>
        
        <div class="d-flex justify-content-between justify-content-center ">
          <b-button class="registerButton w-30" block type="submit">Register</b-button>
          <router-link to="/login" class="login-link">To Login</router-link>
        </div>
        
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import {ApiAddress} from "@/common.ts";
export default {
  name: 'RegisterForm',
  data() {
    return {
      model: {
        userName: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    onSubmit() {
      axios.post(ApiAddress + 'Account/RegisterModel', {
        userName: this.model.userName,
        password: this.model.password,
        confirmPassword: this.model.confirmPassword
      })
          .then(response => {
            localStorage.removeItem("accessToken");
            window.location = `${window.location.protocol}//${window.location.hostname}/login`;
            this.$toast.add({severity:'success', summary: 'Успех', detail: 'Вы успешно зарегистрировались', life: 3000});
            console.log(response.data);
          })
          .catch(error => {
            this.$toast.add({severity:'error', summary: 'Ошибка', detail: 'Не удалось создать аккаунт', life: 3000});
            console.error(error);
          });
    }
  }
}


</script>

<style scoped>
.register-page{
  background-color: #355957;
}
.vh-100 {
  height: 100vh;
}
.login-link{
  color: #355957;
  text-decoration: none;
  display: flex;
  margin-top: 5px;
  text-align: right;
}
.register-card{
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  font-family: Natural Mono Alt Regular;
}
.registerButton{
  background-color: #355957;
  border-radius: 10px;
}
</style>
