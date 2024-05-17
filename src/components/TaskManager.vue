<template>
  <div>
    <!-- Via multiple directive modifiers -->
    <b-button v-b-toggle.collapse-a.collapse-b>Новые задачи</b-button>

    <!-- Via space separated string of IDs passed to directive value -->
    <b-button v-b-toggle="'collapse-a collapse-b'">В работе</b-button>

    <!-- Via array of string IDs passed to directive value -->
    <b-button v-b-toggle="['collapse-a', 'collapse-b']">Выполненные</b-button>

    <!-- Elements to collapse -->
    <b-collapse id="collapse-a" class="mt-2">
      <b-card>I am collapsible content A!</b-card>
    </b-collapse>
    <b-collapse id="collapse-b" class="mt-2">
      <b-card>I am collapsible content B!</b-card>
    </b-collapse>
  </div>
</template>

<script>
import {ApiAddress} from "@/common";

export default {
  name: 'task-manager',
  data(){
    return{
      model: {
        taskId: 0,
        title: '',
        description: '',
        deadline: Date,
        taskStatus: '',
        assignedUser: {
          id: 0,
          username: '',
          password: ''
        }
      }
    }
  }
  methods: {
    async tryAddTask(){
      try {
        const response = await axios.post(`${ApiAddress}/task`, this.model)
      }
    }
  }
}
</script>


<style scoped>

</style>