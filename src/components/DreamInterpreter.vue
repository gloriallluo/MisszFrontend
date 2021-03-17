<template>
  <div>
    <div style="font-size: 2.5rem">
      MissZ
    </div>
    <div style="font-size: 1.2rem; font-family: 'Songti SC',serif">
      / 周 / 小 / 解 /
    </div>

    <!-- 输入区域 -->
    <div
        style="margin-left: 12rem; margin-right: 12rem; margin-top: 1.2rem">
      <el-form label-width="8rem" style="margin-right: 4rem">
        <el-form-item
            v-for="(item, idx) in dreamForm"
            :key="idx"
            :label="item.key">
          <el-input
              v-model="item.value"
              :disabled="state !== 0">
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
        <i style="margin-right: 1rem">Add new key:</i>
        <el-select
            v-model="newFormItemKey"
            filterable
            allow-create
            placeholder="新建的描述条目">
          <el-option
              v-for="item in candidateFormItemKey"
              :key="item"
              :value="item"
              :label="item"
              @change="newFormItemKey = item" />
        </el-select>
        <el-button
            icon="el-icon-check"
            circle size="small"
            @click="onClickAppendFormItem(newFormItemKey)"
            style="margin-left: 1rem" />
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
        style="margin-top: 2rem">
      <jump-game />
    </div>

    <!-- 展示回复区 -->
    <div
        v-if="state === 2"
        style="margin-top: 2rem">
      <el-card
          class="box-card"
          style="margin-left: 3rem; margin-right: 3rem">
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