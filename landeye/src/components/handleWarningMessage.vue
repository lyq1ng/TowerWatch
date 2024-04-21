<template>
    <div class="handlewarningmessage">
        <el-input class='item' placeholder="处理人姓名" />
        <el-date-picker class='item' type="datetime"  placeholder="处理时间"></el-date-picker>
        <el-input class='item' maxlength="100" placeholder="Please input" show-word-limit type="textarea"/>
        <div class="button-container">
          <button>提交图片</button>
          <button @click="message">提交日志</button>
          <button @click="$emit('close')">关闭</button>
        </div>
    </div>
</template>
<script>
  import { ElMessage } from 'element-plus'
  export default{
    methods:{
      message(){
        ElMessage({
          message: '成功提交日志',
          type: 'success',
        }),
        this.$emit('close')
        }
    }
  }
</script>
<style>
.handlewarningmessage {
    position: fixed;
    top: 9%; 
    right: 6%;
    width: 350px; 
    height: auto; 
    background-color: rgb(155, 153, 153);
    border-radius: 10px;
    display: flex; 
    flex-direction: column;  
    z-index:100;
   }
.item {
    width:300px;
    margin-top: 20px;
    margin-left:20px; 
    margin-bottom: 10px;
    border-radius: 10px;
}
.button-container {
  display: flex; 
  justify-content: space-between; 
  margin-top: 50px;
  margin-left:3px; 
  margin-bottom: 20px;
}

.button-container button {
  flex: 1; 
  margin: 0 5px;
  font-size:18px;
  border-radius:4px;
  border:none
}



</style>