<script setup>
import { ref } from 'vue'
// 局部引入
import { WebTimePicker, MobieTimePicker } from 'block-time-picker'
import 'block-time-picker/dist/block-time-picker.css'

const timeRange1 = ref([])
const timeRange2 = ref([])
</script>

<template>
  <main>
    <div>
      <h2>
        web端使用示例，<span>已选时间：{{ timeRange1 }}</span>
      </h2>
      <WebTimePicker v-model="timeRange1" />
    </div>
    <div>
      <h2>
        mobie端使用示例，<span>已选时间：{{ timeRange2 }}</span>
      </h2>
      <MobieTimePicker v-model="timeRange2" />
    </div>
  </main>
</template>
