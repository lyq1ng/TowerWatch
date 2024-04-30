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
          自然资源智能动态监管系统
        </div>
        <img class="headerimg" src="/img/header.png" alt="">
        <div class='icon_logo'>
        <div id="changelightness_icon" :class="{ 'bx bxs-sun': !isclick, 'bx bx-moon': isclick }"   @click="changelightness"> </div>
        <div>
          <div id='warning_icon' class='bx bxs-bell' @click="toggleWarningMessage"></div>
          <WarningMessage :showWarningMessage="showWarningMessage" /></div>
        <div id="user_icon" class='bx bxs-user'></div>
        <div class='logo'>塔视守望</div>
        <img class="logoimg" src="/img/logo.png" alt="">
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
    position:relative;
    left:1200px;
    bottom:60px;
    width:320px;
  }
  .mainbackground {
    //background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
    background-color:#ACD59F;
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
    margin:auto;
    border-radius:10px;
    padding:10px;
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
    left: 2.25%;
    border-radius: 10px;
    top: 10%;
    gap: 30px;
    height: 70vh;
    background-color: #5ecc89;
    width: 200px;
    align-items: center;
    padding: 20px 0;
    transform: translateX(-130%);
    transition: all 0.5s ease;
    z-index:2;
    opacity: 0.9
    }
  .menu-bar li {
    text-align: center;
    list-style-type: none;
    height:6vh;
    }
  .menu-bar li a {
    color: #f3f6f2;
    text-decoration: none;
    padding-bottom: 4px;
    font-size: 20px;
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;

  }
  .menu-bar li a:hover {
    border-bottom: 2px solid;
  }
  .menu-bar.open {
    transform: translateX(0%);
  }
  #mobile-bar {
    display: block;
    position: relative;
    left: 40px;
    top: 20px;
    color: #61B087;
    font-size: 40px;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .website_name {
    position:relative;
    left:8%;
    bottom:15px;
    font-size: 30px;
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
    color:#287042;
  }
  .headerimg{
    position:fixed;
    width:430px;
    height:110px;
    top:0%;
    left:37%;
  }
  #warning_icon {
    display: block;
    color: #eae8e8;
    font-size: 40px;
    transition: all 0.3s ease;
    cursor: pointer;
    padding-bottom: 1px;
  }
  #warning_icon:hover {
    color: #61B087;
    border-bottom: 2px solid ;
  }
  #changelightness_icon {
    display: block;
    color: #eae8e8;
    font-size: 40px;
    transition: all 0.3s ease;
    cursor: pointer;
    padding-bottom: 1px;
  }
  #changelightness_icon:hover {
    color: #61B087;
    border-bottom:2px solid;
  }
  #user_icon {
    display: block;
    color: #eae8e8;
    font-size: 40px;
    transition: all 0.3s ease;
    cursor: pointer;
    padding-bottom:1px;
  }
  #user_icon:hover {
    color: #61B087;
    border-bottom:2px solid;
  }
  .logo {
    padding-top: 3px;
    font-size: 30px;
    font-weight: bold;
    color:#287042;
  }
  .logoimg {
    position:fixed;
    right:2%;
    top:1%;
    width:65px;
  }
</style>