<template>
  <div class="home-page vh-100">
    <!-- HEADER -->
    <div>
      <b-nav>
        <b-nav-item disabled>Shelehov</b-nav-item>
        <b-nav-item :to="{ path: '/task-manager' }">Task Manager</b-nav-item>
        <b-nav-item :to="{ path: '/async-Metod-Email' }">async Metod Email</b-nav-item>
        <b-nav-item :to="{ path: '/async-Metod-Files' }">async Metods Files</b-nav-item>
      </b-nav>
    </div>
    <!-- CARD -->
    <div class="d-flex justify-content-center mt-5">
      <b-card
          title="Привет!"
          img-src="https://i.gifer.com/Mhw4.gif"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
      >
        <b-card-text>
          USER: {{ currentUser }}
        </b-card-text>

        <b-button href="https://github.com/sergey2k161/SecondAssignment" variant="dark" class="github-button">
          <img src="https://www.freeiconspng.com/thumbs/github-icon/github-icon-9.png" alt="GitHub" class="github-icon">
          GitHub
        </b-button>
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
</style>