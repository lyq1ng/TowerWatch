<template>
  <div class="container4">
    <span class="j_1"></span>
    <span class="j_2"></span>
    <span class="j_3"></span>
    <span class="j_4"></span>
    <div class="data_title">预警数量</div>
    <div class="datechoice1">
      <a-date-picker v-model="startDate" @change="generateDateRange" style="width:100px;height:20px;margin-left:25px"></a-date-picker>
      <a-date-picker v-model="endDate" @change="generateDateRange" style="width:100px;height:20px;"></a-date-picker>
    </div>
    <div ref="echartsRef" id="Histogram" style="width: 600px; height: 300px;"></div>
  </div>
</template>

<script>
//import { ref, onMounted } from 'vue';
//import * as echarts from 'echarts';
import * as Date from 'ant-design-vue';
/*export default {
  name: 'WarnType',
  setup() {
    const echartsRef = ref(null);

    onMounted(() => {
      const myChart = echarts.init(echartsRef.value);
      const option = {
        title: {
          text: '预警类型', // 标题
          left: 'center', // 标题居中
          textStyle: {
            color: '#222' // 标题颜色
          }
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [], // X 轴数据
          axisLabel: {
            color: '#222' // X 轴标签颜色
          },
          axisLine: {
            lineStyle: {
              color: '#ccc' // X 轴线颜色
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#222' // Y 轴标签颜色
          },
          axisLine: {
            lineStyle: {
              color: '#ccc' // Y 轴线颜色
            }
          },
          splitLine: {
            lineStyle: {
              color: '#666' // 分隔线颜色
            }
          }
        },
        series: [
            {data: [120, 200, 150, 80, 70, 110, 130], type: 'bar', itemStyle: {color: '#00b0ff'}},
            {data: [150, 210, 120, 70, 80, 116, 140], type: 'bar', itemStyle: {color: '#00b0ff'}},
        ]
      };

      myChart.setOption(option);
    });

    return { echartsRef };
  }
};*/
export default {
  name:'TypeNum',
  data(){
    return{
      startDate: '',
      endDate: '',
      option : {

        tooltip: { // 设置tip提示
          trigger: 'axis',
          backgroundColor: "rgba(255,255,255,0.1)",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
              backgroundColor: "#7B7DDC"
            }
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
          name:'日期',
          type: 'category',
          data: [], // X 轴数据
          axisLabel: {
            color: 'black' // X 轴标签颜色
          },
          axisLine: {
            lineStyle: {
              color: '#666' // X 轴线颜色
            }
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
            color: '#000' // Y 轴标签颜色
          },
          axisLine: {
            lineStyle: {
              color: '#000' // Y 轴线颜色
            }
          },
          splitLine: {
            lineStyle: {
              color: '#666' // 分隔线颜色
            }
          }
        },
        series: [
          /*{ data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#956FD4" },
              { offset: 1, color: "#3EACE5" }])
            }
          },*/
          { data: [150, 210, 120, 70, 80, 116, 140],
            type: 'bar',
            itemStyle: {
              barBorderRadius: 10,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(156,107,211,0.8)" },
              { offset: 0.2, color: "rgba(156,107,211,0.5)" },
              { offset: 1, color: "rgba(156,107,211,0.2)" }
            ])
            }
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
  width: 640px;
  height: 320px;
  border: #ffffff solid 2px;
  background: linear-gradient(rgba(183,245,222,0.5),rgba(128,128,128,0));
  box-sizing: border-box;
  margin-left:0;
  margin-bottom:10px;
}
.datechoice1 {
  padding-left:16px
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


