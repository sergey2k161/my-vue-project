<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <b-card title="Регистрация" class="w-25">
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Имя пользователя/Email адрес">
          <b-form-input
              name="Email"
              placeholder="UserName/Email"
              :rules="{required: true, email: true}"
              v-model="model.email"
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
              :rules="{required:true, min: 3, passconfirmed: model.password !== model.confirmPassword }"
              v-model="model.confirmPassword"
          ></b-form-input>
        </b-form-group>
  
        <b-button variant="primary" class="mt-3 w-100" block type="submit">Register</b-button>
        
        <router-link to="/login" class="login-link">To Login</router-link>
        
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from "axios"
import { ApiAddress } from "@/common.ts"

export default {
  name: 'RegisterForm',
  data() {
    return {
      model: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      selected: 'Email',
      options: [
        { text: 'Email', value: 'email' }
      ]
    }
  },
  methods: {
    onSubmit() {
      axios.post(`${ApiAddress}Account/RegisterModel`, {
        email: this.model.email,
        password: this.model.password,
        confirmPassword: this.model.confirmPassword
      })
          .then(response => {
            localStorage.removeItem("accessToken");
            window.location = `${window.location.protocol}//${window.location.hostname}/#/login`;
            this.$toast.add({severity:'success', summary: 'Успех', detail: 'Вы успешно зарегистрировались', life: 3000});
            console.log(response.data);
          })
          .catch(error => {
            this.$toast.add({severity:'error', summary: 'Ошибка', detail: 'Не удалось создать аккаунт', life: 3000});
            console.log(error);
          });
    }
  }
}
</script>

<style scoped>
.vh-100 {
  height: 100vh;
}
.login-link{
  text-decoration: none;
  display: flex;
  margin-top: 5px;
  text-align: right;
}
</style>
