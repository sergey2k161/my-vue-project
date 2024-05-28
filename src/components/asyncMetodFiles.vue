<template>
<!--  <div>-->
<!--    <input type="file" ref="fileInput">-->
<!--    <br>-->
<!--    <b-button variant="primary" @click="sendFiles">Отправить</b-button>-->
<!--  </div>-->
  <div class="asyncFiles-page d-flex justify-content-center align-items-center vh-100">
    <b-card class="asyncFiles-card w-25">
      <div class="asyncFiles-text text-center">
        <b-card-title>Отправка файлов на сервер</b-card-title>
      </div>
      <b-form-group label="Выберете файл">
        <input type="file" ref="fileInput">
      </b-form-group>
      <div class="d-flex justify-content-between justify-content-center ">
        <b-button @click="sendFiles" class="asyncFiles-buttun w-30">Отправить</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import { ApiAddress } from "@/common.ts";
export default {
  name: 'async-Metod-Files',
  data(){
    return {
      model: {
        file: File
      }
    }
  },
  methods: {
    async sendFiles() {
      try{
        const file = this.$refs.fileInput.files[0];
        let formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(ApiAddress + `upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data);
      }catch (error){
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.asyncFiles-page{
  background-color: #355957;
}
.asyncFiles-card{
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  font-family: Natural Mono Alt Regular;
}
.asyncFiles-buttun{
  background-color: #355957;
  border-radius: 10px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
}
</style>
