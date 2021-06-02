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
          <a-button
              type="link"
              @click="onClickedLike(idx)"
              style="margin-left: 0.8rem">
            {{ item.good_num }}
            <a-icon type="like" theme="twoTone" />
          </a-button>
          <a-button
              type="link"
              @click="onClickedDislike(idx)"
              style="margin-left: 0.8rem">
            {{ item.bad_num }}
            <a-icon type="dislike" theme="twoTone" />
          </a-button>
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
import postBackend from "@/utils/postBackend"
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
        { title: '很长很长很长很长很长很长很长很长很长很长', description: '很长很长', content: '11111', good_num: 0, bad_num: 0 }
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
          dream: elem.dream,
          description: elem.dream,
          content: elem.interpret,
          good_num: elem.good_num,
          bad_num: elem.bad_num
        })
      })
    })
  },

  methods: {
    onClickedLike(idx) {
      if (idx >= this.items.length) return
      let dream = this.items[idx].dream
      postBackend(API.POST_GOOD, { dream }, jsonObj => {
        console.log(jsonObj)
        this.items[idx].good_num = Number(jsonObj)
      })
    },

    onClickedDislike(idx) {
      if (idx >= this.items.length) return
      let dream = this.items[idx].dream
      postBackend(API.POST_BAD, { dream }, jsonObj => {
        console.log(jsonObj)
        this.items[idx].bad_num = Number(jsonObj)
      })
    }
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