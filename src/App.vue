<template>
  <div id="app">
    <el-container style="height: 100%; width: 100%">
      <el-header height="3rem">
        <el-menu
            mode="horizontal"
            default-active="/ask"
            :router="true">
          <el-menu-item index="/ask">解梦</el-menu-item>
          <el-menu-item index="/square">别人的梦</el-menu-item>
          <el-button
              type="text"
              @click="installPWA"
              :disabled="deferredPrompt === false" style="float: right; margin-right: 1rem; margin-top: 0.5rem">
            添加到桌面
          </el-button>
        </el-menu>
      </el-header>
      <vue-canvas-nest :config="{ color: '25, 25, 112', count: 100 }" />
      <el-main
          style="height: 100%; padding: 3rem">
        <router-view />
      </el-main>
      <el-footer height="3rem">
        Developed by xdl
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import vueCanvasNest from 'vue-canvas-nest'

export default {
  name: 'App',
  components: { vueCanvasNest },
  data() {
    return {
      deferredPrompt: false
    }
  },
  created() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      this.deferredPrompt = e
    })
  },
  methods: {
    installPWA() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt()
        this.deferredPrompt = false
      }
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>
