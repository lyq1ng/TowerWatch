<template>
    <div class="table">
    <a-table :columns="columns" :data-source="data" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a @click="onDetail(record.id)">
            <span>进入</span>
          </a>
        </template>
      </template>
    </a-table>
    </div>
  </template>


  <script setup>
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '8%',
    },
    {
      title: '经纬度',
      dataIndex: 'lonlat',
      width: '12%',
    },
    {
      title: '详细地址',
      dataIndex: 'address',
      //更换为具体地址
      filters: [
        {
          text: 'Category 1',
          value: 'Category 1',
          children: [
            {
              text: 'Yellow',
              value: 'Yellow',
            },
            {
              text: 'Pink',
              value: 'Pink',
            },
          ],
        },
        {
          text: 'Category 2',
          value: 'Category 2',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      filterMode: 'menu',
      filterSearch: true,
      onFilter: (value, record) => record.address.includes(value),
      width: '30%',
      ellipsis: true,
    },
    {
      title: '在线状态',
      dataIndex: 'isOnline',
      filters: [
        {
          text: '在线',
          value: '1',
        },
        {
          text: '离线',
          value: '0',
        },
      ],
      onFilter: (value, record) => record.isOnline.includes(value),
      width: '16%',
    },
    {
      title: '预警次数统计',
      dataIndex: 'warnCount',
      filters: [
        {
          text: '0~5',
          value: [0, 5],
        },
        {
          text: '6~10',
          value: [6, 10],
        },
        {
          text: '11~15',
          value: [11, 15],
        },
        {
          text: '16+',
          value: [16, 100],
        },
      ],
      onFilter: (value, record) => (record.warnCount >= value[0] && record.warnCount <= value[1]),
      filterSearch: true,
      width: '16%',
    },
    {
      title: '操作',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' },
      width: '16%',
    }
  ];
  //更换为实际数据
  const data = [
    {
      id: 1,
      lonlat: "经纬度 1",
      address: "详细地址 1",
      isOnline: "0",
      warnCount: 5,
      action: "操作 1",
    },
    {
      id: 2,
      lonlat: "经纬度 2",
      address: "详细地址 2",
      isOnline: "1",
      warnCount: 15,
      action: "操作 2",
    },
    {
      id: 3,
      lonlat: "经纬度 3",
      address: "详细地址 3",
      isOnline: "1",
      warnCount: 10,
      action: "操作 3",
    },
    {
      id: 4,
      lonlat: "经纬度 4",
      address: "详细地址 4",
      isOnline: "1",
      warnCount: 8,
      action: "操作 4",
    },
    {
      id: 5,
      lonlat: "经纬度 5",
      address: "详细地址 5",
      isOnline: "0",
      warnCount: 8,
      action: "操作 5",
    },
    {
      id: 6,
      lonlat: "经纬度 6",
      address: "详细地址 6",
      isOnline: "1",
      warnCount: 2,
      action: "操作 6",
    },
    {
      id: 7,
      lonlat: "经纬度 7",
      address: "详细地址 7",
      isOnline: "0",
      warnCount: 5,
      action: "操作 7",
    },
    {
      id: 8,
      lonlat: "经纬度 8",
      address: "详细地址 8",
      isOnline: "0",
      warnCount: 7,
      action: "操作 8",
    },
    {
      id: 9,
      lonlat: "经纬度 9",
      address: "详细地址 9",
      isOnline: "0",
      warnCount: 8,
      action: "操作 9",
    },
    {
      id: 10,
      lonlat: "经纬度 10",
      address: "详细地址 10",
      isOnline: "1",
      warnCount: 18,
      action: "操作 10",
    },
    {
      id: 11,
      lonlat: "经纬度 11",
      address: "详细地址 11",
      isOnline: "1",
      warnCount: 19,
      action: "操作 11",
    },
    {
      id: 12,
      lonlat: "经纬度 12",
      address: "详细地址 12",
      isOnline: "0",
      warnCount: 1,
      action: "操作 12",
    },
    {
      id: 13,
      lonlat: "经纬度 13",
      address: "详细地址 13",
      isOnline: "1",
      warnCount: 10,
      action: "操作 13",
    },
  ];
  const onDetail = (id) => {
    //跳转到详情界面
    window.open('/land-eye', '_blank');
  };
  </script>

  <style>
    .table{
        margin-top:10px;
        margin-left:10px;
        margin-right:10px;
        margin-bottom:0;
    }
    .ant-table-row {  
      height: 29px; 
      line-height: 29px; 
    }
  </style>