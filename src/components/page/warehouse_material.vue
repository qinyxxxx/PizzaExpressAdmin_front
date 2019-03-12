<template>
  <section>

    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>工厂原料库存信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--&lt;!&ndash;工具条&ndash;&gt;-->
    <!--<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">-->
      <!--<el-form :inline="true" :model="filters">-->
        <!--<el-form-item>-->
          <!--<el-input v-model="filters.name" placeholder=""></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
          <!--<el-button type="primary" v-on:click="getUsers">查询</el-button>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
          <!--<el-button type="primary" @click="handleAdd">新增</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</el-col>-->

    <div class="container" >

      <!--<el-col :span="24" class="toolbar" style="padding-bottom: 0px">-->
        <!--<el-form :inline="true" :model="filters">-->
          <!--<el-form-item>-->
            <!--<el-input v-model="filters.name" placeholder="请输入"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-button type="primary" v-on:click="getUsers">查询</el-button>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-button type="primary" @click="handleAdd">新增</el-button>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
      <!--</el-col>-->

      <div >
        <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
        <el-select v-model="select_cate" filterable placeholder="筛选条件" class="handle-select mr10">
          <el-option key="1" label="原料名称" value="原料名称"></el-option>
          <el-option key="2" label="进货厂商" value="进货厂商"></el-option>
        </el-select>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10" >
        </el-input>

        <br/><br/>
        <el-date-picker class="handle-date mr10" v-model="select_date" type="daterange" :picker-options="pickerOptions2"
                        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <br/><br/>
      </div>

      <el-table :data="warehouseData" border class="table" @selection-change="selsChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="material_id" label="ID" width="100"></el-table-column>
        <el-table-column prop="material_name" label="原料名称" sortable width="150"></el-table-column>
        <el-table-column prop="material_factory" label="进货厂商" width="150"></el-table-column>
        <el-table-column prop="material_date" label="生产日期" width="150"></el-table-column>
        <el-table-column prop="material_note" label="备注" width="220"></el-table-column>
        <el-table-column prop="material_quantity" label="剩余数量" width="140"></el-table-column>
        <el-table-column label="操作" width="155">
          <template slot-scope="scope">
            <el-button  size="small" >进货</el-button>
            <el-button type="danger" size="small" >停用</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div :span="24" class="toolbar" style="padding:10px;">
        <el-button @click="batchRemove" :disabled="this.sels.length===0">批量进货</el-button>
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量停用</el-button>
        <el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :page-size="20" :total="100" style="float:right;">
        </el-pagination>
      </div>

    </div>

  </section>
</template>

<script>
    import ElCollapse from "element-ui/packages/collapse/src/collapse";
    import ElFormItem from "element-ui/packages/form/src/form-item";

    export default {
      components: {
        ElFormItem,
        ElCollapse},
      data(){
            return {
              filters: {
                name: ''
              },
              select_cate: '',
              select_word: '',
              select_date: '',
              warehouseData: [
                {
                  material_id:1,
                  material_name:"白菜",
                  material_factory:"双汇",
                  material_date:"2019-3-6",
                  material_note:"一定要xxx家的！!!!!!!!!!!!!!!!!!!!!!!!!!!",
                  material_quantity:"1g",
                },
                {
                  material_id:2,
                  material_name:"白菜",
                  material_factory:"双汇",
                  material_date:"2019-3-5",
                  material_note:"一定要xxx家的！",
                  material_quantity:"1g",
                },
                {
                  material_id:3,
                  material_name:"白菜",
                  material_factory:"双汇",
                  material_date:"2019-3-6",
                  material_note:"一定要xxx家的！",
                  material_quantity:"1g",
                },
                {
                  material_id:4,
                  material_name:"白菜",
                  material_factory:"双汇",
                  material_date:"2019-3-5",
                  material_note:"一定要xxx家的！",
                  material_quantity:"1g",
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
  .handle-select {
     width: 120px;
   }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .handle-date{
    width: 435px;
  }
  .mr10{
    margin-right: 10px;
  }
/*.example-p{*/
    /*height: 45px;*/
    /*display: flex;*/
    /*align-items: center;*/
/*}*/
/*.search-box{*/
    /*text-align: center;*/
    /*margin-top: 10px;*/
/*}*/
/*.search{*/
    /*width: 300px;*/
/*}*/
ul,li{
    list-style: none;
}
/*.icon-li{*/
    /*display: inline-block;*/
    /*padding: 10px;*/
    /*width: 120px;*/
    /*height: 120px;*/
/*}*/
/*.icon-li-content{*/
    /*display: flex;*/
    /*height: 100%;*/
    /*flex-direction: column;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    /*cursor: pointer;*/
/*}*/
/*.icon-li-content i{*/
    /*font-size: 36px;*/
    /*color: #606266;*/
/*}*/
/*.icon-li-content span{*/
    /*margin-top: 10px;*/
    /*color: #787878;*/
/*}*/
</style>
