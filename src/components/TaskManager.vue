<template>
  <div>
    <form @submit.prevent="tryAddTask">
      <div class="toDoList">
        <b-button variant="outline-dark" @click="toggleTaskList">Список задач</b-button>
        <b-button @click="isTaskModalVisible = true">+</b-button>
        <b-modal v-model="isTaskModalVisible" title="Создание задачи">
          <div>
            <label for="title">Название:</label>
            <input type="text" v-model="model.title" id="title" required />
          </div>
          <div>
            <label for="description">Описание:</label>
            <textarea v-model="model.description" id="description" required></textarea>
          </div>
          <div>
            <label for="deadline">Выполнить до:</label>
            <input type="date" v-model="model.deadline" id="deadline" required />
          </div>
          <div>
            <label for="taskStatus">Статус задачи:</label>
            <b-form-select v-model="model.taskStatus" :options="statusOptions" required></b-form-select>
          </div>
          <div>
            <label for="assignedUser">Исполнитель:</label>
            <b-form-select v-model="model.assignedUser.id" :options="userOptions" required></b-form-select>
          </div>
          <b-button @click="tryAddTask">Добавить задачу</b-button>
        </b-modal>
      </div>
    </form>

    <b-collapse v-model="isTaskListVisible" class="mt-3">
      <b-card>
        <ul class="list-group">
          <li v-for="task in tasks" :key="task.id" class="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{{ task.title }}</h5>
              <p>{{ task.description }}</p>
              <p><strong>Статус:</strong> {{ task.taskStatus }}</p>
              <p><strong>Дедлайн:</strong> {{ task.deadline }}</p>
              <p><strong>Исполнитель:</strong> {{ task.assignedUser.username }}</p>
            </div>
            <b-button variant="outline-danger" @click="deleteTask(task.id)">Удалить</b-button>
          </li>
        </ul>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import axios from 'axios';
import { ApiAddress } from "@/common.ts";

export default {
  name: 'task-manager',
  data() {
    return {
      isTaskModalVisible: false,
      isTaskListVisible: false,
      tasks: [],
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
      },
      statusOptions: [
        { value: 'Новое', text: 'Новое' },
        { value: 'Необходимо выполнить', text: 'Необходимо выполнить' },
        { value: 'Срочно', text: 'Срочно' }
      ],
      userOptions: []
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get(ApiAddress + `users`);
        this.userOptions = response.data.map(user => ({
          value: user.id,
          text: user.username
        }));
      } catch (error) {
        console.log(error);
      }
    },
    async fetchTasks() {
      try {
        const response = await axios.get(`${ApiAddress}/tasks`);
        this.tasks = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async tryAddTask() {
      try {
        const response = await axios.post(`${ApiAddress}/task-manager`, this.model);
        if (response.status === 200) {
          localStorage.setItem("taskId", response.data.taskId);
          this.fetchTasks(); // обновить список задач после добавления
          this.isTaskModalVisible = false; // закрыть модальное окно после добавления задачи
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTask(taskId) {
      try {
        const response = await axios.delete(`${ApiAddress}/tasks/${taskId}`);
        if (response.status === 200) {
          this.fetchTasks(); // обновить список задач после удаления
        }
      } catch (error) {
        console.log(error);
      }
    },
    toggleTaskList() {
      this.isTaskListVisible = !this.isTaskListVisible;
      if (this.isTaskListVisible) {
        this.fetchTasks();
      }
    }
  },
  created() {
    this.fetchUsers();
  }
}
</script>

<style scoped>

</style>
