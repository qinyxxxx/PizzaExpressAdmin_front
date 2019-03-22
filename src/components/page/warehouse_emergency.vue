<template>
  <div class="table">

    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>工厂库存紧急事件</el-breadcrumb-item>
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
          <!--<el-form-item>-->
            <!--<el-button type="primary" @click="handleAdd">新增</el-button>-->
          <!--</el-form-item>-->
        </el-form>
      </el-col>

      <el-table :data="warehouseData" border class="table" @selection-change="selsChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="emergency_id" label="ID" width="100"></el-table-column>
        <el-table-column prop="emergency_name" label="原料名称" sortable width="150"></el-table-column>
        <el-table-column prop="emergency_factory" label="进货厂商" width="150"></el-table-column>
        <el-table-column prop="emergency_date" label="生产日期" width="150"></el-table-column>
        <el-table-column prop="emergency_note" label="备注" width="260"></el-table-column>
        <el-table-column prop="emergency_quantity" label="剩余数量" width="150"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">进货</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div :span="24" class="toolbar" style="padding:10px;">
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量进货</el-button>
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
              emergency_id:1,
              emergency_name:"白菜",
              emergency_factory:"双汇",
              emergency_date:"2019-3-6",
              emergency_note:"一定要xxx家的！",
              emergency_quantity:"100g",
            },
            {
              emergency_id:2,
              emergency_name:"白菜",
              emergency_factory:"双汇",
              emergency_date:"2019-3-5",
              emergency_note:"一定要xxx家的！",
              emergency_quantity:"50g",
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
