<template>
  <div class="container">
    <div class="card bg-blur border-1 mt-0">
      <div
        class="card-header d-flex justify-content-between align-items-center"
      >
        <h5 class="mb-0">List Kegiatan</h5>
      </div>
      <div class="card-body">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Add new task"
            style="background-color: rgba(255, 255, 255, 0.5)"
            v-model="newTask"
            @keyup.enter="addTask"
          />
          <button class="btn btn-primary" @click="addTask">+</button>
        </div>
        <ul class="list-unstyled">
          <li
            class="mb-2 d-flex align-items-center justify-content-between"
            v-for="(task, index) in filteredTasks"
            :key="index"
          >
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="task.done"
              />
              <label
                class="form-check-label"
                :class="{ 'text-decoration-line-through': task.done }"
              >
                {{ task.text }}
              </label>
            </div>
            <button class="btn btn-link text-danger" @click="removeTask(index)">
              <i class="bi bi-trash"></i>
            </button>
          </li>
        </ul>
        <div class="d-flex justify-content-between align-items-center">
          <button
            class="btn btn-primary"
            @click="showUnfinishedOnly = !showUnfinishedOnly"
          >
            {{ showUnfinishedOnly ? "Show All" : "Show Unfinished" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const tasks = ref([
  { text: "Nongkrong", done: false },
  { text: "Menghabiskan Waktu", done: true },
  { text: "Hiling", done: false },
]);

const newTask = ref("");
const showUnfinishedOnly = ref(false);

const filteredTasks = computed(() => {
  return showUnfinishedOnly.value
    ? tasks.value.filter((task) => !task.done)
    : tasks.value;
});

const addTask = () => {
  if (newTask.value.trim()) {
    tasks.value.push({ text: newTask.value.trim(), done: false });
    newTask.value = "";
  }
};

const removeTask = (index) => {
  tasks.value.splice(index, 1);
};
</script>

<style scoped>
.container {
  position: fixed;
  left: 32%;
  top: 20%;
  width: 40%;
  bottom: 20%;
}
.list-unstyled {
  color: white;
}
.card-header {
  border-color: white;
}
h5 {
  color: white;
  font-weight: bold;
}
.border-1 {
  border-color: white;
}
.bg-blur {
  background-color: transparent;
  backdrop-filter: blur(5px);
  border-radius: 1rem;
  margin-top: 5%;
}
</style>
