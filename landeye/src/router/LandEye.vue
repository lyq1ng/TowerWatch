<script>
import MapComponent from "./MapComponent.vue";
import WarningMessage from "./WarningMessage.vue";
import {ref, provide, reactive, watch} from "vue";
import PolygonsDisplay from "./PolygonsDisplay.vue";
import {useRoute} from "vue-router";
export default {
  components:{
    PolygonsDisplay,
    MapComponent,
    WarningMessage,
  },
  setup(){
    let msg = ref('')
    let coordinate = ref([]);
    const router = useRoute()
    const lonlat = router.query?.center
    console.log(lonlat)
    const center = lonlat.split(',').map(coord => parseFloat(coord))
    provide('coordinate', coordinate);

    const route = useRoute();
    console.log('Current route query:', route.query);
    const cameraId = ref(route.query.id);
    const coordinates = ref(route.query.lonlat ? route.query.lonlat.split(',').map(Number) : []);
    provide('cameraId',cameraId);
    provide('coordinates',coordinates);

    function changeWsMsg(data) {
      msg.value = data
      console.log('hello')
      console.log(data)
    }

    return {
      msg,
      changeWsMsg,
      coordinate,
      center,
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
        <MapComponent :msg="msg" :center="center" @change="changeWsMsg" :coordinate="coordinate"/>
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
  background-color: #ACD59F;
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
.website_name {
  position:absolute;
  right:10%;
  top:2%;
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
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 40%;
  background-color: white;
}

.left-top {
  background-color: #eaeaea;
  height: 55%;
  border-radius: 10px;
}

.left-bottom {
  height: 45%;
  border-radius: 10px;
}

.right {
  background-color: #f9f9f9;
  width: 60%;
  padding: 10px;
}
.logopart{
  display:flex;
}
.logo {
  font-size: 26px;
  font-weight: bold;
  color:#287042;
  margin-left: 15px;
  margin-top: 5px;
}
.logoimg {
  width:45px;
}
</style>