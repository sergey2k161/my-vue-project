<template>
  <div>
    <!-- HEADER -->
    <div>
      <b-nav>
        <b-nav-item disabled>Shelehov</b-nav-item>
        <b-nav-item :to="{ path: '/task-manager' }">Task Manager</b-nav-item>
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
          В шапке можно найти реализацию всех заданий данных на занятиях.
          Код размещен на GitHub, проект постоянно улучшается, заходи регулярно :)
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
export default {
  name: 'HomePage'
}
</script>

<style scoped>
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