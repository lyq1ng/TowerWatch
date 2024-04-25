<script lang="ts">
import {ref, reactive, watch, getCurrentInstance, onUnmounted, toRefs, onMounted} from 'vue';
import {AlarmData2, WarnMsgCor} from "../api/WarningMessage";
import axios from 'axios';
export default {
  props: {
    msg: String
  },
  setup(props, { emit }) {
    const currentPage = ref(1);
    const pageSize = 5; // 每页显示条目数
    const totalItems = ref(6); // 总条目数
    //const dataList = reactive([...Array(100).keys()].map(i => `Item ${i + 1}`));
    let dataList = reactive<AlarmData2[]>([])
    const dataLoaded = ref(false);

    const currentData = ref([]);
    let coordinate = reactive<WarnMsgCor[]>([]);
    const cameraid = ref('001');
    const landtype = ref('002')
    const warningrecord = ref('url')

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
        const response = await axios.get<AlarmData2[]>('http://localhost:3050/api/WarnMsg');
        dataList.splice(0, dataList.length, ...response.data);
        console.log('response',response.data);
        console.log('datalist',dataList)
        //获取告警信息栏右侧信息
        /*const response1 = await axios.get<WarnMsgCor[]>('http://localhost:3050/api/WarnMsgRight');
        coordinate.splice(0, coordinate.length, ...response1.data);
        console.log('response1',response1.data)*/
      } catch (error) {
        console.error('Error stack:', error.stack);
        console.error('Error:',error);
      }
    });
    onUnmounted(() => {
      socket.close();
    })

    socket.addEventListener('open', () => {
      // 发送登录请求
      socket.send(JSON.stringify({
        "packettype": 1, "cameraid": c_id, "timestamp": new Date(),
        "name": "Camera Test.", "user": "admin", "password": "ecdis"
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
    // 计算当前页的数据
    const computeCurrentData = () => {
      const startIndex = (currentPage.value - 1) * pageSize;
      const endIndex = currentPage.value * pageSize;
      currentData.value = dataList.slice(startIndex, endIndex);
      dataLoaded.value = true;
    };

    // 监听页码变化
    watch(currentPage, () => {
      computeCurrentData();
    });

    // 处理页码变化事件
    const handlePageChange = (page) => {
      currentPage.value = page;
    };

    computeCurrentData(); // 初始化加载第一页的数据

    function handleItemClick(item) {
      cameraid.value = item.id;
      coordinate.splice(0, coordinate.length, item.cenlon, item.cenlat);
      landtype.value = item.type;
      warningrecord.value = item.date;
      console.log('coor',coordinate);
    }

    function handleMessage(event) {
      console.log("------------------------------------------")
      console.log("message:", event.data);
      console.log("------------------------------------------")
      // 如果接收到errorcode 为406/407 表示摄像头倾斜角为0或负数/坐标不可获得，则清空当前坐标值
      if (JSON.parse(event.data).errorcode === 406 || JSON.parse(event.data).errorcode === 407){
        //console.log("406/407 error::", event.data);
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
  <div class="btn">
    <a-button
        type="primary"
        size="small"
        style="margin-left: 60px"
        @click="turnUp"
    >
      up
    </a-button>
    <a-button type="primary" size="small" @click="turnDown">
      down
    </a-button>
    <a-button type="primary" size="small" @click="turnLeft">
      left
    </a-button>
    <a-button type="primary" size="small" @click="turnRight">
      right
    </a-button>
    <a-button type="primary" size="small" @click="zoomIn">
      +
    </a-button>
    <a-button
        type="primary"
        size="small"
        style="margin-right: 60px"
        @click="zoomOut"
    >
      -
    </a-button>
  </div>
  <div class="content">
    <div class="list">
    <div class="list_top">
      <div style="font-size: 20px;">告警信息</div>
      <div style="display: flex;justify-content: space-between;">
        <span style="margin-left: 16px;">id</span>
        <span>类型</span>
        <span>级别</span>
        <span>日期</span>
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
        <div class="list-item-column">{{ item.warnlevel }}</div>
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
    <h>经纬度坐标: {{ coordinate[0] }} , {{ coordinate[1] }}</h>
    <br>
    <h>摄像头id： {{ cameraid }} </h>
    <br>
    <h>地块类型： {{ landtype }} </h>
    <br>
    <h>告警记录： {{ warningrecord }} </h>
  </div>
  </div>
</template>

<style scoped>
.btn {
  width: 100%;
  height: 12%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn .ant-btn {
  width: 50px;
  height: 20px;
}
.content {
  display: flex;
  height: 88%;
}
.list {
  width: 50%;
  height: 100%;
  border: 2px solid #b4afaf;
  position: relative;
}

.custom-item {
  background-color: #c7c4c4;
}

.custom-item:hover {
  background-color: lightgray;
}

.list_top {
  width: 100%;
  height: 20%;
  font-size: 16px;
  text-align: left;
}

span {
  flex: 1;
  text-align: left;
}

.list-item-column {
  flex: 1; /* 让每个列的宽度均匀 */
  text-align: left;
}

.pagination {
  bottom: 0px;
  right: 0px;
  position: absolute;
}

.message {
  width: 50%;
  height: 100%;
  display: flex; /* 使用 Flexbox 布局 */
  flex-direction: column; /* 垂直布局 */
  justify-content: center; /* 垂直居中 */
  align-items: center;
}

.message h {
  font-size: 16px;
}
</style>