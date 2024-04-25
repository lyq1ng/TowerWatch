<script>
import MapComponent from "./MapComponent.vue";
import WarningMessage from "./WarningMessage.vue";
import {ref} from "vue";
import PolygonsDisplay from "./PolygonsDisplay.vue";
export default {
  components:{
    PolygonsDisplay,
    MapComponent,
    WarningMessage,
  },
  setup(){
    let msg = ref('')

    function changeWsMsg(data) {
      msg.value = data
      console.log('hello')
      console.log(data)
    }

    return {
      msg,
      changeWsMsg,
    }
  }
}
</script>

<template>
  <div class="main-container">
  <header>
    <h1 style="font-size: 35px;">塔视守望——自然资源智能动态监管系统</h1>
  </header>
  <div class="container">
    <div class="left">
      <div class="left-top">
        <PolygonsDisplay :msg="msg" @change="changeWsMsg"/>
      </div>
      <div class="left-bottom">
        <WarningMessage :msg="msg" @change="changeWsMsg"/>
      </div>
    </div>
    <div class="right">
      <MapComponent :msg="msg" @change="changeWsMsg"/>
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
  background-color: #333;
  color: #fff;
  padding: 10px;
  text-align: center;
  height: 10%;
}

.container {
  display: flex;
  flex-direction: row;
  height: 90%;
}

.left {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 40%;
  background-color: white;
}

.left-top {
  background-color: #eaeaea;
  height: 55%;
}

.left-bottom {
  background-color: #eaeaea;
  height: 45%;
}

.right {
  background-color: #f9f9f9;
  width: 60%;
  padding: 10px;
}
</style>
