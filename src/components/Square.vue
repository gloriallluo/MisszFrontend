<template>
  <div>
    <!-- 图片展示面板 -->
    <el-carousel
        :interval="3000"
        type="card"
        height="13rem">
      <el-carousel-item
          v-for="card in cards"
          :key="card"
          height="100%"
          width="100%">
        <el-image :src="card.src" fit="cover" />
      </el-carousel-item>
    </el-carousel>

    <el-collapse
        v-model="activeItem"
        accordion
        style="margin-left: 5rem; margin-right: 5rem">
      <el-collapse-item
          v-for="(item, idx) in items"
          :key="idx"
          :name="idx">
        <template slot="title">
          {{ item.title }}
          <i class="el-icon-moon" style="margin-left: 0.5rem" />
        </template>
        <div>
          {{ item.content }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
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
        { title: 'title1', content: 'content1' },
        { title: 'title2', content: 'content2' },
        { title: 'title3', content: 'content3' },
        { title: 'title4', content: 'content4' },
        { title: 'title5', content: 'content5' },
      ]
    }
  }
}
</script>

<style scoped>

</style>