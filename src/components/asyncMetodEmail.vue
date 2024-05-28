<template>
  <div class="asyncEmail-page d-flex justify-content-center align-items-center vh-100">
    <b-card class="asyncEmail-card w-25">
      <div class="asyncEmail-text text-center">
        <b-card-title>Отправка сообщения на вашу почту</b-card-title>
      </div>
      <b-form @submit.prevent="sendEmail">
        <b-form-group label="Ваш Email">
          <b-form-input
              name="Email"
              placeholder="Email"
              v-model="model.email"
          ></b-form-input>  
        </b-form-group>

        <b-form-group label="Тема">
          <b-form-input
              name="Subject"
              placeholder="Введите тему письма"
              v-model="model.subject"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Сообщение">
          <b-form-textarea
              name="Message"
              placeholder="Ваше сообщение"
              v-model="model.message"
              rows="3" 
              max-rows="10"
          ></b-form-textarea>
        </b-form-group>

        <div class="d-flex justify-content-between justify-content-center ">
          <b-button @click="sendEmail" class="asyncEmail-buttun w-30" block>Отправить</b-button>
        </div>
        
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import { ApiAddress } from "@/common.ts";
export default {
  name: 'async-Metod-Email',
  data(){
    return {
      isSendEmailModal: false,
      model: {
        email: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    async sendEmail() {
      try{
        const response = await axios.post(ApiAddress + `send`,{
          email: this.model.email,
          subject: this.model.subject,
          message: this.model.message
        });
        console.log(response.data);
        this.isSendEmailModal = false;
      }catch (error){
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.asyncEmail-page{
  background-color: #355957;
}
.asyncEmail-card{
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  font-family: Natural Mono Alt Regular;
}
.asyncEmail-buttun{
  background-color: #355957;
  border-radius: 10px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
}
</style>