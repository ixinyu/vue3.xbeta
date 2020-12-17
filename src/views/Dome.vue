<template>
  <div>
    <div>dome</div>
    <div v-for="(item,i) in list" :key="i" :ref="setItemRef">{{item}}</div>
    <div>----------------</div>
    <div>{{count}}</div>
    <button @click="changCount">改变count</button>
    <div>----------------</div>
    <ul>
      <li v-for="item in state.list" :key="item.id">{{item.name}}</li>
    </ul>
    <router-link to='/dome2' tag="span">dome02</router-link>
    <router-link to='/dome3' tag="span">dome03</router-link>
    <router-link to='/dome4' tag="span">dome04</router-link>
  </div>
</template>

<script>
/**
vue3 api地址：https://composition-api.vuejs.org/zh/api.html#setup

Vue 在线演示编译结果
Vue3: https://vue-next-template-explorer.netlify.app/
Vue2: https://vue-template-explorer.netlify.app/
1.vue3六大亮点
  - Performance:性能比vue2快1.2~2倍
  - Tree shaking support:按需编译，体积比vue2更小
  - Composition API:组合API(类似React Hooks)
  - Better TypeScript support:更好的 Ts支持
  - Custom Renderer API:暴露了子节点故意渲染API
  - Fragment,Teleport(Protal),Supense:更先进的组件
2.vue3是如何变快的
  - diff方法优化
    在vue3的diff算法中，只有有静态标记的才会进行比较，才会进行追踪
    + vue3新增了静态标记(PatchFlag)
      在与上次虚拟节点进行对比的时候，只对比带有patch flag的节点
      并且可以通过flag的信息得知当前节点要对比的具体内容
  - hoistStatic 静态提升
    + vue2中无论元素是否参与更新，每次都会重新创建
    + vue3中对于不参与更新的元素，只会被创建一次，之后会在每次渲染时候被不停的复用
  - cacheHandles 事件侦听缓存
    + 默认情况下onclick会被视为动态绑定，所以每次都会去追踪它的变化
    但是因为是同一个函数，所以没有追踪变化，直接缓存起来复用即可

  - ssr渲染
    + 当有大量静态的内容时候，这些内容会被当做纯字符推进一个buffer里面，
    即使存在动态的绑定，会通过模板插值嵌入进去，这样会比通过虚拟dom来渲染的快很多
    + 当静态内容大到一定量级时，会用_createStaticVNode方法在客户端去生成一个static node,
    这些静态node,会被直接innerhtml，就不需要创建对接，然后根据对象渲染

 */
import { ref,reactive,onMounted,onBeforeUpdate, onUpdated } from 'vue'
import {useRoute} from 'vue-router'
export default {
  //setup 函数只能是同步的不能是异步的
  setup(){ //setup函数是组合api的入口函数，是在beforecreate钩子之前完成的,所以没有this
    //ref 函数注意点：
    //ref 函数只能监听简单类型的变化，不能监听复杂类型的变化（对象/数组）
    //复杂类型可以用 reactive 监听变化
    let count = ref(0) //ref监听简单类型，赋初始值
    let state = reactive({ //reactive监听复杂类型的变化
      list:[
        {id:1,name:'张三'},
        {id:2,name:'李四'},
        {id:3,name:'王五'}
      ]
    })
    let itemRefs = []
    let list = [1,2,3,4,5]
    //在组合API中定义方法，不需要定义methods中，直接定义return暴露出去即可
    const setItemRef = el => {
      itemRefs.push(el)
    } 
    const changCount =()=>{
      // console.log(count.value)
      count.value++;
    }
    onMounted(()=>{
      //接收参数
      const route = useRoute()
      console.log(route.query)
    
    })
    onBeforeUpdate(() => {
      itemRefs = []
    })
    onUpdated(()=>{
      // console.log(itemRefs)
    })
    //注意点：在组合API中定义的变量/方法，要想在外界使用，必须要通过return {xxx,xxx} 暴露出去
    return {
      itemRefs,
      setItemRef,
      list,
      count,
      changCount,
      state
    }

    //抽离，以及ref和reactive的详细介绍->看dome2
  }
}
</script>

<style>

</style>