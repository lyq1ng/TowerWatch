<template>
  <a-table
      :columns="columns"
      :dataSource="data"
      rowKey="id"
  >
    <template v-slot:action="{ record }">
      <a-button type="link" @click="onDetail(record.id)">查看详情</a-button>
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
        { title: 'ID', dataIndex: 'id', width: '8%' },
        {
          title: '经纬度',
          dataIndex: 'lonlat',
          width: '12%',
          customRender: ({ text }) => `${text[0]}, ${text[1]}` // 定制渲染经纬度数组
        },
        { title: '详细地址', dataIndex: 'address', width: '30%', ellipsis: true },
        { title: '在线状态', dataIndex: 'isOnline', width: '16%' },
        { title: '预警次数统计', dataIndex: 'warnCount', width: '16%' },
        {
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          width: '16%',
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
