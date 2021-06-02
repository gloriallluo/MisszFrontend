<template>
  <div>
    <el-row
        style="width: 100%; display: flex; overflow-x: scroll; overflow-y: hidden; white-space: nowrap">
      <el-col
          v-for="(item, idx) in items" :key="idx"
          style="display: inline-block; width: 15rem; margin-right: 1rem">
        <el-card>
          <div slot="header" class="clearfix text-block">
            <span class="text-block">{{ item.title }}</span>
            <span>
              <a-button type="link" @click="onClickedLike(idx)">
                {{ item.good_num }}
                <a-icon type="like" theme="twoTone" />
              </a-button>
              <a-button
                  type="link"
                  @click="onClickedDislike(idx)">
                {{ item.bad_num }}
                <a-icon type="dislike" theme="twoTone" />
              </a-button>
            </span>
          </div>
          <el-popover
              :title="item.title"
              trigger="hover"
              width="30rem"
              style="font-size: 0.8rem">
            <div><strong>Cosine Similarity: {{ item.similarity }}</strong></div>
            <div>{{ item.content }}</div>
            <div slot="reference">
              <div class="text-block">{{ item.content }}</div>
            </div>
          </el-popover>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import postBackend from "@/utils/postBackend"
import API from "@/utils/API"

export default {
  name: 'similar-slider',

  props: [
      'dream'
  ],

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
        this.items.push({
          title: elem.dream,
          content: elem.interpret,
          good_num: elem.good_num,
          bad_num: elem.bad_num,
          similarity: elem.cos_sim
        })
      })
    })
  },

  methods: {
    onClickedLike(idx) {
      if (idx >= this.items.length) return
      let dream = this.items[idx].title
      postBackend(
          API.POST_GOOD,
          { dream },
          jsonObj => {
        this.items[idx].good_num = Number(jsonObj)
      })
    },

    onClickedDislike(idx) {
      if (idx >= this.items.length) return
      let dream = this.items[idx].title
      postBackend(
          API.POST_BAD,
          { dream },
          jsonObj => {
        this.items[idx].bad_num = Number(jsonObj)
      })
    }
  }
}
</script>

<style scoped>
.clearfix {
  font-size: 0.8rem;
}

.clearfix:before,

.clearfix:after {
  display: table;
  content: "";
  clear: both;
}

.text-block {
  font-size: 0.7rem;
  width: 100%;
  display: block;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>