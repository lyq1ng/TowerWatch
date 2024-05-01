<template>
  <a-table
      :columns="columns"
      :dataSource="data"
      rowKey="id"
  >
    <template v-slot:action="{ record }">
      <a-button type="primary" class="detail-button" @click="onDetail(record.id)">查看摄像头信息</a-button>
    </template>
  </a-table>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DataTable',
  data() {
    return {
      data: [],
      columns: [
        { title: 'ID', dataIndex: 'id', width: '5%', align:'center',className:'TableSize'},
        {
          title: '经纬度',
          dataIndex: 'lonlat',
          width: '20%',
          align:'center',
          className:'TableSize',
          customRender: ({ text }) => `${text[0]}, ${text[1]}` // 定制渲染经纬度数组
        },
        { title: '详细地址', dataIndex: 'address', width: '30%', ellipsis: true, align:'center', className:'TableSize'},
        { title: '在线状态', dataIndex: 'isOnline', width: '12%', align:'center', className:'TableSize'},
        { title: '预警次数统计', dataIndex: 'warnCount', width: '12%', align:'center', className:'TableSize'},
        {
          title: '操作',
          dataIndex: 'action',
          align:'center',
          slots: { customRender: 'action' },
          width: '16%',
          className:'TableSize'
        },
      ],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get('http://8.148.10.46:3050/api/CameraList')
          .then((response) => {
            this.data = response.data;
            console.log('response',response)
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
    },
    onDetail(id) {
      window.open(`/land-eye?id=${id}`, '_blank');
    }
  }
};
</script>
<style>
td.TableSize {
  font-size:19px;
  font-weight: bold;
  color: #737272;
}
th.TableSize {
  font-size:19px;
  font-weight: bold;
  color: #737272!important;
}
.detail-button {
  display: flex;      /* 使用 flex 布局 */
  align-items: center;  /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  height:100%;
  width: 100%;
  background-color: #4CAF50; /* 绿色背景 */
  color: #fffefe; /* 白色文字 */
  border: none; /* 无边框 */
  padding: 8px 16px; /* 内边距 */
  text-align: center; /* 文字居中 */
  text-decoration: none; /* 无下划线 */
  font-size: 16px; /* 文字大小 */
  margin: 4px 2px; /* 外边距 */
  cursor: pointer; /* 鼠标指针为手形 */
  border-radius: 5px; /* 圆角边框 */
  font-weight: bold;
}
.detail-button:hover {
  background-color: #80de84!important;}
</style>