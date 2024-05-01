<template>
    <div class="warningmessage" :style="{top:showWarningMessage? '10%':'-100%' ,opacity: showWarningMessage? 0.9:0}">
        <div class="warningmessage_item"><span>告警信息1</span> <button @click="ishandle" >上传日志</button></div>
        <div class="warningmessage_item"><span>告警信息2</span> <button @click="ishandle" >上传日志</button></div>
        <div class="warningmessage_item"><span>告警信息3</span> <button @click="ishandle" >上传日志</button></div>
    </div>
    <handleWarningMessage :showlog="showlog" @close="ishandle" />
</template>
<script>
  import handleWarningMessage from './handleWarningMessage.vue'
  export default {
    components:{
        handleWarningMessage
    },
    props: {
      showWarningMessage: {
        type: Boolean,
        default: false // 如果父组件没有传递这个值，默认为false
      }},
      data(){
      return {
        showlog:false,
      };
    },
    methods:{
      ishandle(){
        this.showlog = !this.showlog
      }
    }
  }

</script>
<style>
  .warningmessage {
    position: fixed;
    border-radius: 10px;
    top: -100%;
    right: 0%;
    width: 350px; 
    height: 300px;
    background-color: #51b679;
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    z-index:3;
    transition: opacity 0.5s ease-out;
    opacity: 0;
   }
   .warningmessage_item {
    border-radius: 10px;
    justify-content: space-between;
    margin-top:10px;
    margin-bottom: 5px;
    width: 90%; 
    height: 50px;
    display: flex;
    border-style: dashed;
    border-width: 4px;
    border-color: #dbe5d8;
    background-color: transparent;
   }
   .warningmessage_item span {
    margin-top: 13px;
    margin-left:35px;
    font-size:18px;
    color: #dbe5d8;
     font-weight: bold;
   }
   .warningmessage_item button {
  margin-left: 10px; /* 在按钮和文本之间添加一些空间 */
  font-size:16px;
  border-radius: 4px; /* 边角圆滑 */
  cursor: pointer; 
  transition-duration: 0.4s;
  background-color: #a5e88f;
  padding:5px;
  border:none;
  color: #565654;
  font-weight: bold;
   }
  .warningmessage_item button:hover {
  background-color: #c5efb8; /* 鼠标悬停时的背景颜色 */
  }

</style>
  
