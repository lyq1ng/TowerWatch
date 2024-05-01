<script lang="ts">
import {ref, reactive, watch, getCurrentInstance, onUnmounted, toRefs, onMounted, inject} from 'vue';
import {AlarmData2, WarnMsgCor} from "../api/WarningMessage";//引入对象类型定义
import axios from 'axios';
export default {
  props: {
    msg: String
  },
  setup(props, { emit }) {
    const currentPage = ref(1); //默认当前显示告警信息第一页
    const pageSize = 3; // 每页显示条目数
    const totalItems = ref(20); // 总条目数
    //const dataList = reactive([...Array(100).keys()].map(i => `Item ${i + 1}`));
    let dataList =[]//初始化告警信息列表，属性由类型定义规定
    const dataLoaded = ref(false);//若没有告警信息，则不显示
    const coordinate = inject('coordinate');
    const currentData = ref([]);//初始化当前页的数据

    const cameraid = ref();//初始化摄像头id
    const landtype = ref()//初始化用地类型
    const warningrecord = ref()//初始化告警图片

    let preFilteredCoords = []
    let currentFilteredCoords = []
    let { msg } = toRefs(props)
    const url = "ws://192.168.21.4:58888"; // WebSocket服务器的地址
    const socket = new WebSocket(url);
    var c_id = 320000003


    onMounted(async () => {
      try {
        const { appContext: { config: { globalProperties } } } = getCurrentInstance();
        console.log(globalProperties.$websocketMsg);
        //获取告警信息栏左侧列表
        const response = await axios.get<AlarmData2[]>('http://8.148.10.46:3050/api/WarnMsg');
        dataList.splice(0, dataList.length, ...response.data);
        //console.log('response',response.data);
        console.log('datalist',dataList);
      } catch (error) {
        console.error('Error stack:', error.stack);
        console.error('Error:',error);
      }
      fetchdata()
    });
    onUnmounted(() => {
      socket.close();
    })

    socket.addEventListener('open', () => {
      // 发送登录请求
      socket.send(JSON.stringify({
        "packettype": 1, "cameraid": c_id, "timestamp": new Date(),
        "name": "Camera Test.", "user": "admin", "password": "a8888888"
      }));
      sleep(100);
      socket.send(JSON.stringify({
        "packettype": 13, "cameraid": cameraid, "timestamp": new Date(), "enable": 1, "interval": 1
      }));
    })

    watch(msg, watchHandle);
    watch(() => props.msg, (newMsg, oldMsg) => {
      let data;
      try {
        data = JSON.parse(newMsg);
      } catch (error) {
        console.error('Invalid JSON format:', error);
        currentFilteredCoords = []; // 解析错误时重置当前坐标数据为空数组或其他默认值
        return;
      }

      // 判断packetscr是否为4
      if (data.packetscr === 4) {
        // 更新当前坐标数据
        currentFilteredCoords = data.coords;
      }

      // 如果上一次的坐标数据非空且当前坐标数据为空，则保持上一次的坐标数据不变
      if (preFilteredCoords.length > 0 && currentFilteredCoords.length === 0) {
        currentFilteredCoords = preFilteredCoords;
      }

      // 如果接收到errorcode 为406/407 表示摄像头倾斜角为0或负数/坐标不可获得，则清空当前坐标值
      if (data.errorcode === 406 || data.errorcode === 407){
        currentFilteredCoords = [];
      }

      // 保存当前坐标数据作为下一次的上一次坐标数据
      preFilteredCoords = currentFilteredCoords;
    });
    socket.onmessage = handleMessage;
    const fetchdata  = () => {
      const startIndex = (currentPage.value - 1) * pageSize;
      const endIndex = currentPage.value * pageSize;
      currentData.value = dataList.slice(startIndex, endIndex);
      dataLoaded.value = true;
    };
    // 计算当前页的数据
    // 监听页码变化
    watch(currentPage, () => {
      fetchdata();
    });
    // 处理页码变化事件
    const handlePageChange = (page) => {
      currentPage.value = page;
    };

    function handleItemClick(item) {
      cameraid.value = item.id;
      //coordinate.value.splice(0, coordinate.value.length); // 删除所有现有元素
      //coordinate.value.push(item.cenlon, item.cenlat);
      coordinate.value = [item.cenlon, item.cenlat];
      landtype.value = item.type;
      warningrecord.value = item.date;
      console.log('coor',coordinate);
    }

    function handleMessage(event) {
      // console.log("message:", event.data);
      // 如果接收到errorcode 为406/407 表示摄像头倾斜角为0或负数/坐标不可获得，则清空当前坐标值
      if (JSON.parse(event.data).errorcode === 406 || JSON.parse(event.data).errorcode === 407){
        console.log("406/407 error::", event.data);
        // event.data.lands = [];
        let dd = JSON.parse(event.data);
        let land = []
        dd.land = land;
        emit("change",JSON.stringify(dd));
      }else{
        emit("change", event.data);
      }
      // 表示有错误
      if (JSON.parse(event.data).errorcode !==undefined){
        // todo 处理错误异常
        // console.log(JSON.parse(event.data).errcode)
      } else {
        // 摄像头指向帧坐标
        if (JSON.parse(event.data).packetscr === 7) {
          console.log(222222)
        }
        timer();
      }
    }

    function sleep(ms){
      var unixtime_ms = new Date().getTime();
      while(new Date().getTime() < unixtime_ms + ms) {
        true
      }
    }

    function watchHandle(){
      socket.send(msg.value);
    }

    function timer() {
      setInterval(() => {
      }, 10000);
    }

    function turnUp() {
      socket.send(JSON.stringify({ "packettype": 12, "cameraid": c_id, "timestamp": new Date(), "roam": 1 }
      ))
    }

    function turnDown() {
      socket.send(JSON.stringify({ "packettype": 12, "cameraid": c_id, "timestamp": new Date(), "roam": 5 }
      ))
    }

    function turnLeft() {
      socket.send(JSON.stringify({ "packettype": 12, "cameraid": c_id, "timestamp": new Date(), "roam": 7 }
      ))
    }

    function turnRight() {
      socket.send(JSON.stringify({ "packettype": 12, "cameraid": c_id, "timestamp": new Date(), "roam": 3 }
      ))
    }

    function zoomIn() {
      socket.send(JSON.stringify({ "packettype": 9, "cameraid": c_id, "timestamp": new Date(), "zoom": 1 }
      ))
    }

    function zoomOut() {
      socket.send(JSON.stringify({ "packettype": 9, "cameraid": c_id, "timestamp": new Date(), "zoom": -1 }
      ))
    }

    return {
      currentPage,
      totalItems,
      pageSize,
      currentData,
      dataLoaded,
      handlePageChange,
      coordinate,
      cameraid,
      landtype,
      warningrecord,
      handleItemClick,
      turnDown,
      turnRight,
      turnLeft,
      turnUp,
      zoomIn,
      zoomOut,
      dataList
    };
  },
};
</script>

