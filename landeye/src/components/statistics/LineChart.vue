<template>
  <div class='container3'>
    <div class="datechoice2">
      <input type="date" v-model="startDate" @change="generateDateRange" >
      <input type="date" v-model="endDate" @change="generateDateRange">
    </div>
    <div ref="chart" id="chartLineBox" style="width: 700px; height: 350px;"></div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      // 指定图表的配置项和数据
      option: {
        title:{
          text:'预警数量',
          left:'center',
          top:15,
          textStyle: {
            color: '#000000' // 标题颜色
          }
        },
        tooltip: { // 设置tip提示
          trigger: 'axis'
        },
        legend: { top:40,left:'center'// 设置区分（哪条线属于什么）
        },
        xAxis: { // 设置x轴
          type: 'category',
          boundaryGap: false, // 坐标轴两边不留白
          data: [],
          name: '日期', // X轴 name
          nameTextStyle: { // 坐标轴名称的文字样式
            fontSize: 16,
            padding: [0, 0, 0, 0],
            color:'#000000'
          },
          axisLabel:{
            color:'#000000'
          },
          axisLine:{
            lineStyle:{
              color:'#000000'
            }
          }
        },
        yAxis: {
          name: '数量',
          nameTextStyle: {
            fontSize: 16,
            padding: [0, 0, 10, 0],
            color:'black'
          },
          type: 'value',
          axisLabel:{
            color:'black'
          },
          axisLine:{
            color:'black'
          },
          splitLine:{
            lineStyle:{
              color:'black'
            }
          }
        },
        series: [{name: '非农', data: [40, 70, 80, 30, 60, 50, 90], type: 'line'},
          {name: '工程', data: [70, 40, 50, 80, 30, 90, 50], type: 'line',color:'red'}]
      }
    }
  },
  mounted() {
    this.chartChange()
  },
  methods: {
    chartChange() {
      const myEcharts = this.$echarts.init(document.getElementById('chartLineBox'), 'vintage')
      // 使用刚指定的配置项和数据显示图表。
      myEcharts.setOption(this.option, true)
    },
    generateDateRange() {
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      const dateRange = [];
      // 添加起始日期
      dateRange.push(startDate.toISOString().slice(0, 7)); // 格式化为'yyyy-MM'
      // 循环生成中间日期
      while (startDate < endDate) {
        startDate.setMonth(startDate.getMonth() + 1);
        const nextMonth = new Date(startDate);
        dateRange.push(nextMonth.toISOString().slice(0, 7)); // 格式化为'yyyy-MM'
      }
      this.option.xAxis.data = dateRange;
      this.chartChange();
    }
  }
}
</script>
<style>
.container3 {
  display: flex;
  flex-direction: column;
}

.datechoice2 {
  padding-left:40px
}
</style>