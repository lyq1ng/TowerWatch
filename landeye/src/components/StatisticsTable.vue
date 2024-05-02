<template>
    <div class="container">

    <div class="container1">
        <LineChart />
        <Histogram />
      </div>
      <div class="container2">
        <RingChart />
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
    display: flex;
    justify-content: space-between;
  }
  .container1 {
    display: flex;
    width: 42%;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
  }
  .container2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 55%;
    height: 100%;
  }

  </style>
  