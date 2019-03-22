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

      <el-table :data="warehouseData"  border class="table" ><!--@selection-change="selsChange"-->
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column prop="itemId" label="ID" width="150"></el-table-column>
        <el-table-column prop="itemName" label="成品名称" sortable width="150"></el-table-column>
        <el-table-column prop="size" label="尺寸"  width="100"></el-table-column>
        <el-table-column prop="price" label="价格" width="150"></el-table-column>
        <el-table-column prop="description" label="详细说明" width="280"></el-table-column>
        <el-table-column prop="count" label="剩余数量" width="150"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <!--<el-input-number  v-model="warehouseData.makeCount"  :min="0" :max="1000"></el-input-number>-->
            <el-button type="primary"  size="small" @click="show_add_product(scope.$index, scope.row)">增加库存</el-button>
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

    <el-dialog title="增加成品库存" :visible.sync="add_product_Visible" :close-on-click-modal="false">
      <el-form :model="add_product_form" label-width="80px"  ref="add_product_form">
        <el-row>
          <el-col :span="24">
            <el-form-item label="数量" prop="count">
              <el-input-number  v-model="add_product_form.count"  :min="0" :max="100"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="add_product_Visible = false">取消</el-button>
        <el-button type="primary" @click.native="add_product">提交</el-button><!--@click.native="add_FormVisible = false"-->
      </div>
    </el-dialog>


  </div>
</template>

<script>
    export default {
      data(){
        return {
          url_product_quantity: "/pizzaexpress/menu/getmenubyshopid", //返回这个工厂的成品信息
          url_add_product:"/pizzaexpress/menu/updatemenubyshopid",//新增成品数量

          add_product_Visible:false,
          filters: {
            name: ''
          },
          warehouseData: [
            {
              itemId:1,
              itemName:"美国风情土豆培根比萨",
              size:"1",
              count:10,
              price:"2019-3-6",
              description:"一定要xxx家的！"
            },
            {
              itemId:2,
              itemName:"尊享牛油果芝士鸡比萨",
              size:"1",
              count:100,
              price:"2019-3-5",
              description:"一定要xxx家的！"
            }
          ],
          //sels: [],
          add_product_form:{
            itemId:"",
            count:"1"
          }
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
      //显示新增页面
      show_add_product(index, row){
        this.add_product_Visible=true;
        this.add_product_form.itemId=row.itemId;
      },

      //新增成品
      add_product() {
        this.$refs.add_product_form.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.$axios
                .post(this.url_add_product, {
                  shopID:"1",
                  itemID:this.add_product_form.itemId,
                  count:this.add_product_form.count
                })
                .then(res => {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['add_product_form'].resetFields();
                  this.add_product_Visible = false;
                  this.getData();
                });
            });
          }
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
