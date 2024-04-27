<template>
  <div class="background">
    <img src="https://wallpaperwaifu.com/wp-content/uploads/2023/12/ocean-wave-thumb.jpg"/>
  </div>
  <div class="container">
    <div class="card bg-blur border-1 mt-0 ">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">List Kegiatan</h5>
      </div>
      <div class="card-body">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Add new task" style="background-color: rgba(255, 255, 255, 0.5);" v-model="newTask" @keyup.enter="addTask">
          <button class="btn btn-primary" @click="addTask">+</button>
        </div>
        <ul class="list-unstyled">
          <li class="mb-2 d-flex align-items-center justify-content-between" v-for="(task, index) in filteredTasks" :key="index">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" v-model="task.done">

              <label class="form-check-label" :class="{ 'text-decoration-line-through': task.done }">
                {{ task.text }}
              </label>
            </div>
            <button class="btn btn-link text-danger" @click="removeTask(index)">
              <button><i class="bi bi-trash"></i></button>
            </button>
          </li>
        </ul>
        <div class="d-flex justify-content-between align-items-center">
          <button class="btn btn-primary" @click="showUnfinishedOnly = !showUnfinishedOnly">
            Show Unfinished
          </button>
          <button class="btn btn-secondary" v-if="showUnfinishedOnly" @click="showUnfinishedOnly = false">
            Hapus Filter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        { text: 'Nongkrong', done: false },
        { text: 'Menghabiskan Waktu', done: true },
        { text: 'Hiling', done: false },
      ],
      newTask: '',
      showUnfinishedOnly: false,
    }
  },
  computed: {
    filteredTasks() {
      if (this.showUnfinishedOnly) {
        return this.tasks.filter(task => !task.done)
      } else {
        return this.tasks
      }
    },
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        this.tasks.push({ text: this.newTask.trim(), done: false })
        this.newTask = ''
      }
    },
    toggleTaskDone(task) {
      task.done = !task.done
    },
    removeTask(index) {
      this.tasks.splice(index, 1)
    },
  },
}
</script>

<style scoped>
.list-unstyled{
  color: white;
}
.card-header{
  border-color: white;
}
h5{
  color: white;
  font-weight: bold;
}
.border-1{
  border-color: white;
}

.bg-blur {
  background-color: transparent;
  backdrop-filter: blur(5px);
  border-radius: 1rem;
  top: 5%;
  left: -50%;
}
.background img{
  position: fixed;
  top: 0;
  left: 0;
  min-height: 90%;
  min-width: 1500px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -2;
  object-fit: cover;
  -webkit-background-size:cover; -moz-background-size:cover; -o-background-size:cover; background-size: cover;
  filter: brightness(0.8);
}
</style>