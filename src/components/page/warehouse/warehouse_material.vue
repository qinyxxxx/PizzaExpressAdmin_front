<template>
  <section>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>工厂原料库存信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div>
        <el-input v-model="select_word" placeholder="请输入原料名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="plain" icon="search" @click="clear">清除/刷新</el-button>
        <br>
        <br>
      </div>
      <el-table :data="warehouseData.slice((cur_page-1)*10,cur_page*10)" border class="table">
        <el-table-column prop="formulaId" label="ID" sortable width="300"></el-table-column>
        <el-table-column prop="formulaName" label="原料名称" width="300"></el-table-column>
        <el-table-column prop="formulaCount" label="剩余数量" width="300"></el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button size="small" @click="material_check(scope.$index,scope.row)">查看进货日志</el-button>
            <el-button type="primary" size="small" @click="stock(scope.$index, scope.row)">进货</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
          :current-page="cur_page"
        ></el-pagination>
      </div>
    </div>

    <el-dialog
      title="查看原材料进货批次"
      :visible.sync="material_check_FormVisible"
      :close-on-click-modal="false"
    >
      <el-table
        :data="material_check_Form.slice((cur_page_2-1)*5,cur_page_2*5)"
        border
        class="table"
      >
        <el-table-column prop="purchaseFormula" label="原料名称" width="100"></el-table-column>
        <el-table-column prop="purchaseManufacture" label="进货厂商" width="130"></el-table-column>
        <el-table-column prop="purchaseTime" sortable label="进货日期" width="170"></el-table-column>
        <el-table-column prop="purchaseID" label="进货批次" width="100"></el-table-column>
        <el-table-column prop="purchaseCount" label="进货数量" width="98"></el-table-column>
      </el-table>

      <div :span="24" class="toolbar" style="padding:10px;">
        <el-pagination
          layout="prev, pager, next"
          background
          :page-size="5"
          @current-change="handleCurrentChange_2"
          :current-page="cur_page_2"
          :total="total_2"
          style="float:right;"
        ></el-pagination>
      </div>
    </el-dialog>

    <el-dialog title="进货" :visible.sync="add_FormVisible" :close-on-click-modal="false">
      <el-form :model="add_Form" label-width="80px" ref="add_Form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="进货原料" prop="formulaName">
              <el-input :readonly="true" v-model="add_Form.formulaName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="进货厂商" prop="purchaseManufacture">
              <el-select v-model="add_Form.purchaseManufacture" filterable placeholder="选择厂商">
                <el-option label="厂商一" value="厂商一"></el-option>
                <el-option label="厂商二" value="厂商二"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="进货数量" prop="purchaseCount">
              <el-input-number v-model="add_Form.purchaseCount" :min="0" :max="1000" :step="100"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="add_FormVisible = false">取消</el-button>
        <el-button type="primary" @click="addMaterial">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import ElCollapse from "element-ui/packages/collapse/src/collapse";
import ElFormItem from "element-ui/packages/form/src/form-item";

export default {
  components: {
    ElFormItem,
    ElCollapse
  },
  data() {
    return {
      url_search_byname: "/pizzaexpress/shop/getformulbyname", //搜索
      url_material_quantity: "/pizzaexpress/shop/getallformulabyshop", //返回这个工厂的原料信息
      url_material_check_Form: "/pizzaexpress/purchase/getpurchasebyformula", //返回这个工厂的某个原料的进货历史信息
      url_add_Form: "/pizzaexpress/purchase/addpurchaseformula", //保存进货信息
      total: 10,
      total_2: 5,
      cur_page: 1,
      cur_page_2: 1,
      select_word: "",
      warehouseData: [
        //原料信息
        {
          formulaId: 1,
          formulaName: "面粉",
          formulaCount: "1g"
        },
        {
          formulaId: 2,
          formulaName: "鸡蛋",
          formulaCount: "1g"
        },
        {
          formulaId: 3,
          formulaName: "芝士",
          formulaCount: "1g"
        },
        {
          formulaId: 4,
          formulaName: "蔬菜",
          formulaCount: "1g"
        },
        {
          formulaId: 5,
          formulaName: "肉",
          formulaCount: "1g"
        }
      ],
      material_check_FormVisible: false,
      material_check_Form: [
        //原材料历史
        {
          //material_id:1,
          purchaseManufacture: "",
          purchaseFormula: "白菜",
          purchaseTime: "2019-3-6",
          purchaseID: 2348329874,
          purchaseCount: 500
        },
        {
          //material_id:5,
          purchaseManufacture: "",
          purchaseFormula: "白菜",
          purchaseTime: "2019-3-4",
          purchaseID: 2348329874,
          purchaseCount: 500
        }
      ],
      add_FormVisible: false,
      add_Form: {
        formulaName: "",
        purchaseManufacture: "",
        purchaseCount: "500"
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //返回这个工厂的某个原料的进货历史信息
    material_check(index, row) {
      this.material_check_FormVisible = true;
      this.$axios
        .post(this.url_material_check_Form, {
          shopID: sessionStorage.getItem("shopID"),
          formulaName: row.formulaName
        })
        .then(res => {
          let material_check_Form = res.data.purchaseData.data; //purchase 需要测试一下！
          this.material_check_Form = material_check_Form;
          this.total_2 = material_check_Form.length;
        });
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    handleCurrentChange_2(val) {
      this.cur_page_2 = val;
    },
    //返回这个工厂的原料信息
    getData() {
      this.$axios
        .post(this.url_material_quantity, {
          shopID: sessionStorage.getItem("shopID")
        })
        .then(res => {
          let warehouseData = res.data.shopData.data;
          this.warehouseData = warehouseData;
          this.total = warehouseData.length;
        });
    },

    search() {
      this.$axios
        .post(this.url_search_byname, {
          shopID: sessionStorage.getItem("shopID"),
          formulaName: this.select_word
        })
        .then(res => {
          let warehouseData = res.data.purchaseData.data;
          if (warehouseData.length == 0) {
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

    stock(index, row) {
      this.add_FormVisible = true;
      this.add_Form.formulaName = row.formulaName;
      //addMaterial(row);
    },

    //进货
    addMaterial() {
      this.$refs.add_Form.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            //this.addLoading = true;
            //NProgress.start();
            //let para = Object.assign({}, this.add_Form);
            //para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');

            this.$axios
              .post(this.url_add_Form, {
                shopID: sessionStorage.getItem("shopID"),
                formulaName: this.add_Form.formulaName,
                purchaseCount: this.add_Form.purchaseCount,
                purchaseManufacture: this.add_Form.purchaseManufacture
              })
              .then(res => {
                //this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["add_Form"].resetFields();
                this.add_FormVisible = false;
                this.getData();
              });

            // addUser(para).then((res) => {
            //   //this.addLoading = false;
            //   //NProgress.done();
            //   this.$message({
            //     message: '提交成功',
            //     type: 'success'
            //   });
            //   this.$refs['edit_Form'].resetFields();
            //   this.edit_FormVisible = false;
            //   this.getData();
            // });
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.table {
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
.handle-date {
  width: 435px;
}
.mr10 {
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
ul,
li {
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