<template>
  <div class="btn-group">
    <button class="btn" @click="turnUp" style="margin-left: 60px">up</button>
    <button class="btn" @click="turnDown">down</button>
    <button class="btn" @click="turnLeft">left</button>
    <button class="btn" @click="turnRight">right</button>
    <button class="btn" @click="zoomIn">放大</button>
    <button class="btn" @click="zoomOut" style="margin-right: 60px">缩小</button>
  </div>
  <div class="content">
    <div class="list">
    <div class="list_top">
      <div style="font-size: 20px;color:#6c6a6a;margin-left:100px;font-weight: bold">告警信息栏</div>
      <div class="title">
        <span>id</span>
        <span class="type">类型</span>
        <span class="date">日期</span>
      </div>
    </div>
    <a-list
        :dataSource="currentData"
        bordered
        size="small"
        v-if="dataLoaded"
    >
      <template #renderItem="{ item }">
<!--        <a-list-item>{{ item }}</a-list-item>-->
        <a-list-item
            class="custom-item"
            @click="handleItemClick(item)"
        >
        <div class="list-item-column">{{ item.id }}</div>
        <div class="list-item-column">{{ item.warnmsg_type_id }}</div>
        <div class="list-item-column">{{ item.warn_time }}</div>
        </a-list-item>
      </template>
    </a-list>
    <a-pagination
        class="pagination"
        :current="currentPage"
        :total="totalItems"
        :pageSize="pageSize"
        @change="handlePageChange"
    />
  </div>
    <div class="message">
    <h3>经纬度坐标: {{ coordinate[0] }} , {{ coordinate[1] }}</h3>
    <br>
    <h3>摄像头id： {{ cameraid }} </h3>
    <br>
    <h3>地块类型： {{ landtype }} </h3>
    <br>
    <h3>告警记录： {{ warningrecord }} </h3>
  </div>
  </div>
</template>

<style scoped>
.btn {
  background-image: linear-gradient(to right, #25aae1, #40e495);
  box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
  border: 0;
  width: 65px;
  height: 30px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 50px;
  color: white;
  outline: none;
  cursor: pointer;
}
.btn:hover {
  transform: translateY(-2px); /* 悬停时按钮向上移动 2px */
}

.btn:active {
  transform: translateY(1px); /* 点击时按钮向下移动 1px */
  box-shadow: 0 1px 3px 0 rgba(49, 196, 190, 0.75); /* 添加点击时的阴影效果 */
}
.btn-group {
  width: 100%;
  height: 12%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content {
  display: flex;
  height: 88%;
}
.title {
  padding: 0 20px;
  font-weight: bold;
  color:#6c6a6a;
  .type {
    padding-left: 30px;
  }
  .date {
    padding-left: 100px;
  }
}
.list {
  width: 60%;
  height: 100%;
  position: relative;
  border-radius: 10px;

}

.custom-item {

}

.custom-item:hover {
  background-color: #99d088;

}

.list_top {
  width: 100%;
  height: 23%;
  font-size: 16px;
  text-align: left;
}

span {
  flex: 1;
  text-align: left;
}

.list-item-column {
  height:50px;
  text-align: left;
  font-weight: bold;
  padding-top: 10px;
  color:#6c6a6a;
  font-size:16px;

}

.pagination {
  top: 90%;
  right: 10%;
  width:300px;
  position: absolute;
}

.message {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  color:#6c6a6a;
}

.message h3 {
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  margin-left: 10px;
}
</style>