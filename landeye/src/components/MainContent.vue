<template>
  <div class="common-layout">
    <el-container class="mainbackground">
      <el-header class="header">
          <div id="mobile-bar" :class="{ 'bx bx-x': isMenuOpen, 'bx bx-menu': !isMenuOpen }"   @click="toggleMenu">
          </div>
          <div class="menu-bar" :class="{ open: isMenuOpen }">
            <li>
              <a @click="goToMenu('/menu/firstpage')">
              <el-icon><House /></el-icon>  首页</a>
            </li>
            <li>
              <a @click="goToMenu('/menu/camera')">
              <el-icon><Camera /></el-icon>  摄像头列表</a>
            </li>
            <li>
              <a @click="goToMenu('/menu/statistics')">
              <el-icon><Histogram /></el-icon>  数据可视化</a>
            </li>
            <li>
              <a @click="goToMenu('/menu/mypage')">
              <el-icon><HomeFilled /></el-icon>  我的</a>
            </li>
        </div>
        <div class="website_name">
          耕地资源智能动态监管系统
        </div>
        <div class='icon_logo'>
        <div id="changelightness_icon" :class="{ 'bx bxs-sun': !isclick, 'bx bx-moon': isclick }"   @click="changelightness"> </div>
        <div>
          <div id='warning_icon' class='bx bxs-bell' @click="toggleWarningMessage"></div>
          <WarningMessage v-if="showWarningMessage" />
        </div>
        <div id="user_icon" class='bx bxs-user'></div>
        <div class='logo'>塔视守望</div>
      </div>
      </el-header>
      <el-main class="main">
        <div class='content'>
        <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import WarningMessage from './WarningMessage.vue' 
  export default {
    components: {
    WarningMessage
    },
    data() {
      return {
        isMenuOpen: false,
        isclick:false,
        showWarningMessage:false,
      };
    },
    methods: {
      toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    goToMenu(path) {
      this.$router.push(path)
      this.isMenuOpen = !this.isMenuOpen
    },
    changelightness(){
      this.isclick = !this.isclick
    },
    toggleWarningMessage() {
      this.showWarningMessage = !this.showWarningMessage;
    }
    }
  }
</script>

<style>
  .common-layout {
    width: 100vw;
    height: 100vh;
  }
  .el-header {
    height:45px;
    z-index:2;
  }
  .icon_logo {
    display:flex;
    justify-content: space-between;
    align-items: center;
    position:relative;
    left:1200px;
    bottom:60px;
    width:320px;
  }
  .mainbackground {
    //background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
    background-color: rgba(203, 207, 137, 0.5);
    height:100%;
  }
  html, body, #app {
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
  }
  .header {
    height: 10%;
    padding: 0;
  }
  .main {
    height: 90%;
    padding: 0;
  }
  .content {
    display:flex;
    background-color:rgba(233, 237, 214, 0.8);
    justify-content:center;
    position:relative;
    height: 100%;
    width:95%;
    border-radius:10px;
    margin: auto;
    z-index:1;
  }
  .el-icon {
    vertical-align: middle; 
    font-size:25px;
  }
  .menu-bar {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 1.25%;
    border-radius: 10px;
    top: 9.5%;
    gap: 30px;
    height: 70vh;
    background-color: rgba(137, 132, 132, 0.8);
    width: 200px;
    align-items: center;
    padding: 20px 0px;
    transform: translateX(-130%);
    transition: all 0.5s ease;
    z-index:2;
    }
  .menu-bar li {
    text-align: center;
    list-style-type: none;
    height:6vh;
    }
  .menu-bar li a {
    color: white;
    text-decoration: none;
    padding-bottom: 4px;
    font-size: 20px;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
  }
  .menu-bar li a:hover {
    border-bottom: 2px solid white;
  }
  .menu-bar.open {
    transform: translateX(0%);
  }
  #mobile-bar {
    display: block;
    position: relative;
    left: 10px;
    top: 20px;
    color: grey;
    font-size: 40px;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .website_name {
    position:relative;
    left:15%;
    bottom:15px;
    font-size: 30px;
    font-family: 'Heiti SC', '黑体', sans-serif;
    font-weight: bold;
  }
  #warning_icon {
    display: block;
    color: grey;
    font-size: 40px;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  #changelightness_icon {
    display: block;
    color: grey;
    font-size: 40px;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  #user_icon {
    display: block;
    color: grey;
    font-size: 40px;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .logo {
    font-size: 25px;
    font-family: 'Heiti SC', '黑体', sans-serif;
    font-weight: bold;
  }
</style>