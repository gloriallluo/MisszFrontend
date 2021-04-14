<template>
  <div>
    <el-row
        style="width: 100%; display: flex; overflow-x: scroll; overflow-y: hidden; white-space: nowrap">
      <el-col
          v-for="(item, index) in items" :key="index"
          style="display: inline-block; width: 15rem; margin-right: 1rem">
        <el-card>
          <div slot="header" class="clearfix">{{ item.title }}</div>
          <el-popover
              :title="item.title"
              trigger="hover"
              :content="item.content"
              style="font-size: 0.8rem">
            <div slot="reference" class="text-block">{{ item.content }}</div>
          </el-popover>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import getBackend from "@/utils/getBackend";
import API from "@/utils/API";

export default {
  name: 'jump-game',
  data() {
    return {
      items: [
        { title: 1, content: 'udhewoscjsladcjpsbuisdjclsakcajposd' },
        { title: 1, content: 'udhewoscjsladcjps' }
      ]
    }
  },
  mounted: function() {
    getBackend(API.GET_SQUARE, {}, jsonObj => {
      this.items = []
      jsonObj.data.forEach(elem => {
        const idx = elem.dream.indexOf(' ', 7)
        const title = (idx !== -1? elem.dream.slice(0, idx): elem.dream)
        const content = elem.interpret
        this.items.push({
          title, content
        })
      })
    })
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