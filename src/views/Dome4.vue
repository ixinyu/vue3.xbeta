<template>
  <div>
    <div>to do list</div>
    <div>
      <input type="text" v-model="ipt" placeholder="请输入内容">
    </div>
    <div>
      <button @click="add">添加</button>
    </div>
    <ul>
      <li v-for="(item,i) in state.list" :key='i'>
        {{item}}
        <span @click="del(i)">删除</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {ref,reactive,onMounted,onUpdated,onUnmounted} from 'vue'
export default {
  name:'dome4',
  setup(){
    let ipt = ref('')
    let {state,del,add} = todolist(ipt)
    onMounted(()=>{
      // console.log('onMounted')
    })
    onUpdated(()=>{
      // console.log('onUpdated')
    })
    onUnmounted(()=>{
      // console.log('onUnmounted')
    })

    return{
      state,
      del,
      add,
      ipt
    }
  }
}

function todolist(ipt) {
  let state = reactive({
      list:[]
  })
  const del=(index)=>{ //删除
      // console.log(index)
      state.list.splice(index,1)
    }
    const add=()=>{ //添加
      state.list.push(ipt.value)
      ipt.value = ''
    }
    return { state,del,add }
}
</script>

<style>

</style>