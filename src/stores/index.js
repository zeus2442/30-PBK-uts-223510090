// stores/index.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useDataStore = defineStore('data', {
  state: () => ({
    todos: [],
    posts: [],
    albums: [],
    photos: {}
  }),
  actions: {
    async fetchPosts() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        this.posts = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async fetchAlbums() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums')
        this.albums = response.data
        console.log('Fetched albums:', this.albums) // Add this line for debugging
      } catch (error) {
        console.error(error)
      }
    },
    async fetchPhotos(albumId) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
        this.photos[albumId] = response.data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
