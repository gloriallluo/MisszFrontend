<template>
  <div>
    <el-card shadow="never">
    <el-row
        style="width: 100%; display: flex; overflow-x: scroll; overflow-y: hidden; white-space: nowrap">
      <el-col
          v-for="(item, index) in items" :key="index"
          style="display: inline-block; width: 15rem; margin-right: 1rem">
        <dream-card :item="item" :has_similarity="true" />
      </el-col>
    </el-row>
  </el-card>
  </div>
</template>

<script>
import DreamCard from "@/components/DreamCard"
import postBackend from "@/utils/postBackend"
import API from "@/utils/API"

export default {
  name: 'similar-slider',

  props: [
      'dream'
  ],

  components: {
    DreamCard
  },

  data() {
    return {
      items: []
    }
  },

  mounted() {
    this.items = []
    postBackend(
        API.GET_SIMILAR,
        { dream: this.dream },
        jsonObj => {
      jsonObj.data.forEach(elem => {
        const idx = elem.dream.indexOf(' ', 7)
        const title = (idx !== -1? elem.dream.slice(0, idx): elem.dream)
        this.items.push({
          title,
          dream: elem.dream,
          content: elem.interpret,
          good_num: elem.good_num,
          bad_num: elem.bad_num,
          similarity: elem.cos_sim
        })
      })
    })
  }
}
</script>

<style scoped>

</style>