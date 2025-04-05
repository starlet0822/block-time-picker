<!--
 * @Description:块状选择时间 - 适用于移动端
 * @Author: wuxxing
-->
<template>
  <div class="mobie-time-picker">
    <div class="time-wrapper">
      <template v-for="(bar, index) in timeData" :key="bar.time + index">
        <div class="time-bar">
          <span class="time-text">{{ bar.time + ':00' }}</span>
          <div class="time-full">
            <div
              v-for="block in bar.blocks"
              :key="block.value"
              :data-val="block.value"
              :data-idx="block.index"
              class="time-block"
              :class="{
                'time-block--selected':
                  timeIdxRange.includes(block.index) || moveIndex == block.index,
                'time-block--readonly': readonly,
                'time-block--disabled': block.disabled,
                'in-range':
                  inRange.length == 2 && block.index > inRange[0] && block.index < inRange[1],
              }"
              @click="onClickBlock(bar, block, block.index)"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed, toRefs } from 'vue'
import comProps from './props'

defineOptions({
  name: 'MobieTimePicker',
})

const props = defineProps(comProps)

const { modelValue, minHour, maxHour, step, readonly, disabledBefore } = toRefs(props)

const emit = defineEmits(['update:modelValue', 'change'])

const barWidth = ref(0)

const timeData = ref([]) // 渲染数据
const timeIdxRange = ref([]) //选择开始和结束时间的索引
const startIndex = ref()
const endIndex = ref()

const moveIndex = ref() // 记录当前鼠标移入索引
const inRange = computed(() => {
  let range = []
  if (startIndex.value !== undefined && moveIndex.value !== undefined) {
    range = [startIndex.value, moveIndex.value].sort((a, b) => a - b)
  }
  return range
}) // 记录开始索引和鼠标

onMounted(() => {
  initTimeData()
  initTimeRange()
  getBarWidth()
})

const getBarWidth = async () => {
  await nextTick()
  barWidth.value = document.querySelector('.time-bar')?.getBoundingClientRect()?.width
}

// 分钟转为整点小时
const minute2hour = (minute) => {
  return String(Math.floor(minute / 60)).padStart(2, '0')
}

// 更新值
const updateValue = () => {
  let value = []
  if (timeIdxRange.value.length === 0) {
    value = []
    emit('update:modelValue', value)
    emit('change', value)
    return
  }
  const startTime = +minHour.value * 60 + Number(step.value) * startIndex.value + Number(step.value)
  const endTime = +minHour.value * 60 + Number(step.value) * endIndex.value + Number(step.value)
  let eHour = undefined // 结束小时
  let eMin = undefined // 结束分钟
  let sHour = undefined // 开始小时
  let sMin = undefined // 开始分钟
  let sTime = undefined // 开始时间
  let eTime = undefined // 结束时间
  if (startTime && endTime) {
    sHour = minute2hour(startTime - +step.value)
    eHour = minute2hour(endTime)
    sMin =
      (startTime - +step.value) % 60 === 0
        ? '00'
        : Math.round(((startTime - +step.value) / 60 - sHour) * 60)
    eMin = endTime % 60 === 0 ? '00' : Math.round((endTime / 60 - eHour) * 60)
    sTime = sHour + ':' + sMin
    // 处理临界时间
    if (+eHour === 24) {
      eHour = 23
      eMin = 59
    }
    eTime = eHour + ':' + eMin
  } else {
    sHour = minute2hour(startTime - +step.value)
    eHour = minute2hour(startTime)
    sMin =
      (startTime - +step.value) % 60 === 0
        ? '00'
        : Math.round(((startTime - +step.value) / 60 - sHour) * 60)
    eMin = startTime % 60 === 0 ? '00' : Math.round((startTime / 60 - eHour) * 60)

    sTime = sHour + ':' + sMin
    // 处理临界时间
    if (+eHour === 24) {
      eHour = 23
      eMin = 59
    }
    eTime = eHour + ':' + eMin
  }

  value = [sTime, eTime]
  emit('update:modelValue', value)
  emit('change', value)
}

// 初始化时间范围
const initTimeData = () => {
  const nowHour = new Date().getHours()
  const nowMin = new Date().getMinutes()

  const times = []
  const blocks = (time) => {
    const temp = []
    const idx = (60 / +step.value) * (time - +minHour.value)

    const handleDisabled = (time, i) => {
      if (!disabledBefore.value) {
        return false
      }
      if (time < nowHour) {
        return true
      }
      if (nowHour === time) {
        const s = +step.value * (i - 1)
        const e = +step.value * i
        if (nowMin >= s && nowMin <= e) {
          return true
        }
        if (nowMin >= e) {
          return true
        }
      }
    }
    for (let i = 1; i <= 60 / +step.value; i++) {
      temp.push({
        value: time * 60 + step.value * i,
        selected: false,
        disabled: handleDisabled(time, i),
        index: idx + i - 1,
      })
    }
    return temp
  }

  for (let i = +minHour.value; i <= +maxHour.value; i++) {
    const item = {
      time: undefined,
      blocks: blocks(i),
    }
    item.time = minute2hour(i * 60)
    times.push(item)
  }
  timeData.value = times
}

