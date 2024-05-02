<template>
    <div class="Rchart-container">
      <div class="chart" ref="chart1" id="chart1"></div>
      <div class="radar" ref="chart2" id="chart2"></div>
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

      const option1 = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '累计告警次数',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 735, name: '工程车辆' },
              { value: 484, name: '人为破坏' },
              { value: 300, name: '焚烧纵火' }
            ]
          }
        ]
      };
      const option2 = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          data: ['Actual Spending'],
          top: '5%',
          left:0,
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: 'Sales', max: 6500 },
            { name: 'Administration', max: 16000 },
            { name: 'Information Technology', max: 30000 },
            { name: 'Customer Support', max: 38000 },
            { name: 'Development', max: 52000 },
            { name: 'Marketing', max: 25000 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: 'Actual Spending'
              }
            ]
          }
        ]
      };
      chart1.setOption(option1);
      chart1.resize();
      chart2.setOption(option2)
      chart2.resize()

      window.addEventListener('resize', () => {
        chart1.resize();
        chart2.resize();
      });
    }
  }
};
</script>

<style scoped>
.Rchart-container {
  width: 48%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.chart {
  width: 100%; /* Adjust width as needed */
  height: 58%;
  background: #f1f8f0;
  border-radius: 40px;
}
.radar {
  width: 100%;
  height: 40%;
  background: #f1f8f0;
  border-radius: 40px;
}
</style>
