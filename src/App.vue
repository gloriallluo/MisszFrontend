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
              style="float: right; margin-right: 1rem; margin-top: 0.5rem">
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

let deferredPrompt = null

export default {
  name: 'App',
  components: { vueCanvasNest },
  data() {
    return {
      deferredPrompt: null
    }
  },
  created() {
    window.onbeforeinstallprompt = (e) => {
      console.log('listen')
      e.preventDefault()
      deferredPrompt = e
      return false
    }
  },
  methods: {
    installPWA() {
      if (deferredPrompt !== null) {
        deferredPrompt.prompt()
        // Follow what the user has done with the prompt.
        deferredPrompt.userChoice.then(choiceResult => {
          console.log(choiceResult.outcome);
          if (choiceResult.outcome === 'dismissed') {
            console.log('User cancelled home screen install');
          } else {
            console.log('User added to home screen');
          }
          // We no longer need the prompt. Clear it up.
          deferredPrompt = null;
        });
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
