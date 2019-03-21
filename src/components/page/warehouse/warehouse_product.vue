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
          <!--<el-form-item>-->
          <!--<el-button type="primary" @click="handleAdd">新增</el-button>-->
          <!--</el-form-item>-->
        </el-form>
      </el-col>

      <el-table :data="warehouseData" border class="table" ><!--@selection-change="selsChange"-->
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column prop="itemId" label="ID" width="150"></el-table-column>
        <el-table-column prop="itemName" label="成品名称" sortable width="200"></el-table-column>
        <el-table-column prop="price" label="价格" width="150"></el-table-column>
        <el-table-column prop="description" label="详细说明" width="320"></el-table-column>
        <el-table-column prop="count" label="剩余数量" width="150"></el-table-column>
        <el-table-column label="操作" width="155">
          <template scope="scope">
            <el-button type="primary"  size="small" >增加库存</el-button>
            <!--<el-button type="danger" size="small" >下架</el-button>-->
          </template>
        </el-table-column>
      </el-table>

      <div :span="24" class="toolbar" style="padding:10px;">
        <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量下架</el-button>-->
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
          url_product_quantity: "/pizzaexpress/menu/getmenubyshopid", //返回这个工厂的成品信息


          filters: {
            name: ''
          },
          warehouseData: [
            {
              itemId:1,
              itemName:"美国风情土豆培根比萨",
              count:10,
              price:"2019-3-6",
              description:"一定要xxx家的！"
            },
            {
              itemId:2,
              itemName:"尊享牛油果芝士鸡比萨",
              count:100,
              price:"2019-3-5",
              description:"一定要xxx家的！"
            }
          ],
          //sels: [],
        }
      },
      created() {
        this.getData();
      },
    methods: {
      getData(){
        this.$axios
          .post(this.url_product_quantity, {
            //shopID: sessionStorage.getItem("shopID")
            shopID:'1' //因为没有login
          })
          .then(res => {
            let warehouseData = res.data.itemData.data;
            this.warehouseData = warehouseData;
          });
      },


      // selsChange: function (sels) {
      //   this.sels = sels;
      // },
    }
    }
</script>

<style scoped>
  .table{
    width: 100%;
    font-size: 14px;
  }
</style>
