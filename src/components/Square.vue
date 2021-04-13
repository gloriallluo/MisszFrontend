<template>
  <div style="margin: 1rem">
    <!-- 图片展示面板 -->
    <el-carousel
        :interval="3000"
        type="card"
        height="10rem"
        style="margin-top: 1rem; margin-bottom: 1rem">
      <el-carousel-item
          v-for="(card, idx) in cards"
          :key="idx"
          height="100%"
          width="100%">
        <el-image :src="card.src" fit="cover" style="height: 100%" />
      </el-carousel-item>
    </el-carousel>

    <el-collapse
        v-model="activeItem"
        accordion
        style="max-width: 50rem; margin: 0 auto">
      <el-collapse-item
          v-for="(item, idx) in items"
          :key="idx"
          :name="idx">
        <template slot="title">
          {{ item.dream }}
          <i class="el-icon-moon" style="margin-left: 0.5rem" />
        </template>
        <div>
          {{ item.interpret }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import getBackend from "@/utils/getBackend"
import API from "@/utils/API"

export default {
  name: 'square',
  data() {
    return {
      cards: [
        { src: require('@/assets/square/dream0.jpg') },
        { src: require('@/assets/square/dream1.jpg') },
        { src: require('@/assets/square/dream2.jpg') },
        { src: require('@/assets/square/dream3.jpg') },
        { src: require('@/assets/square/dream4.jpg') },
        { src: require('@/assets/square/dream5.jpg') },
      ],
      activeItem: 0,
      items: []
    }
  },
  mounted: function() {
    getBackend(API.GET_SQUARE, {}, jsonObj => {
      this.items = []
      jsonObj.data.forEach(elem => {
        this.items.push(elem)
      })
    })
  }
}
</script>

<style scoped>

</style>