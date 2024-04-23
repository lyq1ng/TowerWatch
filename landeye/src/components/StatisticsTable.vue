<template>
    <div class="container">

    <div class="container1">
        <LineChart />
        <RingChart />
      </div>
      <div class="container2">
        <Histogram />
        <PieChart />
      </div>
    </div>
</template>
  
<script>
  import LineChart from './statistics/LineChart.vue'
  import PieChart from './statistics/PieChart.vue'
  import Histogram from './statistics/Histogram.vue'
  import RingChart from "./statistics/RingChart.vue";
  
  export default {
    components: {
      RingChart,
      LineChart,
      Histogram,
      PieChart
    }
  }
  </script>
  
  <style>
  .container {
    width: 100%;
    height: 100%;
    padding-top:10px;
  }
  .container1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin:0 20px 0 20px;
  }
  .container2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin:0 20px 0 20px;
  }

  </style>
  