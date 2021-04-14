<template>
  <div>
    <div style="font-size: 2.5rem; margin-top: 3rem">
      MissZ
    </div>
    <div style="font-size: 1.2rem; font-family: 'Songti SC',serif">
      / 周 / 小 / 解 /
    </div>

    <!-- 输入区域 -->
    <div
        style="min-width: 3rem; max-width: 45rem; margin: 0 auto">
      <el-form label-width="6rem" style="margin-right: 2rem; margin-top: 2.5rem">
        <el-form-item
            v-for="(item, idx) in dreamForm"
            :key="idx">
          <span slot="label" style="font-size: 0.8rem">{{ item.key }}</span>
          <el-input
              v-model="item.value"
              :disabled="state !== 0"
              size="medium">
            <el-button
                v-if="idx > 0"
                slot="append"
                icon="el-icon-delete"
                :disabled="state !== 0"
                @click="onClickRemoveFormItem(idx)"/>
          </el-input>
        </el-form-item>
      </el-form>

      <div style="padding-top: 1rem; padding-bottom: 1rem">
        <el-popover
            trigger="hover"
            title="条目是什么？"
            content="条目就是描述你的梦境的一个小标题，可以理解为一个键。">
          <i slot="reference" style="margin-right: 0.8rem">新建条目</i>
        </el-popover>
        <el-select
            v-model="newFormItemKey"
            filterable
            allow-create
            style="max-width: 50%"
            placeholder="新建的描述条目">
          <el-option
              v-for="item in candidateFormItemKey"
              :key="item"
              :value="item"
              :label="item"
              @change="newFormItemKey = item" />
        </el-select>
        <el-popover
            title="提示"
            trigger="hover"
            content="点击此按钮添加新条目。"
            style="font-size: 0.8rem">
          <el-button
              icon="el-icon-check"
              circle size="small" slot="reference"
              @click="onClickAppendFormItem(newFormItemKey)"
              style="margin-left: 1rem" />
        </el-popover>
      </div>

      <el-button
          type="primary"
          :loading="state === 1"
          :disabled="state === 2"
          @click="onSubmit"
          style="margin-top: 1rem">
        Submit
      </el-button>
    </div>

    <!-- 游戏区 -->
    <div
        v-if="state === 1"
        style="margin-top: 2rem; max-width: 60rem; padding: 1rem">
      <jump-game />
    </div>

    <!-- 展示回复区 -->
    <div
        v-if="state === 2"
        style="margin-left: 1rem; margin-right: 1rem; margin-top: 2rem">
      <el-card
          class="box-card"
          style="max-width: 40rem; margin: 0 auto">
        <div>{{ this.interpretText }}</div>
      </el-card>

      <el-button
          round
          icon="el-icon-refresh"
          @click="resetDreamForm"
          style="margin-top: 2rem">
        输入下一个梦境
      </el-button>
    </div>
  </div>
</template>

<script>
import postBackend from "@/utils/postBackend"
import API from "@/utils/API"
import JumpGame from "@/components/JumpGame";

const formPattern = [
  { key: '梦境描述', value: '' },
  { key: '年龄', value: '' },
  { key: '性别', value: '' }
]
const selectPattern = [
    '最近遇到的事情', '学业状况', '情感状况', '婚姻状况'
]

export default {
  name: 'dream-interpreter',
  components: {
    JumpGame
  },  // components
  data() {
    return {
      state: 0,
      dreamForm: formPattern,
      newFormItemKey: '',
      candidateFormItemKey: selectPattern,
      interpretText: ''
    }
  },  // data
  methods: {
    onClickAppendFormItem(newKey) {
      if (newKey === '') return
      this.dreamForm.push({ key: newKey, value: '' })
      this.newFormItemKey = ''
    },
    onClickRemoveFormItem(idx) {
      if (idx <= 0 || idx >= this.dreamForm.length)
        return
      this.dreamForm.splice(idx, 1)
    },
    onSubmit() {
      this.state = 1
      let dreamBody = ''
      this.dreamForm.forEach(elem => {
        dreamBody += ` ${elem.key}: ${elem.value}`
      })
      postBackend(API.POST_DREAM, {
        dream: dreamBody
      }, jsonObj => {
        this.state = 2
        this.interpretText = jsonObj
      })
    },
    resetDreamForm() {
      this.dreamForm.forEach((_, index) => {
        this.dreamForm[index].value = ''
      })
      console.log(this.dreamForm)
      console.log(formPattern)
      this.newFormItemKey = ''
      this.candidateFormItemKey = selectPattern
      this.state = 0
    }
  }  // methods
}
</script>

<style scoped>

</style>