<script>
import { onMounted } from 'vue';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj'
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { Icon, Style } from "ol/style";
import { XYZ } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Overlay } from "ol";
export default {
  name: 'MapComponent',
  setup() {
    let map;
    let baseLayer = [];
    let addLayer = [];
    const points = [
      [118.759167,24.772778],
      [118.699167,24.772778],
      [118.718611,24.771944],
      [118.731111,24.756389],
      [118.730556,24.773056]
      //[118.7311111000,24.7843210000],
    ]
    const cameraSource = new VectorSource();
    const warningSource = new VectorSource();

    onMounted(() => {
      initMap()
    });

    function initMap(){
      addCameraFeature(points)
      addWarningFeature(points)
      baseLayer = [
        //添加天地图web底图服务
        new TileLayer({
          source: new XYZ({
            url: 'http://120.37.123.14:58090/tiles/{z}/{x}/{y}.png'
          })
        }),
      ]
      let cameraLayer = new VectorLayer({
        name: '监控点',
        source: cameraSource
      })
      let warningLayer = new VectorLayer({
        name: '告警点状态',
        source: warningSource,
        visible: false,
      })
      addLayer = [
        cameraLayer,
        warningLayer,
      ]
      map = new Map({
        target: 'map',
        layers: [
            ...baseLayer,
            ...addLayer,
        ],
        view: new View({
          projection: "EPSG:4326",
          center: [118.730833,24.767778],
          zoom: 14,
          minzoom:8,
          maxzoom:17
        }),
      });  
      map.on('click', function(evt) {
        var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
          return feature;
        });

        if (feature) {
          // 如果点击到了要素，弹出窗口
          var coordinate = feature.getGeometry().getCoordinates();
          var content = '<p>经度: ' + coordinate[0] + '</p>' +
              '<p>纬度: ' + coordinate[1] + '</p>';
          var popup = new Overlay({
            id: 0,
            element: document.getElementById('popup'),
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [0, -50]
          });

          map.addOverlay(popup);
          popup.setPosition(coordinate);
          popup.getElement().style.display = 'block'
          document.getElementById('popup-content').innerHTML = content;
        }
      });
    }
    function handleSelect(value){
      addLayer.forEach((item)=>{
        if(!value.includes(item.get("name"))){
          item.setVisible(false)
          return;
        }
        item.setVisible(true)
      })
    }
    //切换至影像图层
    function switchToImg() {
      map.getLayers().setAt(0, new TileLayer({
        source: new XYZ({
          url: 'https://t6.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=22d8b67fcba918adc0a566e96d1587b3'
        })
      }));
    }

    // 切换至矢量图层
    function switchToVec() {
      map.getLayers().setAt(0, new TileLayer({
        source: new XYZ({
          url: 'https://t6.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=22d8b67fcba918adc0a566e96d1587b3'
        })
      }));
    }

    function addCameraFeature(points) {
      const cameraStyle = new Style({
        image: new Icon({
          src: "/img/camera.png",
          anchor: [0.5, 0.5],
        })
      })
      points.forEach(coordinates => {
        const pointGeometry = new Point(fromLonLat(coordinates, 'EPSG:4326'));
        const pointFeature = new Feature({
          geometry: pointGeometry,
        })
        pointFeature.setStyle(cameraStyle)
        cameraSource.addFeature(pointFeature)
        console.log(1)
      })
    }

    function addWarningFeature(points) {
      const warningStyle = new Style({
        image: new Icon({
          src: '/img/warning.png',
          anchor: [0.5, 1],
        })
      })
      points.forEach(coordinates => {
        const pointGeometry = new Point(fromLonLat(coordinates, 'EPSG:4326'));
        const pointFeature = new Feature({
          geometry: pointGeometry,
        })
        pointFeature.setStyle(warningStyle)
        warningSource.addFeature(pointFeature)
      })
    }

    function openCameraPage(){
      window.open('/land-eye', '_blank');
    }
    function closePopUp(){
      map.getOverlayById(0).setPosition(undefined)
    }

    return {
      switchToImg,
      switchToVec,
      handleSelect,
      closePopUp,
      openCameraPage,
    };
  }
}
</script>

<template>
  <div id="map">
    <div id="popup" class="ol-popup" >
<!--      <a href="#" id="popup-closer" class="ol-popup-closer"></a>-->
      <div id="popup-content"></div>
      <a-button type="primary" @click="openCameraPage">进入摄像头</a-button>
      <a-button type="dashed" @click="closePopUp">关闭</a-button>
    </div>
    <div class="btn-group">
      <a-button class="btn" @click="switchToImg">影像</a-button>
      <a-button class="btn" @click="switchToVec">矢量</a-button>
    </div>
    <div class="select">
      <a-select
          mode="multiple"
          :default-value="['监控点']"
          style="margin-left:5px;width: 200px"
          placeholder="地图要素筛选"
          @change="handleSelect"
      >
        <a-select-option value="监控点">
          监控点
        </a-select-option>
        <a-select-option value="地块边界">
          地块边界
        </a-select-option>
        <a-select-option value="告警点状态">
          告警点状态
        </a-select-option>
        <a-select-option value="告警点级别">
          告警点级别
        </a-select-option>
      </a-select>
    </div>
    <div id="legend">
      <h2 class="legend-title">图例</h2>
      <div class="legend-item">
        <img src="/img/camera.png">
        <h3>摄像头</h3>
      </div>
      <div class="legend-item">
        <img src="/img/warning.png">
        <h3>告警点位</h3>
      </div>
    </div>
  </div>
</template>

<style>
#map {
  width:100%;
  height: 100%;
  position: relative;
}
#map .ol-zoom {
  display: flex;
  right: 10%;
  background-color: rgba(255,255,255,0);
}
#map .ol-zoom .ol-zoom-in {
  position: absolute;
  right: 2.5%;
  height: 42px;
  width: 44px;
  border-radius: 4px;
}
#map .ol-zoom .ol-zoom-out {
  position: absolute;
  right: 7.5%;
  height: 42px;
  width: 44px;
  border-radius: 4px;
}
.btn-group {
  margin-top: 11px;
  position: absolute;
  right: 2%;
  z-index: 1000;
}
.btn {
  height: 40px;
  width: auto;
  margin-right: 10px;
  cursor: pointer;
  padding: 5px 10px;
  background-color: #3ea164;
  color: #e1e0e0;
  border: none;
  border-radius: 3px;
  font-weight: bold;
  font-size: 15px;
}
.btn:hover {
  background-color: #cdeec2;
  color: #262525;
}
#legend {
  height: 250px;
  width: 200px;
  background-color: #c6debd;
  position: absolute;
  bottom: 1%;
  right: 1%;
  opacity: 80%;
  z-index: 1000;
  flex-direction: column;
  border-radius: 10px;
}
.legend-title {
  color:#1c1c1c;
  font-weight:bold;
  font-size: 22px;
  margin: 10px;
  padding-left: 70px
}
.legend-item {
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-bottom: 10px;
  img {
    margin-right: 10px;
  }
  h3 {
    font-size: 18px;
    font-weight: bold;
    color: #1c1c1c;
  }
}
.select {
  height: 40px;
  margin-top: 11px;
  display: flex;
  left: 10px;
  position: absolute;
  z-index: 1000;

}
.ol-popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: -50px;
  left: -50px;
  min-width: 280px;
  display: none;
}

.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}

.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
#popup-content {
  text-align: center;
}
</style>
