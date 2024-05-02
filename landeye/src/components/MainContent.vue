<template>
    <el-container class="mainbackground">
      <div class="menu-bar" >
        <div class="logopart">
          <img class="logoimg" src="/img/logo.png" alt="">
          <div class='logo'>塔视守望</div>
        </div>
        <div class="menu_content">
        <div id="item1" class="menu_item" @click="goToMenu('/menu/firstpage')">
          <el-icon class="menu_icon"><HomeFilled /></el-icon>
          <a class="menuitem_text">首页</a>
        </div >
        <div id="item2" class="menu_item" @click="goToMenu('/menu/camera')">
          <el-icon class="menu_icon"><CameraFilled /></el-icon>
          <a class="menuitem_text" >摄像头列表</a>
        </div>
        <div id="item3" class="menu_item" @click="goToMenu('/menu/statistics')">
          <el-icon class="menu_icon"><Histogram /></el-icon>
          <div class="menuitem_text" >数据可视化</div>
        </div>
        </div>
      </div>
      <el-header class="header">
        <div class="website_name">
          自然资源智能动态监管系统
        </div>
        <img class="headerimg" src="/img/header.png" alt="">
        <div class='icon_logo'>
          <div id='warning_icon' class='bx bxs-bell' @click="toggleWarningMessage"></div>
          <div id="changelightness_icon" :class="{ 'bx bxs-sun': !isclick, 'bx bx-moon': isclick }"   @click="changelightness"> </div>
          <WarningMessage :showWarningMessage="showWarningMessage" />
          <div id="user_icon" class='bx bxs-user'></div>
      </div>
      </el-header>
      <el-main class="main">
        <div class='content'>
            <router-view></router-view>
        </div>
      </el-main>
    </el-container>
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
      goToMenu: function (path) {
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
  .mainbackground {
     width: 100vw;
     height: 100vh;
     //background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
     background-color:#ACD59F;
   }
  html, body, #app {
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
  }
  .header {
    position:absolute;
    display:flex;
    height: 10%;
    padding: 0;
    width:88%;
    left:12%;
    z-index:2;
  }
  .main {
    display: flex;
    position:absolute;
    height: 90%;
    padding: 0;
    left:12%;
    width:89%;
    top:10%;
  }
  .menu-bar {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 0;
    gap: 10vh;
    border-radius: 1vh;
    height: 100%;
    background-color: rgba(215, 217, 207, 0.8);
    //background-color: rgba(172,213,159,0.4);
    width: 12%;
    align-items: center;
    padding: 20px 0;
    z-index:2;
    }
  .menu_content {
    position:absolute;
    top:12%;
    display: flex;
    flex-direction: column;
    gap: 3vh;
    border-radius: 1vh;
    width: 100%;
    align-items: center;
  }
  .menu_item {
    display: flex;
    height:7vh;
    width:100%;
    background-color:transparent;
    align-items:center;
    padding-left: 1.5vw;
    }
  .menuitem_text  {
    color: #777575;
    text-decoration: none;
    font-size: 1.25vw;
    font-weight: bold;
    display: block;
  }
  .menu_item:hover {
    width:100%;
    display: flex;
    list-style-type: none;
    height:7vh;
    align-items:center;
    background-color: rgba(57, 203, 124, 0.4);
  }
  .menu_item:hover .menuitem_text{
     color: #fffdfd
   }
  .menu_icon {
    color: #777575;
    font-size: 3.5vh;
    font-weight: bold;
  }
  .menu_item:hover .menu_icon{
    color: #fffdfd
  }
  .logopart{
    display:flex;
    position: absolute;
    top:2.5%;
    left:10%;
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
  #item1::after {
    content: ''; /* 伪元素内容为空 */
    position: absolute; /* 绝对定位 */
    right: 0; /* 右侧与li元素右侧对齐 */
    width: 1vh; /* 伪元素的宽度 */
    height:7vh; /* 伪元素的高度与li元素相同 */
    background-color: #2fb06b; /* 伪元素的背景颜色 */
    opacity: 0; /* 初始透明度为0，使其不可见 */
  }
  #item1:hover::after {
    opacity: 0.5; /* 悬停时透明度变为0.5，使其可见 */
  }
  #item2::after {
    content: ''; /* 伪元素内容为空 */
    position: absolute; /* 绝对定位 */
    right: 0; /* 右侧与li元素右侧对齐 */
    width: 1vh; /* 伪元素的宽度 */
    height: 7vh; /* 伪元素的高度与li元素相同 */
    background-color: #2fb06b; /* 伪元素的背景颜色 */
    opacity: 0; /* 初始透明度为0，使其不可见 */
  }
  #item2:hover::after {
    opacity: 0.5; /* 悬停时透明度变为0.5，使其可见 */
  }
  #item3::after {
    content: ''; /* 伪元素内容为空 */
    position: absolute; /* 绝对定位 */
    right: 0; /* 右侧与li元素右侧对齐 */
    width: 1vh; /* 伪元素的宽度 */
    height: 7vh; /* 伪元素的高度与li元素相同 */
    background-color: #2fb06b; /* 伪元素的背景颜色 */
    opacity: 0; /* 初始透明度为0，使其不可见 */
  }
  #item3:hover::after {
    opacity: 0.5; /* 悬停时透明度变为0.5，使其可见 */
  }
  .content {
    display:flex;
    background-color:rgba(233, 237, 214, 0.8);
    position:absolute;
    height:100%;
    width:95%;
    border-radius: 1vh;
    padding:10px;
    z-index:1;
  }
  .website_name {
    position:absolute;
    left:5%;
    top:30%;
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
  .icon_logo {
    display:flex;
    justify-content: space-between;
    position:absolute;
    right:2%;
    top:25%;
    width:12.5%;
  }
  #warning_icon {
    display: block;
    color: #eae8e8;
    font-size: 5vh;
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
    font-size: 5vh;
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
    font-size: 5vh;
    transition: all 0.3s ease;
    cursor: pointer;
    padding-bottom:1px;
  }
  #user_icon:hover {
    color: #61B087;
    border-bottom:2px solid;
  }
</style>