<template>
  <div class="post-section">
    <div class="card bg-blur border-1 mt-0">
      <div
        class="card-header d-flex justify-content-between align-items-center"
      >
        <h5 class="mb-0">Select User</h5>
      </div>
      <div class="card-body">
        <div class="input-group mb-3">
          <select
            class="form-select"
            v-model="selectedUser"
            @change="fetchUserData"
          >
            <option value="null">Pilih Username</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.username }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="content-section" v-if="selectedUser !== 'null'">
      <div v-if="posts.length" class="card bg-blur border-1 mt-0 post-card">
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
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
import { ref, onMounted } from "vue";
import axios from "axios";

const users = ref([]);
const selectedUser = ref("null");
const posts = ref([]);
const selectedUsername = ref("");

const fetchUsers = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    users.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchUserData = async () => {
  if (selectedUser.value === "null") {
    posts.value = [];
    selectedUsername.value = "";
    return;
  }
  try {
    selectedUsername.value = users.value.find(
      (user) => user.id === selectedUser.value
    ).username;

    const postsResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`
    );
    posts.value = postsResponse.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.post-section {
  position: fixed;
  left: 32%;
  top: 20%;
  width: 40%;
  bottom: 20%;
}
.content-section {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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
.post-card {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  padding: 20px;
  width: 100%;
  max-height: 300px;
  overflow-y: scroll;
}
</style>