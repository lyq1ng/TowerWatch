<template>
  <div class="main-container">
    <div class="Rchart-container">
      <div class="chart" ref="chart1" id="chart1"></div>
      <div class="chart" ref="chart2" id="chart2"></div>
      <div class="chart" ref="chart3" id="chart3"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  mounted() {
    this.renderCharts();
  },
  methods: {
    renderCharts() {
      const chart1 = echarts.init(this.$refs.chart1);
      const chart2 = echarts.init(this.$refs.chart2);
      const chart3 = echarts.init(this.$refs.chart3);

      const option1 = {
        tooltip: {
          trigger: 'item'
        },
        title: {
          text:'摄像头总数',
          top: '13%',
          left: 'center',
          textStyle:{
            fontSize:30
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['80%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                position: 'center',
                fontSize:20
              }
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 50, name: '50' }, // 修改数值为比例
            ]
          }
        ]
      };

      const option2 = {
        tooltip: {
          trigger: 'item'
        },
        title: {
          text:'摄像头在线',
          top: '13%',
          left: 'center',
          textStyle:{
            fontSize:30
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['80%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                position: 'center',
                fontSize:20
              }
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 45, name: '45' }, // 修改数值为比例值
              { value: 5,  },
            ]
          }
        ]
      };

      const option3 = {
        tooltip: {
          trigger: 'item'
        },
        title: {
          text:'摄像头离线',
          top: '13%',
          left: 'center',
          textStyle:{
            fontSize:30
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['80%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                position: 'center',
                fontSize: 20
              }
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 5, name: '5' },
              { value: 45 }// 修改数值为比例值
            ]
          }
        ]
      };

      chart1.setOption(option1);
      chart2.setOption(option2);
      chart3.setOption(option3);

      window.addEventListener('resize', () => {
        chart1.resize();
        chart2.resize();
        chart3.resize();
      });
    }
  }
};
</script>

<style scoped>
.Rchart-container {
  width: 800px;
  height: 400px;
  display: flex;
  margin-left:10px;
  justify-content: space-between;

}

.chart {
  width: 32%; /* Adjust width as needed */
  height: 100%;
}


.chart::after {
  content: '';
  position: absolute;
  top: 20px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0)); /* 设置半透明渐变的背景 */
  border-radius: 10px; /* 设置渐变背景的圆角，与边框的圆角保持一致 */
  z-index: -2; /* 将渐变背景置于边框底部 */
}

</style>
