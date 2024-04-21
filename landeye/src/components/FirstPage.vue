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
      [120.29340255, 29.3125972],
      [120.29440255, 29.3155972],
      [120.29540255, 29.3135972],
      [120.29640255, 29.3145972],
      [120.29240255, 29.3115972]
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
            url: 'https://t6.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=22d8b67fcba918adc0a566e96d1587b3'
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
          center: [120.29340255, 29.3125972],
          zoom: 15,
          minzoom:14,
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
    function handleChange(value) {
      switch (value){
        case '武昌区':
          map.getView().animate({
            center: [114.31599,30.55386],
            duration: 500
          });
          break;
        case '洪山区':
          map.getView().animate({
            center: [114.34253,30.49984],
            duration: 500
          });
          break;
        case '江夏区':
          map.getView().animate({
            center: [114.32168,30.37559],
            duration: 500
          });
          break;
        default:
          break;
      }
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
      handleChange,
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
        show-search
        placeholder="选择行政区划"
        style="width: 200px"
        @change="handleChange"
    >
      <a-select-option value="武昌区">
        武昌区
      </a-select-option>
      <a-select-option value="洪山区">
        洪山区
      </a-select-option>
      <a-select-option value="江夏区">
        江夏区
      </a-select-option>
    </a-select>
      <a-select
          mode="multiple"
          :default-value="['监控点']"
          style="width: 100%"
          placeholder="图层筛选"
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
      <h2 style="font-size: 20px; margin-bottom: 10px; padding-left: 70px">图例</h2>
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
  margin-top:12px;
  width:1750px;
  height: 725px;
  position: relative;
  margin-bottom:12px

}
#map .ol-zoom {
  display: flex;
  left: 1400px;
}
#map .ol-zoom .ol-zoom-in {
  position:relative;
  right:-86px;
  height: 44px;
  width: 44px;
}
#map .ol-zoom .ol-zoom-out {
  position:absolute;
  right:-140px;
  height: 44px;
  width: 44px;
}
.btn-group {
  margin-top: 11px;
  position: absolute;
  right: 30px;
  z-index: 1000;
}
.btn {
  height: 40px;
  width: auto;
  margin-right: 10px;
  cursor: pointer;
  padding: 5px 10px;
  background-color: #0078A8;
  color: #fff;
  border: none;
  border-radius: 3px;
}
.btn:hover {
  background-color: #005580;
}
#legend {
  height: 250px;
  width: 200px;
  background-color: #f2efef;
  position: absolute;
  bottom: 10px;
  right: 10px;
  opacity: 70%;
  z-index: 1000;
  flex-direction: column;
}
.legend-item {
  display: flex;
  align-items: center;
  padding-left: 30px;
  margin-bottom: 10px;
  img {
    margin-right: 10px;
  }
  h3 {
    font-size: 15px;
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
