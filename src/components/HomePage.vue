<template>
  <div class="home-page vh-100">
    <!-- HEADER -->
    <div class="home-page-header">
      <b-nav>
        <router-link class="name-page"  to="/home">Shelehov</router-link>
        <router-link class="page-lins"  to="/task-manager">Диспечер задач</router-link>
        <router-link class="page-lins"  to="/async-Metod-Email">Email</router-link>
        <router-link class="page-lins"  to="/async-Metod-Files">Files</router-link>
      </b-nav>
    </div>
    <div class="home-page-content d-flex justify-content-center align-items-center vh-100">
      <b-card class="git-navigation w-25">
        <div class="header-card-text text-center">
          <b-card-title>Привет!😉 Это домашняя страница скромного проекта.</b-card-title>
        </div>
        <hr class="divider">
        <div class="card-text">
          В шапке находятся все выполненные задания, а снизу можно найти ссылки Github репозитории.
        </div>
        <div class="git-linqs d-flex justify-content-between justify-content-center">
          <b-button href="https://github.com/sergey2k161/SecondAssignment" variant="dark" class="github-button">
            <img src="https://www.freeiconspng.com/thumbs/github-icon/github-icon-9.png" alt="GitHub" class="github-icon">
            Backend
          </b-button>
          <b-button href="https://github.com/sergey2k161/my-vue-project" variant="dark" class="github-button">
            <img src="https://www.freeiconspng.com/thumbs/github-icon/github-icon-9.png" alt="GitHub" class="github-icon">
            Frontend
          </b-button>
        </div>
      </b-card>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import {ApiAddress} from "@/common.ts";
export default {
  name: 'HomePage',
  data() {
    return {
      currentUser: ''
    }
  },
  mounted() {
    this.getCurrentUser();
  },
  methods: {
    async getCurrentUser() {
      try {
        const response = await axios.get(ApiAddress + "Account/CurrentUser", { withCredentials: true });
        this.currentUser = response.data;
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    }

  }

}
</script>

<style scoped>
.home-page{
  background-color: #355957;
}
.github-button {
  display: inline-flex;
  align-items: center;
  background-color: #24292e;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.github-button:hover {
  background-color: #2e3338;
}

.github-icon {
  width: 30px;
  height: 30px;
  margin-right: 0rem;
}
.home-page-header{
  background-color: #162625;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
}
.name-page{
  color: white;
  font-size: 30px;
  padding-left: 20px;
  padding-right: 100px;
  font-family: Natural Mono Alt Regular;
  text-decoration: none;
}
.page-lins{
  color: white;
  font-size: 18px;
  padding-right: 50px;
  padding-top: 8px;
  font-family: Natural Mono Alt Regular;
  text-decoration: none;
}
.git-linqs{
  padding-left: 10px;
  padding-right: 10px;
}
.home-page-content{
  font-family: Natural Mono Alt Regular;
}
.card-text{
  font-size: 20px;
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 30px;
}
</style>