<template>
  <div>
    <form @submit.prevent="tryAddTask">
      <div>
        <label for="title">Заголовок:</label>
        <input type="text" v-model="model.title" id="title" required />
      </div>
      <div>
        <label for="description">Описание:</label>
        <textarea v-model="model.description" id="description" required></textarea>
      </div>
      <div>
        <label for="deadline">Дедлайн:</label>
        <input type="date" v-model="model.deadline" id="deadline" required />
      </div>
      <div>
        <label for="taskStatus">Статус задачи:</label>
        <input type="text" v-model="model.taskStatus" id="taskStatus" required />
      </div>
      <div>
        <label for="assignedUser">Исполнитель:</label>
        <input type="text" v-model="model.assignedUser.username" id="assignedUser" required />
      </div>
      <button type="submit">Добавить задачу</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { ApiAddress } from "@/common.ts";

export default {
  name: 'task-manager',
  data() {
    return {
      model: {
        taskId: 0,
        title: '',
        description: '',
        deadline: '',
        taskStatus: '',
        assignedUser: {
          id: 0,
          username: '',
          password: ''
        }
      }
    }
  },
  methods: {
    async tryAddTask() {
      try {
        const response = await axios.post(`${ApiAddress}/task-manager`, this.model);
        if (response.status === 200) {
          localStorage.setItem("taskId", response.data.taskId);
          this.$router.push('/task-manager');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
/* ваши стили */
</style>
