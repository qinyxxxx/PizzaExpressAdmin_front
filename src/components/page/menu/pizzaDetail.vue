<template>
  <div class="order-detail">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>
          pizza详情
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="order-detail">
        <img :src="picURL">
        <br>
        <br>
        状态：{{this.$route.query.pizzaStatus}}
        <br>
        <br>
        编号：{{this.$route.query.pizzaID}}
        <br>
        <br>
        名字：{{this.$route.query.pizzaName}}
        <br>
        <br>
        描述：{{this.$route.query.description}}
        <br>
        <br>
        原料：{{this.$route.query.formula}}
        <br>
        <br>
        价格（9寸）：{{this.$route.query.price9}}
        <br>
        <br>
        价格（12寸）：{{this.$route.query.price12}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picURL: this.$route.query.picURL
    };
  },

  methods: {}
};
</script>

<style scoped>
.order-detail {
  width: 100%;
  font-size: 18px;
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
.right {
  float: right;
  width: 100%;
}
</style>