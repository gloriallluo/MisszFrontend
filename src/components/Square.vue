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
          <div class="text-block">{{ item.title }}</div>
          <i class="el-icon-moon" style="margin-left: 0.5rem" />
        </template>
        <div>
          <p><strong>{{ item.description }}</strong></p>
          <p>{{ item.content }}</p>
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
      items: [
        { title: '很长很长很长很长很长很长很长很长很长很长', description: '很长很长', content: '11111' }
      ]
    }
  },
  mounted: function() {
    getBackend(API.GET_SQUARE, {}, jsonObj => {
      this.items = []
      jsonObj.data.forEach(elem => {
        const begin = elem.dream.indexOf(':')
        const end = elem.dream.indexOf(' ', begin + 2)
        const title = (end !== -1? elem.dream.slice(begin + 2, end): elem.dream.slice(begin + 2))
        this.items.push({
          title,
          description: elem.dream,
          content: elem.interpret
        })
      })
    })
  }
}
</script>

<style scoped>
.text-block {
  width: 100%;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>