<template>
  <div class='container3'>
    <span class="j_1"></span>
    <span class="j_2"></span>
    <span class="j_3"></span>
    <span class="j_4"></span>
    <div class="datechoice2">
     <div class="data_title">预警类型</div>
    <a-date-picker v-model="startDate" :show-time="true" @change="generateDateRange" style="width:100px;height:20px;"></a-date-picker>
    <a-date-picker v-model="endDate" :show-time="true" @change="generateDateRange" style="width:100px;height:20px;"></a-date-picker>
    </div>
    <div ref="chart" id="chartLineBox" style="width: 600px; height: 300px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import * as Date from 'ant-design-vue';
export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      // 指定图表的配置项和数据
      option: {
        tooltip: { // 设置tip提示
          trigger: 'axis'
        },
        legend: {
          icon: 'rect',
          itemWidth: 14,itemHeight: 5,itemGap:10,
          data: ['工程车辆进入', '人为破坏', '焚烧纵火'],
          right: '10px',top: '0px',
          textStyle: {fontSize: 12,color: '#fff'}
        },
        grid: {x:40,y:50,x2:45,y2:40},
        xAxis: { // 设置x轴
          type: 'category',
          boundaryGap: false, // 坐标轴两边不留白
          data: [],
          name: '日期', // X轴 name
          nameTextStyle: { // 坐标轴名称的文字样式
            fontSize: 16,
            padding: [0, 0, 0, -5],
            color:'black'
          },
          axisLabel:{
            color:'black'
          },
          axisLine:{
            color:'black'
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
        series: [
          {
              name: '工程车辆进入',
              data: [40, 70, 80, 30, 60, 50, 90],
              type: 'line',
              smooth:'true',
              lineStyle: {normal: {width: 2}},
              yAxisIndex:0,
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(185,150,248,0.3)'
                  }, {
                    offset: 0.8,
                    color: 'rgba(185,150,248,0)'
                  }], false),
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                  shadowBlur: 10
                }
              },
              itemStyle: {normal: { color: '#B996F8'}},
            },
          {
            name: '人为破坏',
            data: [70, 40, 50, 80, 30, 90, 50],
            type: 'line',
            smooth:true,
            lineStyle: { normal: {width: 2}},
            yAxisIndex:0,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(3, 194, 236, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(3, 194, 236, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {normal: {color: '#03C2EC'}},
            },
          {
            name: '焚烧纵火',
            data:[10, 25, 35, 12, 55, 87, 63],
            type: 'line',
            smooth: true,
            lineStyle: {normal: {width: 2}},
            yAxisIndex:0,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(218, 57, 20, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(218, 57, 20, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {normal: {color: '#DA3914'}},
          }
          ]
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
   position:relative;
   width: 610px;
   height: 320px;
   border: #ffffff solid 2px;
   background: linear-gradient(rgba(183,245,222,0.5),rgba(128,128,128,0));
   box-sizing: border-box;
   margin-left:0;

 }
 .datechoice2 {
  padding-left:40px
 }
 .j_1{
   width: 23px;
   height: 23px;
   position: absolute;
   top: -2px;
   left: -2px;
   border-left: 3px solid #808080;
   border-top: 3px solid #808080;
 }
 .j_2{
   width: 23px;
   height: 23px;
   position: absolute;
   top: -2px;
   right: -2px;
   border-right: 3px solid #808080;
   border-top: 3px solid #808080;
 }
 .j_3{
   width: 23px;
   height: 23px;
   position: absolute;
   bottom: -2px;
   left: -2px;
   border-left: 3px solid #808080;
   border-bottom: 3px solid #808080;
 }
 .j_4{
   width: 23px;
   height: 23px;
   position: absolute;
   bottom: -2px;
   right: -2px;
   border-right: 3px solid #808080;
   border-bottom: 3px solid #808080;
 }
 .data_title{
   width: 100%;
   height: 30px;
   text-align: center;
   color: #000000;
   font-size: 1.3rem;
   font-Weight: bold;
   line-height: 40px;
 }
</style>