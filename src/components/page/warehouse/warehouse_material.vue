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
        </el-select>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10" >
        </el-input>

        <!--<br/><br/>-->
        <!--<el-date-picker class="handle-date mr10" v-model="select_date" type="daterange" :picker-options="pickerOptions2"-->
                        <!--range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">-->
        <!--</el-date-picker>-->
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <br/><br/>
      </div>

      <el-table :data="warehouseData" border class="table" @selection-change="selsChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="material_id" label="ID" width="100"></el-table-column>
        <el-table-column prop="material_name" label="原料名称" sortable width="150"></el-table-column>
        <el-table-column prop="material_factory" label="进货厂商" width="170"></el-table-column>
        <!--<el-table-column prop="material_date" label="生产日期" width="150"></el-table-column>-->
        <el-table-column prop="material_note" label="备注" width="250"></el-table-column>
        <el-table-column prop="material_quantity" label="剩余数量" width="150"></el-table-column>
        <el-table-column label="操作" width="250">
          <template scope="scope">
            <el-button  size="small" @click="material_check" >查看</el-button>
            <el-button type="primary" size="small" >进货</el-button>
            <el-button type="danger" size="small" >停用</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div :span="24" class="toolbar" style="padding:10px;">
        <el-button type="primary" @click="batchRemove" :disabled="this.sels.length===0">批量进货</el-button>
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量停用</el-button>
        <el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :page-size="20" :total="100" style="float:right;">
        </el-pagination>
      </div>

    </div>

    <el-dialog title="查看原材料进货批次" :visible.sync="material_check_FormVisible" :close-on-click-modal="false">

        <el-table :data="material_check_Form" border class="table" >
          <el-table-column prop="material_id" label="ID" width="100"></el-table-column>
          <el-table-column prop="material_name" label="原料名称" width="100"></el-table-column>
          <el-table-column prop="material_date" label="进货日期" width="150"></el-table-column>
          <el-table-column prop="material_batch" label="进货批次" width="150"></el-table-column>
          <el-table-column prop="material_in_quantity" label="进货数量" width="100"></el-table-column>
        </el-table>

      <div :span="24" class="toolbar" style="padding:10px;">
        <el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :page-size="8" :total="100" style="float:right;">
        </el-pagination>
      </div>

      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click.native="edit_FormVisible = false">取消</el-button>-->
        <!--<el-button type="primary" @click.native="edit_FormVisible = false">提交</el-button>-->
      <!--</div>-->
    </el-dialog>

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
              //select_date: '',
              warehouseData: [
                {
                  material_id:1,
                  material_name:"白菜",
                  material_factory:"双汇",
                  material_note:"一定要xxx家的！!!!!!!!!!!!!!!!!!!!!!!!!!!",
                  material_quantity:"1g",
                },
                {
                  material_id:2,
                  material_name:"西蓝花",
                  material_factory:"双汇",
                  material_note:"一定要xxx家的！",
                  material_quantity:"1g",
                },
                {
                  material_id:3,
                  material_name:"腐竹",
                  material_factory:"双汇",
                  material_note:"一定要xxx家的！",
                  material_quantity:"1g",
                },
                {
                  material_id:4,
                  material_name:"面粉",
                  material_factory:"双汇",
                  material_note:"一定要xxx家的！",
                  material_quantity:"1g",
                }
              ],
              sels: [],
              material_check_FormVisible:false,
              material_check_Form:[
                {
                  material_id:1,
                  material_name:"白菜",
                  material_date:"2019-3-6",
                  material_batch:2348329874,
                  material_in_quantity:500
                },
                {
                  material_id:2,
                  material_name:"白菜",
                  material_date:"2019-3-5",
                  material_batch:2348329874,
                  material_in_quantity:500
                },
                {
                  material_id:3,
                  material_name:"白菜",
                  material_date:"2019-3-4",
                  material_batch:2348329874,
                  material_in_quantity:500
                },
                {
                  material_id:4,
                  material_name:"白菜",
                  material_date:"2019-3-5",
                  material_batch:2348329874,
                  material_in_quantity:500
                },
                {
                  material_id:5,
                  material_name:"白菜",
                  material_date:"2019-3-4",
                  material_batch:2348329874,
                  material_in_quantity:500
                }
              ]
            }
        },
        methods: {
          selsChange: function (sels) {
            this.sels = sels;
          },
          material_check(){
            this.material_check_FormVisible = true;
          }
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
