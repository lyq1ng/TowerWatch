<template>
  <div class="common-layout">
    <el-container class="mainbackground">
      <img class='leaf1' src="/img/leaf.png">
      <img class='leaf2' src="/img/leaf.png">
      <el-header class="header">
          <div class="menu-bar" >
            <li id="item1">
              <a @click="goToMenu('/menu/firstpage')">
              <el-icon><House /></el-icon>  首页</a>
            </li >
            <li id="item2">
              <a @click="goToMenu('/menu/camera')">
              <el-icon><Camera /></el-icon>  摄像头列表</a>
            </li>
            <li id="item3">
              <a @click="goToMenu('/menu/statistics')">
              <el-icon><Histogram /></el-icon>  数据可视化</a>
            </li>
            <li id="item4">
              <a @click="goToMenu('/menu/mypage')">
              <el-icon><HomeFilled /></el-icon>  我的</a>
            </li>
        </div>
        <div class="website_name">
          自然资源智能动态监管系统
        </div>
        <img class="headerimg" src="/img/header.png" alt="">
        <div class='icon_logo'>
          <div id='warning_icon' class='bx bxs-bell' @click="toggleWarningMessage"></div>
          <div id="changelightness_icon" :class="{ 'bx bxs-sun': !isclick, 'bx bx-moon': isclick }"   @click="changelightness"> </div>
          <WarningMessage :showWarningMessage="showWarningMessage" />
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
    position:fixed;
    right:2%;
    top:2.5%;
    width:160px;
  }
  .mainbackground {
    //background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
    background-color:#ACD59F;
    height:100%;
  }
  .leaf1 {
    position:fixed;
    left:-85px;
    top:50px;
    width:500px;
    height:750px
  }
  .leaf2 {
    position:fixed;
    right:-90px;
    top:50px;
    width:500px;
    height:750px;
    opacity:0.6
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
    position:relative;
    height:100%;
    width:82%;
    border-radius:10px;
    padding:10px;
    z-index:1;
    margin-left:170px;
  }
  .el-icon {
    vertical-align: middle; 
    font-size:25px;
  }
  .menu-bar {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 10%;
    gap: 27px;
    height: 100%;
    background-color: rgba(172,213,159,0.4);
    width: 170px;
    align-items: center;
    padding: 20px 0;
    z-index:2;

    }
  .menu-bar li {
    list-style-type: none;
    height:6vh;
    width:100%;
    background-color: transparent;
    }
  .menu-bar li :hover {
    list-style-type: none;
    height:7vh;
    width:100%;
    background-color: rgba(57, 203, 124, 0.4);
  }
  .menu-bar li a {
    color: #f3efef;
    text-decoration: none;
    padding-top: 14px;
    font-size: 19px;
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
    padding-left: 20px;
    padding-right: 10px;
    display: block;
  }
  #item1::after {
    content: ''; /* 伪元素内容为空 */
    position: absolute; /* 绝对定位 */
    top:20px; /* 顶部与li元素顶部对齐 */
    right: 0; /* 右侧与li元素右侧对齐 */
    width: 8px; /* 伪元素的宽度 */
    height: 52px; /* 伪元素的高度与li元素相同 */
    background-color: #2fb06b; /* 伪元素的背景颜色 */
    opacity: 0; /* 初始透明度为0，使其不可见 */
  }
  #item1:hover::after {
    opacity: 0.5; /* 悬停时透明度变为0.5，使其可见 */
  }
  #item2::after {
    content: ''; /* 伪元素内容为空 */
    position: absolute; /* 绝对定位 */
    top:92px; /* 顶部与li元素顶部对齐 */
    right: 0; /* 右侧与li元素右侧对齐 */
    width: 8px; /* 伪元素的宽度 */
    height: 52px; /* 伪元素的高度与li元素相同 */
    background-color: #2fb06b; /* 伪元素的背景颜色 */
    opacity: 0; /* 初始透明度为0，使其不可见 */
  }
  #item2:hover::after {
    opacity: 0.5; /* 悬停时透明度变为0.5，使其可见 */
  }
  #item3::after {
    content: ''; /* 伪元素内容为空 */
    position: absolute; /* 绝对定位 */
    top:164px; /* 顶部与li元素顶部对齐 */
    right: 0; /* 右侧与li元素右侧对齐 */
    width: 8px; /* 伪元素的宽度 */
    height: 52px; /* 伪元素的高度与li元素相同 */
    background-color: #2fb06b; /* 伪元素的背景颜色 */
    opacity: 0; /* 初始透明度为0，使其不可见 */
  }
  #item3:hover::after {
    opacity: 0.5; /* 悬停时透明度变为0.5，使其可见 */
  }
  #item4::after {
    content: ''; /* 伪元素内容为空 */
    position: absolute; /* 绝对定位 */
    top:236px; /* 顶部与li元素顶部对齐 */
    right: 0; /* 右侧与li元素右侧对齐 */
    width: 8px; /* 伪元素的宽度 */
    height: 52px; /* 伪元素的高度与li元素相同 */
    background-color: #2fb06b; /* 伪元素的背景颜色 */
    opacity: 0; /* 初始透明度为0，使其不可见 */
  }
  #item4:hover::after {
    opacity: 0.5; /* 悬停时透明度变为0.5，使其可见 */
  }
  .website_name {
    position:fixed;
    right:14%;
    top:3%;
    bottom:15px;
    font-size: 28px;
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
    opacity:0.85
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
    position:fixed;
    left:3.5%;
    top:3%;
    font-size: 26px;
    font-weight: bold;
    color:#287042;
  }
  .logoimg {
    position:fixed;
    left:0.5%;
    top:2%;
    width:45px;
  }
</style>