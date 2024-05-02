<template>
  <div class="container4">
    <div class="data_title">预警数量</div>
    <div class="datechoice1">
      <a-date-picker v-model="startDate" @change="generateDateRange" style="width:100px;height:20px;margin-left:25px"></a-date-picker>
      <a-date-picker v-model="endDate" @change="generateDateRange" style="width:100px;height:20px;"></a-date-picker>
    </div>
    <div ref="echartsRef" id="Histogram" style="width: 90%; height: 100%;"></div>
  </div>
</template>

<script>
import * as Date from 'ant-design-vue';
export default {
  name:'TypeNum',
  data(){
    return{
      startDate: '',
      endDate: '',
      option : {

        tooltip: { // 设置tip提示
          trigger: 'item',
          backgroundColor: "rgba(255,255,255,0.1)",
          axisPointer: {
            type: "none"
          }
        },
        grid: {
          top: '14%',
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        legend:{},
        xAxis: {
          offset: 35,
          name:'日期',
          type: 'category',
          data: [], // X 轴数据
          axisLabel: {
            show: true,
            textStyle: {
              color: "#b6b5ab",
            },
            interval: 0,
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          nameTextStyle: { // 坐标轴名称的文字样式
            fontSize: 12,
            padding: [0, 0, 0, -15],
            color:'black'
          }
        },
        yAxis: {
          name:'数量',
          type: 'value',
          axisLabel: {
            show: true,
            textStyle: {
              color: "#b6b5ab",
            },
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            data: [150, 210, 120, 70, 80, 116, 140],
            type: 'bar',
            barWidth: "60%",
            barGap: "-100%",
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 1,
                  y: 1,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#00c6f4", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#00db97", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
                borderWidth: 0,
                barBorderRadius: [50, 50, 0, 0],
              },
            },
          },
        ]
      },
    }
  },
  mounted() {
    this.chartChange()
  },
  methods: {
    chartChange() {
      const myEcharts = this.$echarts.init(document.getElementById('Histogram'), 'vintage')
      // 使用刚指定的配置项和数据显示图表。
      myEcharts.setOption(this.option, true)
      window.addEventListener('resize', () => {
        myEcharts.resize();
      });
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
.container4 {
  display: flex;
  flex-direction: column;
  position:relative;
  width: 100%;
  height: 48%;
  background: #f1f8f0;
  border-radius: 40px;
  margin-left:0;
  margin-bottom:10px;
}
.datechoice1 {
  padding-left:16px
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


