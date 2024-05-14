<template>
  <div class="background">
    <img src="https://wallpaperwaifu.com/wp-content/uploads/2023/12/ocean-wave-thumb.jpg"/>
  </div>
  <div>
    <nav>
      <div class="Navbar">
        <button @click="TampilTudos" class="btn">Tudos</button>
        <button @click="Tampilpost" class="btn">Post</button>
      </div>
    </nav>
  </div>
  <div class="container" v-if="OnTudo">
    <div class="card bg-blur border-1 mt-0">
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
              <i class="bi bi-trash"></i>
            </button>
          </li>
        </ul>
        <div class="d-flex justify-content-between align-items-center">
          <button class="btn btn-primary" @click="showUnfinishedOnly = !showUnfinishedOnly">
            {{ showUnfinishedOnly ? 'Show All' : 'Show Unfinished' }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="OnPost" class="post-section">
    <div class="card bg-blur border-1 mt-0">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Select User</h5>
      </div>
      <div class="card-body">
        <div class="input-group mb-3">
          <select class="form-select" v-model="selectedUser" @change="fetchUserData">
            <option value="null">Pilih Username</option>
            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.username }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="content-section" v-if="selectedUser !== 'null'">
      <div v-if="posts.length" class="card bg-blur border-1 mt-0 post-card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Posts by {{ selectedUsername }}</h5>
        </div>
        <div class="card-body">
          <ul>
            <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const OnTudo = ref(true);
const OnPost = ref(false);

const TampilTudos = () => {
  OnTudo.value = true;
  OnPost.value = false;
};

const Tampilpost = () => {
  OnTudo.value = false;
  OnPost.value = true;
};

const tasks = ref([
  { text: 'Nongkrong', done: false },
  { text: 'Menghabiskan Waktu', done: true },
  { text: 'Hiling', done: false },
]);

const newTask = ref('');
const showUnfinishedOnly = ref(false);

const filteredTasks = computed(() => {
  return showUnfinishedOnly.value
    ? tasks.value.filter(task => !task.done)
    : tasks.value;
});

const addTask = () => {
  if (newTask.value.trim()) {
    tasks.value.push({ text: newTask.value.trim(), done: false });
    newTask.value = '';
  }
};

const removeTask = (index) => {
  tasks.value.splice(index, 1);
};

const users = ref([]);
const selectedUser = ref('null');
const posts = ref([]);
const albums = ref([]);
const selectedUsername = ref('');

const fetchUsers = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    users.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchUserData = async () => {
  if (selectedUser.value === 'null') {
    posts.value = [];
    albums.value = [];
    selectedUsername.value = '';
    return;
  }
  try {
    selectedUsername.value = users.value.find(user => user.id === selectedUser.value).username;

    const [postsResponse, albumsResponse] = await Promise.all([
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`),
    ]);

    posts.value = postsResponse.data;
    albums.value = albumsResponse.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.container {
  position: fixed;
  left: 43%;
  top: 30%;
  width: 20%;
}
.post-section {
  position: fixed;
  left: 43%;
  top: 30%;
  width: 20%;
}
.content-section {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.Navbar {
  position: fixed;
  top: 5%;
  left: 32%;
}
.Navbar button {
  color: white;
  font-size: 30px;
  margin-left: 150px;
}
.Navbar button:hover {
  border-width: 2px;
  padding: 0 20px;
  font-size: 20px;
  border-style: solid;
  border-color: wheat;
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
.background img {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100%;
  min-width: 100%;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -2;
  object-fit: cover;
  filter: brightness(0.8);
}
.post-card {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  padding: 20px;
  width: 100%;
  max-height: 300px;
  overflow-y: scroll;
}
</style>
