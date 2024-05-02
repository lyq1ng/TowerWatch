<script>
import MapComponent from "./MapComponent.vue";
import WarningMessage from "./WarningMessage.vue";
import {ref,provide} from "vue";
import PolygonsDisplay from "./PolygonsDisplay.vue";
export default {
  components:{
    PolygonsDisplay,
    MapComponent,
    WarningMessage,
  },
  setup(){
   let msg = ref('')
   let coordinate = ref([]);
    provide('coordinate', coordinate);
    function changeWsMsg(data) {
      msg.value = data
      console.log('hello')
      console.log(data)
    }

    return {
      msg,
      changeWsMsg,
      coordinate
    }
  },
  methods: {
    // 更新coordinate数组的方法
    handleUpdateCoordinate(newCoordinate) {
      this.coordinate = newCoordinate;
    },
  },
}
</script>

<template>
  <div class="main-container">
  <header>
    <div class="logopart">
      <img class="logoimg" src="/img/logo.png" alt="">
      <div class='logo'>塔视守望</div>
    </div>
    <img class="headerimg" src="/img/header.png" alt="">
    <h1 class="website_name">自然资源智能动态监管系统</h1>
  </header>
  <div class="container">
    <div class="left">
      <div class="left-top">
        <PolygonsDisplay :msg="msg" @change="changeWsMsg"/>
      </div>
      <div class="left-bottom">
        <WarningMessage :msg="msg" @change="changeWsMsg" :coordinate="coordinate" @updateCoordinate="handleUpdateCoordinate"/>
      </div>
    </div>
    <div class="right">
      <MapComponent :msg="msg" @change="changeWsMsg" :coordinate="coordinate"/>
    </div>
  </div>
  </div>
</template>

<style scoped>
.main-container {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 0;
  text-align: center;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  background-color: #242424;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
header {
  position: absolute;
  width:100%;
  background-color: #ACD59F;
  color: #fff;
  padding: 10px;
  text-align: center;
  height: 10%;
  z-index: 100;
}
.container {
  position: absolute;
  display: flex;
  flex-direction: row;
  top:10%;
  height: 90%;
  width:100%;
}
.website_name {
  position:absolute;
  right:10%;
  top:15%;
  font-size: 2vw;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  color:#287042;
}
.headerimg{
  position:absolute;
  width:50vh;
  height:12vh;
  top:0;
  left:35%;
  opacity:0.85
}
.left {
  position:absolute;
  display: flex;
  flex-direction: column;
  left:0;
  top:0;
  padding: 10px;
  width: 40%;
  height: 100%;
  background-color: white;
}

.left-top {
  display: flex;
  position: absolute;
  background-color: #eaeaea;
  left:0;
  top:0;
  width: 100%;
  height: 55%;
  border-radius: 10px;
}
.left-bottom {
  display: flex;
  position: absolute;
  left:0;
  top:55%;
  height: 45%;
  width:100%;
  border-radius: 10px;
  flex-direction: column;
}

.right {
  left:40%;
  position: absolute;
  background-color: #f9f9f9;
  width: 60%;
  padding: 0.5vh;
  height: 100%;
}
.logopart{
  display:flex;
  position: absolute;
  top:15%;
  left:2%;
}
.logo {
  font-size: 1.5vw;
  font-weight: bold;
  color:#287042;
  margin-left:0.5vw;
  margin-top: 1vh;
}
.logoimg {
  width:2.7vw;
  height: 5.5vh;
}
</style>
