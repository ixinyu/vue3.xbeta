# my-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

1.在 Vue 3 中要从单个绑定获取多个 ref，请将 ref 绑定到一个更灵活的函数上 (这是一个新特性)

2.过滤器移除，可以用方法或者计算属性代替

3.一个新的全局 API：createApp

调用 createApp 返回一个应用实例，这是 Vue 3 中的新概念：
import { createApp } from 'vue'
const app = createApp({})

Vue.use 更改为 app.use
