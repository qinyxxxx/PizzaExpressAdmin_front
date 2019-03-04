<template>
  <div class="order-detail">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>
          订单详情
          </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="amap-wrapper">
        <el-amap 
        class="amap-box"
        ref="map"
        :center="center" 
        :vid="'amap-vue'" 
        :amap-manager="amapManager"
        :zoom="zoom"
        :events="events"
        ></el-amap>
      </div>
      <div class="toolbar">
        <button @click="getMap()">get map</button>
      </div>
    </div>
  </div>
</template>

<script>
import { AMapManager } from 'vue-amap';
let amapManager = new AMapManager()
    export default {
      data() {
        return {
          zoom: 12,
          center: [121.59996, 31.197646],
          amapManager : amapManager,
          events: {
            init(o) {
              console.log(o.getCenter())
              // console.log(this.$refs.map.$$getInstance())
              o.getCity(result => {
                console.log(result)
              })
              let marker = new AMap.Marker({
                position: [121.59996, 31.197646]
              });
              marker.setMap(o);
            },
            'moveend': () => {
            },
            'zoomchange': () => {
            }
          },
          plugin: ['ToolBar', {
            pName: 'MapType',
            defaultType: 0,
            events: {
              init(o) {
                console.log(o);
              }
            }
          }]
        };
      },

      methods: {
        add() {
          let o = amapManager.getMap();
          let marker = new AMap.Marker({
            position: [121.59996, 31.177646]
          });

          marker.setMap(o);
        },
        getMap() {
          // amap vue component
          console.log(amapManager._componentMap);
          // gaode map instance
          console.log(amapManager._map);
        }
      }
    };
</script>

<style scoped>
  .order-detail {
    width: 100%;
    font-size: 14px;
  }
  .amap-wrapper {
    position: center;
    width: 700px;
    height: 500px;
  }
</style>