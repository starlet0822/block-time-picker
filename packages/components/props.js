export default {
  modelValue: {
    type: Array,
    default: () => [],
  },
  // 最小小时数
  minHour: {
    type: [Number, String],
    default: '0',
  },
  // 最大小时数
  maxHour: {
    type: [Number, String],
    default: '23',
  },
  // 时间间隔：必须是被 60 分钟整除
  step: {
    type: [Number, String],
    default: 30,
    validator: (val) => {
      return 60 % parseInt(val) === 0
    },
  },
  // 选择范围时的分隔符
  rangeSeparator: {
    type: String,
    default: ' ~ ',
  },
  // 激活高亮颜色
  activeColor: {
    type: String,
    default: '#2e6cf3',
  },
  // 未激活颜色
  inactiveColor: {
    type: String,
    default: '#a0a6ae',
  },
  readonly: Boolean, // 是否只读
  disabledBefore: Boolean, // 是否禁用过去的时间

  // TODO: 尺寸
  size: {
    type: String,
    default: 'default',
    validatior(val) {
      return ['large', 'default', 'small'].includes(val)
    },
  },
}