<template>
  <div class="container">
    <div class="card bg-blur border-1 mt-0">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Albums</h5>
      </div>
      <div class="card-body">
        <ul class="list-unstyled">
          <li
            class="mb-2 d-flex align-items-center justify-content-between"
            v-for="album in albums"
            :key="album.id"
          >
            <router-link :to="`/albums/${album.id}`">{{ album.title }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useDataStore } from '@/stores/index.js'

const store = useDataStore()

const albums = computed(() => store.albums)

onMounted(() => {
  store.fetchAlbums()
})
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
