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
      <el-row>
        <el-col :span="8" class="right">
          <el-amap 
          class="amap-wrapper"
          ref="map"
          :center="center" 
          :vid="'amap-vue'" 
          :amap-manager="amapManager"
          :zoom="zoom"
          :events="events"
          ></el-amap>
        </el-col>
        <el-col :span="14" class="order-info">
          订单编号： {{this.$route.query.orderid}}
          <br/><br/>
          订单时间：{{this.$route.query.date}}
          <br/><br/>
          预计完成时间：{{this.$route.query.date}}
          <br/><br/>
          用户：{{this.$route.query.user}}
          <br/><br/>
          配送员：{{this.$route.query.deliver}}
          <br/><br/>
          订单内容：{{this.$route.query.orderInfo}}
        </el-col>
      </el-row>
    </div>
      <div class="toolbar">
        <button @click="getMap()">get map</button>
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
    font-size: 20px;
  }
  .amap-wrapper {
    height: 500px;
    margin-left: 510px;
    /* width: 100%;
    height: 500px; */

  }
  .order-info {
    float: left;
    width: 500px;
    margin-right: -100%;
    height: 500px;
  }
  .right{
    float: right;
    height: 500px;
    width: 100%;
  }
</style>