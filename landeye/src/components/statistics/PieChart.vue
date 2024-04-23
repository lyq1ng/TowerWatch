<template>
    <div class="Container">
      <span class="j_1"></span>
      <span class="j_2"></span>
      <span class="j_3"></span>
      <span class="j_4"></span>
      <div class="data_title">数据处理情况</div>
      <ul class="zpsl-box" >
        <li>
          <span>待审核</span>
          <span>341条</span>
        </li>
        <li>
          <span>未处理</span>
          <span>41条</span>
        </li>
        <li>
          <span>累计处理</span>
          <span>1000条</span>
        </li>
     </ul>
    </div>
</template>

<script>
/*import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';*/

</script>
<style>
.Container{
  position:relative;
  width: 800px;
  height: 270px;
  border: #ffffff solid 2px;
  background: linear-gradient(rgba(183,245,222,0.5),rgba(128,128,128,0));
  box-sizing: border-box;
}
.zpsl-box li::after{
  margin-top: 1.2rem;
  width: 500px;
  height:300px;
  border: #1a3f72 solid 2px;
  background: rgba(41,85,252,.2);
  position: relative;
  box-sizing: border-box;
}
.zpsl-box li{
  width: 200px;
  height: 200px;
  float: left;
  //margin: 0 20px;
  position: relative;
  margin-left:40px;
  margin-bottom:10px;
  top:30px
}
.zpsl-box li:nth-of-type(3):before{
  width: 215px;height: 215px;
  content: "";
  position: absolute;
  top:0;left:0;
  background:url("/img/bqzlbg002.png") no-repeat;
  background-size: 100% 100%;
  animation: animation-rotate 4s linear infinite;
}
.zpsl-box li:nth-of-type(2):before{
  width: 215px;height: 215px;
  content: "";
  position: absolute;
  top:0;left:0;
  background:url("/img/bqzlbg001.png") no-repeat;
  background-size: 100% 100%;
  animation: animation-rotate1 4s linear infinite;
}
.zpsl-box li:nth-of-type(1):before{
  width: 215px;height: 215px;
  content: "";
  position: absolute;
  top:0;left:0;
  background:url("/img/bqzlbg002.png") no-repeat;
  background-size: 100% 100%;
  animation: animation-rotate 4s linear infinite;
}
@keyframes animation-rotate {
  0% {
    transform: rotatez(360deg)
  }
  100% {
    transform: rotatez(0deg)
  }
}
@keyframes animation-rotate1 {
  0% {
    transform: rotatez(0deg)
  }
  100% {
    transform: rotatez(360deg)
  }
}
@keyframes animation-rotate2 {
  0% {
    transform: rotatez(0deg)
  }
  100% {
    transform: rotatez(360deg)
  }
}
.zpsl-box li span{
  display: block;
  width: 100%;
  text-align: center;
  color:#ffffff;
  font-size: 18px;
}
.zpsl-box li span:nth-of-type(1){
  font-size: 22px;
  font-weight: bold;
  margin-top: 60px;
}
.zpsl-box li span:nth-of-type(2){
  margin-top: 40px;
  font-size: 26px;
}
.zpsl-box li span:nth-of-type(2){
  margin-top: 40px;
  font-size: 26px;
}
.zpsl-box li:nth-of-type(1) span:nth-of-type(1){
  color:#9DF9FC
}
.zpsl-box li:nth-of-type(2) span:nth-of-type(1){
  color:#D3FCA0
}
.zpsl-box li:nth-of-type(1) span:nth-of-type(1){
  color:#9DF9FC
}
.j_1{
  width: 23px;
  height: 23px;
  position: absolute;
  top: -2px;
  left: -2px;
  border-left: 3px solid #808080;
  border-top: 3px solid #808080;
}
.j_2{
  width: 23px;
  height: 23px;
  position: absolute;
  top: -2px;
  right: -2px;
  border-right: 3px solid #808080;
  border-top: 3px solid #808080;
}
.j_3{
  width: 23px;
  height: 23px;
  position: absolute;
  bottom: -2px;
  left: -2px;
  border-left: 3px solid #808080;
  border-bottom: 3px solid #808080;
}
.j_4{
  width: 23px;
  height: 23px;
  position: absolute;
  bottom: -2px;
  right: -2px;
  border-right: 3px solid #808080;
  border-bottom: 3px solid #808080;
}
.data_title{
  width: 100%;
  height: 30px;
  text-align: center;
  color: #000000;
  font-size: 2.2rem;
  font-Weight: bold;
  line-height: 40px;
}

</style>

