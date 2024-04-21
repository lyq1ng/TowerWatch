<template>
    <div class="warningmessage">
        <div class="warningmessage_item"><span>日期 类型 经度 纬度 <button @click="ishandle">上传日志</button></span></div>
        <div class="warningmessage_item"><span>日期 类型 经度 纬度 <button @click="ishandle">上传日志</button></span></div>
        <div class="warningmessage_item"><span>日期 类型 经度 纬度 <button @click="ishandle">上传日志</button></span></div>
    </div>
    <handleWarningMessage v-if="showlog" @close="ishandle" />
</template>
<script>
  import handleWarningMessage from './handleWarningMessage.vue'
  export default {
    components:{
        handleWarningMessage
    },
    data(){
      return {
        showlog:false,
      }
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
    top: 9%; 
    right: 6%;
    width: 350px; 
    height: 300px; 
    background-color: rgba(155, 153, 153,0.9); 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    z-index:3;
   }
   .warningmessage_item {
    border-radius: 10px;
    vertical-align: middle;
    margin-top:10px;
    margin-bottom: 10px;
    background-color: rgba(141, 139, 139, 0.45);
    width: 90%; 
    height: 50px;
    display: flex; 
   }
   .warningmessage_item span {
    margin-top: 8px;
    margin-left:35px;
    font-size:18px;
    color:rgb(238, 235, 235);
   }
   .warningmessage_item button {
  margin-left: 10px; /* 在按钮和文本之间添加一些空间 */
  background-color:rgba(133, 132, 132, 0.6);
  font-size:16px;
  border-radius: 4px; /* 边角圆滑 */
  cursor: pointer; 
  transition-duration: 0.4s;
  color:rgb(237, 235, 235);
  padding:5px;
  border:none;
  }
  .warningmessage_item button:hover {
  background-color: #bac2bb; /* 鼠标悬停时的背景颜色 */
  }

</style>
  
