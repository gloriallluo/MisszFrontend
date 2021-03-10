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
    <jump-game v-if="state > 0" />

    <!-- 展示回复区 -->
  </div>
</template>

<script>
import JumpGame from "@/components/JumpGame"

const inputting = 0;
// eslint-disable-next-line no-unused-vars
const submitting = 1;
// eslint-disable-next-line no-unused-vars
const received = 2;

export default {
  name: 'dream-interpreter',
  components: {JumpGame},
  comments: {
    JumpGame
  },
  data() {
    return {
      state: inputting,
      dreamForm: [
        { key: '梦境描述', value: '' },
        { key: '年龄', value: '' },
        { key: '性别', value: '' }
      ],
      newFormItemKey: '',
      candidateFormItemKey: [
          '最近遇到的事情', '学业状况', '情感状况', '婚姻状况'
      ]
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
      this.state = submitting
      console.log('submit')
    }
  }
}
</script>

<style scoped>

</style>