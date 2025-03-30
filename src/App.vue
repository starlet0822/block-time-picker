<script setup>
import WebTimePicker from '@/components/WebTimePicker.vue'
// import WebTimePicker from '@/components/MobieTimePicker.vue'
import { ref, reactive } from 'vue'
import { pick } from 'lodash-es'
import { QuestionFilled } from '@element-plus/icons-vue'

const defaultTimeRange = ref(['09:00', '18:00'])
const timeRange1 = ref([])
const timeRange2 = ref([])
const timeRange3 = ref([])
const timeRange4 = ref([])

const timeRange60 = ref(['09:00', '23:59'])
const timeRange30 = ref(['09:30', '18:30'])
const timeRange20 = ref(['09:40', '16:00'])
const timeRange15 = ref(['09:45', '13:30'])
const timeRange10 = ref(['09:50', '12:30'])

const timeStepObj = {
  10: '10分',
  15: '15分',
  20: '20分',
  30: '30分',
  60: '60分',
}
const options = reactive({
  minHour: '0',
  maxHour: '23',
  step: 30,
  activeColor: '#FFCD5E',
  readonly: true,
  disabledBefore: true,
})

const valueMap = new Map([
  [10, timeRange10],
  [15, timeRange15],
  [20, timeRange20],
  [30, timeRange30],
  [60, timeRange60],
])

const getTimeStr = (times) => {
  return times.length ? times.join(' ~ ') : '-'
}

function handleValue(step) {
  return valueMap.get(+step).value
}

const timePickerChange = (val, step) => {
  valueMap.get(+step).value = val
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <el-row type="flex" align="middle" justify="space-between">
        <div class="flex-c">
          块状时间段选择组件(自主封装)&nbsp;
          <el-tooltip trigger="click">
            <template #content>
              <p>
                操作交互逻辑：<br />
                1.当选择了某一节，点击该节之前则是选择开始时间，点击该节之后则是选择结束时间；<br />
                2.开始和结束时间均选择完毕，选择高亮区域之前则重置，选择高亮区域之后则是重新选择结束时间；<br />
                3.开始和结束时间均选择完毕，往前选择则重置，往后选择则是选择结束时间；<br />
                3.开始和结束时间均选择完毕，点击高亮区域中间（不含第一节或最后一节），则是重新选择结束时间；<br />
                4.开始和结束时间均选择完毕，点击高亮区域第一节或最后一节均是取消选择该时间。<br />
              </p>
            </template>
            <el-icon class="cursor-pointer"><QuestionFilled /></el-icon>
          </el-tooltip>
        </div>
      </el-row>
    </template>

    <div>
      <el-divider content-position="left">
        基础使用: 已选时间 {{ getTimeStr(timeRange1) }}</el-divider
      >
      <WebTimePicker v-model="timeRange1" />

      <el-divider content-position="left">
        默认选中时间: 已选时间 {{ getTimeStr(defaultTimeRange) }}</el-divider
      >
      <WebTimePicker v-model="defaultTimeRange" />

      <el-divider content-position="left">
        自定义选中高亮颜色（activeColor） 已选时间 {{ getTimeStr(timeRange2) }}</el-divider
      >
      <WebTimePicker v-model="timeRange2" v-bind="pick(options, ['activeColor'])" />

      <el-divider content-position="left">
        指定可选范围（minHour：9，maxHour: 18） 已选时间
        {{ getTimeStr(timeRange3) }}</el-divider
      >
      <WebTimePicker v-model="timeRange3" :min-hour="9" :max-hour="18" />

      <el-divider content-position="left">
        只读（readonly）和禁用过去时间（disabledBefore） 已选时间
        {{ getTimeStr(timeRange4) }}
      </el-divider>
      <WebTimePicker v-model="timeRange4" v-bind="pick(options, ['readonly', 'disabledBefore'])" />

      <el-divider content-position="left">自定义时间间隔（step: 60|30|20|15|10）</el-divider>
      <template v-for="step of Object.keys(timeStepObj).reverse()" :key="step">
        <p class="my-2">每隔 {{ step }} 分钟 已选时间：{{ getTimeStr(handleValue(step)) }}</p>
        <WebTimePicker
          :model-value="handleValue(step)"
          :step="step"
          @change="timePickerChange($event, step)"
        />
      </template>
    </div>
  </el-card>
</template>

<style lang="scss" scoped></style>