// 回显
const initTimeRange = () => {
  if (Array.isArray(modelValue.value)) {
    if (modelValue.value.length === 2) {
      const getHourByTime = (time) => {
        return time.split(':')[0].padStart(2, '0')
      }
      const getMinByTime = (time) => {
        return time.split(':')[1].padStart(2, '0')
      }
      let startIdx = 0
      let endIdx = 0
      const [start, end] = modelValue.value

      startIdx = timeData.value.findIndex((item) => item.time === getHourByTime(start))
      endIdx = timeData.value.findIndex((item) => item.time === getHourByTime(end))

      startIndex.value = startIdx * (60 / step.value)
      endIndex.value = endIdx * (60 / step.value)

      if (parseInt(getMinByTime(start)) == step.value) {
        const i = getMinByTime(start) / step.value
        startIndex.value = startIndex.value + (i > 0 ? i : 0)
      } else {
        const i = getMinByTime(start) / step.value
        console.log('i', i)
        startIndex.value = startIndex.value + (i > 0 ? i : 0)
      }

      if (parseInt(getMinByTime(end)) === 0) {
        endIndex.value = endIndex.value - 1
      } else if (parseInt(getMinByTime(end)) === 59) {
        const i = 60 / step.value
        console.log('i', i)
        endIndex.value = endIndex.value - 1 + (i > 0 ? i : 0)
      } else {
        const i = getMinByTime(end) / step.value
        console.log('i', i)
        endIndex.value = endIndex.value - 1 + (i > 0 ? i : 0)
      }

      console.log(startIdx, endIdx, startIndex.value, endIndex.value, start, end)
      for (let i = startIndex.value; i <= endIndex.value; i++) {
        timeIdxRange.value.splice(i - startIndex.value, 0, i)
      }
    }
  } else {
    throw new Error(`modelValue must be a array, and the maxlength should be zero or two.`)
  }
}

// 点击选择
const onClickBlock = (bar, block, index) => {
  if (readonly.value) {
    return false
  }
  if (disabledBefore.value) {
    initTimeData()
  }
  if (block.disabled) {
    return
  }
  moveIndex.value = undefined

  if (startIndex.value === undefined && endIndex.value === undefined) {
    startIndex.value = timeIdxRange.value[0] = index
  }
  // 当只存在开始时间时
  else if (startIndex.value !== undefined && endIndex.value === undefined) {
    if (index === startIndex.value) {
      // 双击取反
      if (timeIdxRange.value.indexOf(index) > -1) {
        timeIdxRange.value.splice(timeIdxRange.value.indexOf(index), 1)
        startIndex.value = endIndex.value = undefined
      }
    }
    if (index > startIndex.value) {
      endIndex.value = index
      timeIdxRange.value.splice(0)
      for (let i = startIndex.value; i <= endIndex.value; i++) {
        timeIdxRange.value.splice(i - startIndex.value, 0, i)
      }
    }
    if (index < startIndex.value) {
      const [start, end] = [index, startIndex.value]
      startIndex.value = start
      endIndex.value = end
      // 选取数据--向右添加，向左取消
      timeIdxRange.value.splice(0)
      for (let i = startIndex.value; i <= endIndex.value; i++) {
        timeIdxRange.value.splice(i - startIndex.value, 0, i)
      }
    }
  }
  // 同时存在开始结束时间，向左则重置选择
  else if (startIndex.value !== undefined && endIndex.value !== undefined) {
    if (index === startIndex.value) {
      const idx = timeIdxRange.value.indexOf(index)
      timeIdxRange.value.splice(idx, 1)
      if (timeIdxRange.value.length) {
        startIndex.value = timeIdxRange.value[0]
      } else {
        startIndex.value = endIndex.value = undefined
      }
    } else if (index === endIndex.value) {
      const idx = timeIdxRange.value.indexOf(index)
      timeIdxRange.value.splice(idx, 1)
      endIndex.value = timeIdxRange.value[timeIdxRange.value.length - 1]
      if (startIndex.value === endIndex.value) {
        endIndex.value = undefined
      }
    } else if (index < startIndex.value) {
      timeIdxRange.value.splice(0)
      startIndex.value = endIndex.value = undefined
    } else if (index > startIndex.value) {
      endIndex.value = index
      timeIdxRange.value.splice(0)
      for (let i = startIndex.value; i <= endIndex.value; i++) {
        timeIdxRange.value.splice(i - startIndex.value, 0, i)
      }
    }
  } else {
    //
  }

  updateValue()
}
</script>

<style lang="scss">
.mobie-time-picker {
  overflow: hidden;
  display: flex;
  box-sizing: border-box;
  position: relative;

  .time-wrapper {
    display: flex;
    overflow-x: auto;
  }

  .time-bar {
    &:not(:last-child) {
      margin-right: 4px;
    }

    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .time-text {
      font-size: 12px;
      margin-bottom: 5px;
    }
  }

  .time-full {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .time-block {
    width: 32px;
    height: 40px;
    border-radius: 2px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    background-color: v-bind(inactiveColor);
    transition: all 0.2s ease-in;
    will-change: auto;

    &:not(:last-child) {
      margin-bottom: 3px;
    }

    &--selected {
      background-color: v-bind(activeColor);
    }
    &--readonly {
      opacity: 0.5;
      cursor: default;
    }
    &--disabled {
      cursor: not-allowed;
      background: repeating-linear-gradient(-45deg, #cccccc, #ebebeb 4px);
    }
  }

  .in-range {
    background-color: v-bind(activeColor);
    opacity: 0.35;
  }
}
</style>
