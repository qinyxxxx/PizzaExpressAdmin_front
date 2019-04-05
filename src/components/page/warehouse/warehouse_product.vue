<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>工厂成品库存信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div>
        <el-input v-model="select_word" placeholder="请输入披萨名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="plain" icon="search" @click="clear">清除/刷新</el-button>
        <br>
        <br>
        <!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="请输入披萨名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="search">查询</el-button>
          </el-form-item>
        </el-form>
        </el-col>-->
      </div>
      <el-table :data="warehouseData.slice((cur_page-1)*10,cur_page*10)" border class="table">
        <!--@selection-change="selsChange"-->
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column prop="itemId" label="ID" width="150"></el-table-column>
        <el-table-column prop="itemName" label="名称" :formatter="formatter"></el-table-column>
        <el-table-column prop="size" label="尺寸" width="100"></el-table-column>
        <el-table-column prop="price" label="价格" width="150"></el-table-column>
        <el-table-column prop="count" label="剩余数量" sortable width="150"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <!--<el-input-number  v-model="warehouseData.makeCount"  :min="0" :max="1000"></el-input-number>-->
            <el-button
              type="primary"
              size="small"
              @click="show_add_product(scope.$index, scope.row)"
            >增加库存</el-button>
            <!--<el-button type="danger" size="small" >下架</el-button>-->
          </template>
        </el-table-column>
      </el-table>

      <div :span="24" class="toolbar" style="padding:10px;">
        <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量下架</el-button>-->
        <el-pagination
          layout="prev, pager, next"
          background
          @current-change="handleCurrentChange"
          :page-size="20"
          :total="total"
          style="float:right;"
        ></el-pagination>
      </div>
    </div>

    <el-dialog title="增加成品库存" :visible.sync="add_product_Visible" :close-on-click-modal="false">
      <el-form :model="add_product_form" label-width="80px" ref="add_product_form">
        <el-row>
          <el-col :span="24" align="center">
            <el-form-item label="数量" prop="count">
              <el-input-number v-model="add_product_form.count" :min="1" :max="100"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="add_product_Visible = false">取消</el-button>
        <el-button type="primary" @click.native="add_product">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url_search_byname: "/pizzaexpress/menu/getmenubyitemname", //搜索
      url_product_quantity: "/pizzaexpress/menu/getmenubyshopid", //返回这个工厂的成品信息
      url_add_product: "/pizzaexpress/menu/updatemenubyshopid", //新增成品数量
      total: 0,
      cur_page: 1,
      add_product_Visible: false,
      select_word: "",
      warehouseData: [
        {
          itemId: 1,
          itemName: "美国风情土豆培根比萨",
          size: "1",
          count: 10,
          price: "2019-3-6",
        }
      ],
      add_product_form: {
        itemId: "",
        count: 0
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    getData() {
      this.$axios
        .post(this.url_product_quantity, {
          shopID: sessionStorage.getItem("shopID")
        })
        .then(res => {
          let warehouseData = res.data.itemData.data;
          this.warehouseData = warehouseData;
          this.total = warehouseData.length;
        });
    },
    formatter(row, column) {
      return row.itemName;
    },
    //显示新增页面
    show_add_product(index, row) {
      this.add_product_Visible = true;
      this.add_product_form.itemId = row.itemId;
    },
    search() {
      this.$axios
        .post(this.url_search_byname, {
          shopID: sessionStorage.getItem("shopID"),
          pizzaName: this.select_word
        })
        .then(res => {
          let warehouseData = res.data.itemData.data;
          if (warehouseData.length==0) {
            this.$message({
              message: "未找到含有'" + this.select_word + "'的记录",
              type: "info"
            });
          } else {
            this.warehouseData = warehouseData;
            this.total = warehouseData.length;
          }
        });
    },
    clear() {
      this.select_word = "";
      this.getData();
    },
    //增加成品库存
    add_product() {
      this.$refs.add_product_form.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.$axios
              .post(this.url_add_product, {
                shopID: sessionStorage.getItem("shopID"),
                itemID: this.add_product_form.itemId,
                count: this.add_product_form.count
              })
              .then(res => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["add_product_form"].resetFields();
                this.add_product_Visible = false;
                this.getData();
              });
          });
        }
      });
    }
    // selsChange: function (sels) {
    //   this.sels = sels;
    // },
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  font-size: 14px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.handle-select {
  width: 120px;
}
</style>
