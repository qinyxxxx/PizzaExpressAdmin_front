<template>
  <div class="table">

    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>工厂成品库存信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">

      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="getUsers">查询</el-button>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table :data="warehouseData" border class="table" @selection-change="selsChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="product_id" label="ID" width="100"></el-table-column>
        <el-table-column prop="product_name" label="成品名称" sortable width="200"></el-table-column>
        <el-table-column prop="product_date" label="生产日期" width="150"></el-table-column>
        <el-table-column prop="product_note" label="详细说明" width="320"></el-table-column>
        <el-table-column prop="product_quantity" label="剩余数量" width="140"></el-table-column>
        <el-table-column label="操作" width="155">
          <template scope="scope">
            <el-button  size="small" >查看</el-button>
            <el-button type="danger" size="small" >下架</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div :span="24" class="toolbar" style="padding:10px;">
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量下架</el-button>
        <el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :page-size="20" :total="100" style="float:right;">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
      data(){
        return {
          filters: {
            name: ''
          },
          warehouseData: [
            {
              product_id:1,
              product_name:"美国风情土豆培根比萨",
              product_sale_count:10,
              product_date:"2019-3-6",
              product_note:"一定要xxx家的！",
              product_quantity:5,
            },
            {
              product_id:2,
              product_name:"尊享牛油果芝士鸡比萨",
              product_sale_count:100,
              product_date:"2019-3-5",
              product_note:"一定要xxx家的！",
              product_quantity:10,
            }
          ],
          sels: [],
        }
      },
    methods: {
      selsChange: function (sels) {
        this.sels = sels;
      },
    }
    }
</script>

<style scoped>
  .table{
    width: 100%;
    font-size: 14px;
  }
</style>
