<template>
  <div>

    <!-- 输入区域 -->
    <div
        v-if="state === 0"
        style="margin-left: 15rem; margin-right: 15rem; margin-top: 1rem">
      <el-form label-width="8rem">
        <el-form-item
            v-for="(item, idx) in dreamForm"
            :key="idx"
            :label="item.key">
          <el-input
              v-model="item.value">
            <el-button
                v-if="idx > 0"
                slot="append"
                icon="el-icon-delete"
                @click="onClickRemoveFormItem(idx)"/>
          </el-input>
        </el-form-item>
      </el-form>

      <div style="padding-top: 1rem; padding-bottom: 1rem">
        <i style="margin-right: 1rem">Add value-key pair:</i>
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
            icon="el-icon-circle-check"
            type="text"
            size="large"
            @click="onClickAppendFormItem(newFormItemKey)"
            style="margin-left: 1rem" />
      </div>

      <el-button
          type="primary"
          @click="onSubmit">
        Submit
      </el-button>
    </div>

    <!-- 游戏区 -->
    <div v-if="state === 1">Waiting...</div>

    <!-- 展示回复区 -->
    <div v-if="state === 2">
      <el-card
          class="box-card"
          style="margin-left: 3rem; margin-right: 3rem">
        <div>{{ this.interpretText }}</div>
      </el-card>
      <el-button
          round
          icon="el-icon-refresh"
          @click="state = 0" style="margin-top: 2rem">
        输入下一个梦境
      </el-button>
    </div>
  </div>
</template>

<script>
import postBackend from "@/utils/postBackend"
import API from "@/utils/API"

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
  data() {
    return {
      state: 0,
      dreamForm: formPattern,
      newFormItemKey: '',
      candidateFormItemKey: selectPattern,
      interpretText: ''
    }
  },
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
      console.log('submit')
      let dreamBody = ''
      this.dreamForm.forEach(elem => {
        dreamBody += ` ${elem.key}: ${elem.value}`
      })
      postBackend(API.POST_DREAM, {
        dream: dreamBody
      }, jsonObj => {
        this.state = 2
        console.log(jsonObj)
        this.interpretText = jsonObj
      })
    }
  },
  watch: {
    state: {
      // some initialization
      handler: function (val) {
        switch (val) {
          case 0:
            this.dreamForm = formPattern
            this.newFormItemKey = ''
            this.candidateFormItemKey = selectPattern
            break
          case 1:
            break
          case 2:
            break
          default:
            break
        }
      }
    }
  }
}
</script>

<style scoped>

</style>