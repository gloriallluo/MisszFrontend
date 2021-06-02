<template>
  <el-card>
    <div slot="header" class="clearfix text-block">
      <span class="text-block">{{ item.title }}</span>
      <span>
        <a-button type="link" @click="onClickedLike">
          {{ item.good_num }}
          <a-icon type="like" theme="twoTone" />
        </a-button>
        <a-button
            type="link"
            @click="onClickedDislike">
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
      <div v-if="has_similarity">
        <strong>Cosine Similarity: {{ item.similarity }}</strong>
      </div>
      <div>{{ item.content }}</div>
      <div slot="reference">
        <div class="text-block">{{ item.content }}</div>
      </div>
    </el-popover>
  </el-card>
</template>

<script>
import postBackend from "@/utils/postBackend"
import API from "@/utils/API"

export default {
  name: 'dream-card',

  /**
   * item: { title, dream, content, good_num, bad_num, (similarity) }
   * has_similarity: Boolean
   * */
  props: [
      'item', 'has_similarity'
  ],

  methods: {
    onClickedLike() {
      postBackend(
          API.POST_GOOD,
          { dream: this.item.dream },
          jsonObj => {
            this.item.good_num = Number(jsonObj)
          })
    },

    onClickedDislike() {
      postBackend(
          API.POST_BAD,
          { dream: this.item.dream },
          jsonObj => {
            this.item.bad_num = Number(jsonObj)
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