<template>
  <div>
    <div ref="box">张三</div>
    <HelloWorld @sendMsg="handle" username='zhangsan'/>
  </div>
</template>

<script>
/*
1.获取元素
在vue2.x中我们通过给元素添加ref='xx',
然后在代码中通过refs.xx的方式来获取元素
在vue3中我们也可以通过ref来获取元素

2.readonly
Readonly当值为普通类型的时候，是不会生效，只会复杂类型才会生效变成只读

3.vue3响应式数据本质
- 在vue2.x中是通过defineProperty来实现响应式
- 在vue3.x中式通过Proxy来实现响应式数据的
注意点：set方法必须通过返回值告诉Proxy此次操作是否成功
*/
import {ref,onMounted,reactive,readonly, watchEffect} from 'vue'
import HelloWorld from '../components/HelloWorld'
import { setTimeout } from 'timers'
export default {
  comments:{
    HelloWorld
  },
  setup(){ 
    let box = ref(null)
    let count = ref(0)
    watchEffect(()=>{
      console.log(count.value)
    })
    setTimeout(()=>{
      count.value++
    },1000)
    onMounted(()=>{
      // console.log('onMounted',box.value)

      let obj = {name:'zs',age:18}
      let state = new Proxy(obj,{
        get(obj,key){
          // console.log(obj,key)
          return obj[key]
        },
        set(obj,key,value){
          // console.log('---------------')
          // console.log(obj,key,value)
          obj[key] = value
          // console.log('更新页面')
          return true
        }
      })

      state.name = '你好呀'
      // console.log(state)
    })

    const handle = (val)=>{
      // console.log('revice',val)
    }
    
    return {
      box,
      handle
    }
  }
}
</script>

<style>

</style>