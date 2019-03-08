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
      <el-row>
        <el-col :span="14" class="order-info">
          <el-card shadow="never">
            编号： {{this.$route.params.detail.pizzaID}}
            <br>
            <br>
            名字：{{this.$route.params.detail.pizzaName}}
            <br>
            <br>
            描述：{{this.$route.params.detail.description}}
            <br>
            <br>图片：
            <img src="../../../assets/img/xiaweiyi.jpg">
            <br>
            <br>
            原料：{{this.$route.params.detail.formula}}
            <br>
            <br>
            价格（9寸）：{{this.$route.params.detail.price9}}
            <br>
            <br>
            价格（12寸）：{{this.$route.params.detail.price12}}
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        picURL: this.$route.params.detail.picURL,
    };
  },

  methods: {
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
.right {
  float: right;
  width: 100%;
}
</style>