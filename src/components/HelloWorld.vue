<template>
  <div class="hello">
    <div>hello world</div>
    <button @click="emitParent">emit event</button>
    <div>name: --- {{username}}</div>
  </div>
</template>

<script>
import {reactive, watchEffect} from 'vue'
export default {
  name: 'HelloWorld',
  props:{
    username:String,
    default:''
  },
  setup(props,{emit}){
    console.log(props.list)
    const state = reactive({
      result:'to parent',
    })
    const emitParent=()=>{
      emit('sendMsg',state.result)
    }
    
    return{
      emitParent
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
