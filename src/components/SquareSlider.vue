<template>
  <div>
    <el-row
        style="width: 100%; display: flex; overflow-x: scroll; overflow-y: hidden; white-space: nowrap">
      <el-col
          v-for="(item, index) in items" :key="index"
          style="display: inline-block; width: 15rem; margin-right: 1rem">
        <dream-card :item="item" :has_similarity="false" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DreamCard from "@/components/DreamCard"
import getBackend from "@/utils/getBackend"
import API from "@/utils/API"

export default {
  name: 'square-slider',

  components: {
    DreamCard
  },

  data() {
    return {
      items: []
    }
  },

  mounted: function() {
    getBackend(API.GET_SQUARE, {}, jsonObj => {
      this.items = []
      jsonObj.data.forEach(elem => {
        const idx = elem.dream.indexOf(' ', 7)
        const title = (idx !== -1? elem.dream.slice(0, idx): elem.dream)
        this.items.push({
          title,
          dream: elem.dream,
          content: elem.interpret,
          good_num: elem.good_num,
          bad_num: elem.bad_num
        })
      })
    })
  }
}
</script>

<style scoped>

</style>