<template>
  <div>
    <ul>
      <li @click="remStu(i)" v-for="(item,i) in state.list" :key="item.id">{{item.name}}</li>
    </ul>
    <div>{{age}}</div>
    <button @click="changeAge">改变age</button>
    <button @click="goback">回首页</button>
    <button @click="gobackParams">回首页带参数</button>
  </div>
</template>

<script>
/*
什么是reactive？
- reactive 是vue3中提供的实现响应式数据的方法
- 在vue2中响应式数据是通过defineProperty 来实现的
- 在vue3中响应式数据是通过es6的Proxy来实现
reactive 注意点：
- reactive 参数必须是对象
- 如果给reactive传递了其他对象
  + 默认情况下修改对象，界面不会自动刷新
  + 如果想更新，可以通过重新赋值的方式
* */

/*
什么是ref?
- ref 和 reactive 一样，也是用来实现响应式数据的方法
- 由于reactive必须传递一个对象，所以导致企业在开发中如果只想让
  某个变量实现响应式的时候会非常麻烦，所以vue3就给我们提供了ref方法。
  实现对简单值的监听
ref本质：
  - ref 底层的本质其实还是reactive
    系统会自动根据我们给的ref传入的值将它转换成ref(xx)-> reactive({value:xx})
ref注意点：
  - 在vue template中使用ref的值不用通过value获取
  - 在js中使用ref的值必须通过value获取   
 * 
 */
import { reactive,ref} from 'vue'
import {useRouter} from 'vue-router'
export default {
  setup(){ 
    //方法提取
    const router = useRouter()
    let {state,remStu} = useItem();
    let age = ref(18)
    function changeAge() {
      age.value = 20
    }
    function goback() {
      router.push('/')
    }
    const gobackParams =()=>{
      router.push({
        path:'/',
        query:{
          inType:1
        }
      })
    }
    return{
      state,
      remStu,
      age,
      changeAge,
      goback,
      gobackParams
    }
  }
}
//也可以把这些单独抽离成js文件
function useItem(){
  let state = reactive({ //reactive监听复杂类型的变化
    list:[
      {id:1,name:'张三'},
      {id:2,name:'李四'},
      {id:3,name:'王五'}
    ]
  })
  function remStu(index){
    state.list.splice(index,1)
  }
  
  return {state,remStu}
}

/*
1.递归监听
默认情况下，无论是通过ref还是reactive都是递归监听

2.递归监听存在的问题
如果数据量比较大，非常消耗性能

3.非递归监听
shallowReactive,shallowRef
注意点：如果是通过shallowRef创建数据
那么vue监听的是.value的变化，并不是第一层的变化

vue3只提供triggerRef方法，没有提供triggerReactive方法
所以如果是reactive类型的数据，那么是无法主动触发界面更新

4.应用场景
一般情况下我们 使用 ref和reactive即可
只有在需要监听的数据量比较大的时候，我们才使用shallowReactive,shallowRef

* */
</script>

<style>

</style>