  <template>
    <div>
      <div class="background">
        <img src="https://wallpaperwaifu.com/wp-content/uploads/2023/12/ocean-wave-thumb.jpg" />
      </div>
      <nav class="navbar">
        <router-link to="/todos" class="btn">Todos</router-link>
        <router-link to="/posts" class="btn">Posts</router-link>
        <router-link to="/albums" class="btn">Albums</router-link>
      </nav>
      <router-view />
      <q-footer class="footer">
        <div class="footer-content">
          © 2024 Fauzi | All Rights Reserved
        </div>
      </q-footer>
    </div>
  </template>

  <script setup>
  import { Quasar } from 'quasar'

  // Import Quasar styles
  import 'quasar/src/css/index.sass'
  </script>

  <style scoped>
  .navbar {
    position: fixed;
    top: 5%;
    left: 32%;
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-left: 8%;
  }
  .navbar .btn {
    color: white;
    font-size: 20px;
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
  .footer {
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    text-align: center;
    padding: 10px 0;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  </style>
