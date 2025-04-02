<h1 align="center">block-time-picker</h1>
<p align="center">基于 vue3 封装的块状时间选择器 block-time-picker</p>

<p align="center">
<a href="https://www.npmjs.com/package/block-time-picker" target="__blank"><img src="https://img.shields.io/npm/v/block-time-picker?color=a1b858&label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/block-time-picker" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/block-time-picker?color=50a36f&label="></a>
</p>

[预览地址](https://starlet0822.github.io/block-time-picker/) | [预览地址2](https://block-time-picker.netlify.app/)

## 📦 安装

```bash
npm install block-time-picker
# or
yarn add block-time-picker
# or
pnpm add block-time-picker
```

## 📡 `CDN`

```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/block-time-picker/dist/style.css" />
<script src="//cdn.jsdelivr.net/npm/block-time-picker"></script>
<!-- or -->
<link rel="stylesheet" href="//unpkg.com/block-time-picker/dist/style.css" />
<script src="//unpkg.com/block-time-picker"></script>
```

## ⚙️ 用法

### 局部注册（单文件）

```js
import "block-time-picker/dist/style.css";
import { WebTimePicker, MobieTimePicker } from "block-time-picker";
// web端使用
<web-time-picker v-model="timeRange"></web-time-picker>
// mobie端使用
<mobie-time-picker v-model="timeRange"></mobie-time-picker>
```

### 全局注册（main.js）

```js
import { createApp } from 'vue'
import App from './App.vue'

import 'block-time-picker/dist/style.css'
import BlockTimePicker from 'block-time-picker'

const app = createApp(App)

app.use(BlockTimePicker).mount('#app')
```

[点击查看按需、全局以及`Html`文件引入的用法示例](https://github.com/starlet0822/block-time-picker/tree/main/playgrounds)

## 许可证

[MIT © 2025-present, wxx0822](./LICENSE)
