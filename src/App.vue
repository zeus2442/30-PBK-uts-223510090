<template>
  <div class="background">
    <img
      src="https://wallpaperwaifu.com/wp-content/uploads/2023/12/ocean-wave-thumb.jpg"
    />
  </div>
  <div>
    <nav>
      <div class="Navbar">
        <button @click="TampilTudos" class="btn">Tudos</button>
        <button @click="Tampilpost" class="btn">Post</button>
      </div>
    </nav>
  </div>
  <Tudos v-if="OnTudo" />
  <Post v-if="OnPost" />
</template>

<script setup>
import { ref } from "vue";
import Tudos from "./components/Tudos.vue";
import Post from "./components/Post.vue";

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
</script>

<style scoped>
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
</style>
