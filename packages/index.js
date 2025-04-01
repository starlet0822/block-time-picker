import WebTimePicker from './components/WebTimePicker.vue'
import MobieTimePicker from './components/MobieTimePicker.vue'

export { WebTimePicker, MobieTimePicker } // 具名导出

export const install = (app) => {
  app.component(WebTimePicker.name, WebTimePicker)
  app.component(MobieTimePicker.name, MobieTimePicker)
}

const Plugin = {
  WebTimePicker,
  MobieTimePicker,
  install,
}

// 默认导出
export default Plugin