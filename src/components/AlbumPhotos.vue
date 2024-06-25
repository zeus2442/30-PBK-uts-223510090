<template>
    <div class="container">
      <div class="card bg-blur border-1 mt-0">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Photos in Album {{ $route.params.id }}</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div
              class="col-md-3 mb-3"
              v-for="photo in photos"
              :key="photo.id"
            >
              <img
                :src="photo.thumbnailUrl"
                class="img-fluid"
                @click="viewPhoto(photo.url)"
                style="cursor: pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedPhoto" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.8);">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <img :src="selectedPhoto" class="img-fluid w-100" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="selectedPhoto = null">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useDataStore } from '@/stores/index.js'
  
  const route = useRoute()
  const store = useDataStore()
  
  const photos = ref([])
  const selectedPhoto = ref(null)
  
  const viewPhoto = (url) => {
    selectedPhoto.value = url
  }
  
  onMounted(async () => {
    const albumId = route.params.id
    await store.fetchPhotos(albumId)
    photos.value = store.photos[albumId]
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
  