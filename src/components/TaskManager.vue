<template>
  <div class="task-manager vh-100">
    <form @submit.prevent="tryAddTask">
      <div class="toDoList ">
        <b-button class="addTaskButton w-100" @click="isTaskModalVisible = true">Создать новую задачу</b-button>
        <b-button class="addTaskButton w-100" @click="toggleTaskList">Список задач</b-button>
        <b-modal v-model="isTaskModalVisible" title="Создание задачи" hide-footer>
          <b-form @submit.prevent="tryAddTask">
            <b-form-group label="Название">
              <b-form-input
                  name="NameTask"
                  placeholder="Название задачи"
                  v-model="model.title"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Описание">
              <b-form-input
                  name="description"
                  placeholder="Описание"
                  v-model="model.description"
              ></b-form-input>
            </b-form-group>
            
            <b-form-group label="Выполнить до">
              <input type="date" v-model="model.deadline"/>
            </b-form-group>
          </b-form>

          <b-form-group label="Статус задачи">
            <b-form-select v-model="model.taskStatus" :options="statusOptions" required></b-form-select>
          </b-form-group>

          <b-form-group label="Задать исполнитея">
            <b-form-select v-model="model.assignedUser" :options="userOptions" required></b-form-select>
          </b-form-group>
          <b-button class="addTaskButton w-30" type="submit" block>Добавить задачу</b-button>

        </b-modal>
      </div>
    </form>

    <b-collapse v-model="isTaskListVisible" class="mt-3">
      <b-card>
        <ul v-if="tasks.length > 0" class="list-group">
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
        <b-card v-else>
          <div>
            <h5>{{ defaultTask.title }}</h5>
            <p>{{ defaultTask.description }}</p>
            <p><strong>Статус:</strong> {{ defaultTask.taskStatus }}</p>
            <p><strong>Дедлайн:</strong> {{ defaultTask.deadline }}</p>
            <p><strong>Исполнитель:</strong> {{ defaultTask.assignedUser.username }}</p>
          </div>
          <b-button variant="outline-danger" @click="deleteTask(task.id)">Удалить</b-button>
        </b-card>
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
      userOptions: [],
      defaultTask: {
        title: 'Тестовая',
        description: 'Тест Описание',
        taskStatus: 'Новое',
        deadline: '01.01.1999',
        assignedUser: { id: 0, username: 'Пользователь', password: '' }
      }
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
.task-manager{
  font-family: Natural Mono Alt Regular;
  
}
.task-manager{
  background-color: #355957
}
.addTaskButton{
  background-color: #355957;
  border-radius: 10px;
}
</style>
