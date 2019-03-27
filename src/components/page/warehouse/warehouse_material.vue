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

        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <!--<el-button type="primary" @click="handleAdd">新增</el-button>-->
        <br/><br/>
      </div>

      <el-table :data="warehouseData" border class="table"><!--@selection-change="selsChange"-->
        <!--<el-table-column type="selection" width="150"></el-table-column>-->
        <el-table-column prop="formulaId" label="ID" sortable width="300"></el-table-column>
        <el-table-column prop="formulaName" label="原料名称" width="300"></el-table-column>
        <!--<el-table-column prop="material_factory" label="进货厂商" width="250"></el-table-column>-->
        <!--<el-table-column prop="purchaseTime" label="生产日期" width="150"></el-table-column>-->
        <!--<el-table-column prop="material_note" label="备注" width="250"></el-table-column>-->
        <el-table-column prop="formulaCount" label="剩余数量" width="300"></el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button  size="small" @click="material_check(scope.$index,scope.row)" >查看</el-button>
            <el-button type="primary" size="small" @click="stock(scope.$index, scope.row)" >进货</el-button>
            <!--<el-button type="danger" size="small" >停用</el-button>-->
          </template>
        </el-table-column>
      </el-table>

      <!--<div :span="24" class="toolbar" style="padding:10px;">-->
        <!--<el-button type="primary" @click="batchRemove" :disabled="this.sels.length===0">批量进货</el-button>-->
        <!--&lt;!&ndash;<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量停用</el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :page-size="20" :total="100" style="float:right;">&ndash;&gt;-->
        <!--&lt;!&ndash;</el-pagination>&ndash;&gt;-->
      <!--</div>-->

    </div>

    <el-dialog title="查看原材料进货批次" :visible.sync="material_check_FormVisible" :close-on-click-modal="false">

        <el-table :data="material_check_Form" border class="table" >
          <!--<el-table-column prop="//material_id" label="ID" width="100"></el-table-column>-->
          <el-table-column prop="purchaseFormula" label="原料名称" width="100"></el-table-column>
          <el-table-column prop="purchaseManufacture" label="进货厂商" width="150"></el-table-column>
          <el-table-column prop="purchaseTime" label="进货日期" width="100"></el-table-column>
          <el-table-column prop="purchaseID" label="进货批次" width="150"></el-table-column>
          <el-table-column prop="purchaseCount" label="进货数量" width="100"></el-table-column>
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

    <el-dialog title="进货" :visible.sync="add_FormVisible" :close-on-click-modal="false">
      <el-form :model="add_Form" label-width="80px"  ref="add_Form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="进货原料" prop="formulaName">
              <el-input :readonly="true" v-model="add_Form.formulaName" >
              </el-input>
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
              <el-input-number v-model="add_Form.purchaseCount"  :min="0" :max="1000"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="add_FormVisible = false">取消</el-button>
        <el-button type="primary" @click="addMaterial" >提交</el-button><!--@click.native="add_FormVisible = false"-->
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
        ElCollapse},
      data(){
            return {
              url_material_quantity: "/pizzaexpress/shop/getallformulabyshop", //返回这个工厂的原料信息
              url_material_check_Form: "/pizzaexpress/purchase/getpurchasebyformula", //返回这个工厂的某个原料的进货历史信息
              url_add_Form: "/pizzaexpress/purchase/addpurchaseformula", //保存进货信息

              filters: {
                name: ''
              },
              select_cate: '',
              select_word: '',
              //select_date: '',
              warehouseData: [//原料信息
                {
                  formulaId:1,
                  formulaName:"面粉",
                  //material_factory:"双汇",
                  // material_note:"一定要xxx家的！!!!!!!!!!!!!!!!!!!!!!!!!!!",
                  formulaCount:"1g",
                },
                {
                  formulaId:2,
                  formulaName:"鸡蛋",
                  //material_factory:"双汇",
                  // material_note:"一定要xxx家的！",
                  formulaCount:"1g",
                },
                {
                  formulaId:3,
                  formulaName:"芝士",
                  //material_factory:"双汇",
                  // material_note:"一定要xxx家的！",
                  formulaCount:"1g",
                },
                {
                  formulaId:4,
                  formulaName:"蔬菜",
                  // material_factory:"双汇",
                  // material_note:"一定要xxx家的！",
                  formulaCount:"1g",
                },
                {
                  formulaId:5,
                  formulaName:"肉",
                 // material_factory:"双汇",
                 //  material_note:"一定要xxx家的！",
                  formulaCount:"1g",
                }
              ],
              //sels: [],
              material_check_FormVisible:false,
              material_check_Form:[//原材料历史
                {
                  //material_id:1,
                  purchaseManufacture:"",
                  purchaseFormula:"白菜",
                  purchaseTime:"2019-3-6",
                  purchaseID:2348329874,
                  purchaseCount:500
                },
                {
                  //material_id:2,
                  purchaseManufacture:"",
                  purchaseFormula:"白菜",
                  purchaseTime:"2019-3-5",
                  purchaseID:2348329874,
                  purchaseCount:500
                },
                {
                  //material_id:3,
                  purchaseManufacture:"",
                  purchaseFormula:"白菜",
                  purchaseTime:"2019-3-4",
                  purchaseID:2348329874,
                  purchaseCount:500
                },
                {
                  //material_id:4,
                  purchaseManufacture:"",
                  purchaseFormula:"白菜",
                  purchaseTime:"2019-3-5",
                  purchaseID:2348329874,
                  purchaseCount:500
                },
                {
                  //material_id:5,
                  purchaseManufacture:"",
                  purchaseFormula:"白菜",
                  purchaseTime:"2019-3-4",
                  purchaseID:2348329874,
                  purchaseCount:500
                }
              ],
              add_FormVisible:false,
              add_Form:{
                formulaName:"",
                purchaseManufacture:"",
                purchaseCount:"500",
              },
            }
        },
      created() {
        this.getData();
      },
        methods: {
          // selsChange: function (sels) {
          //   this.sels = sels;
          // },

          //返回这个工厂的某个原料的进货历史信息
          material_check(index,row){
            this.material_check_FormVisible = true;
            console.log(index, row);
            this.$axios
              .post(this.url_material_check_Form, {
                //shopID: sessionStorage.getItem("shopID")
                shopID:'1',
                formulaName:row.formulaName
              })
              .then(res => {
                let material_check_Form = res.data.purchaseData.data;//purchase 需要测试一下！
                this.material_check_Form = material_check_Form;
              });
          },

          //返回这个工厂的原料信息
          getData(){
            this.$axios
              .post(this.url_material_quantity, {
                //shopID: sessionStorage.getItem("shopID")
                shopID:'1' //因为没有login
              })
              .then(res => {
                let warehouseData = res.data.shopData.data;
                this.warehouseData = warehouseData;
              });
          },


          stock(index,row) {
            this.add_FormVisible = true;
            this.add_Form.formulaName=row.formulaName
            //addMaterial(row);
          },

          //进货
          addMaterial() {
            this.$refs.add_Form.validate((valid) => {
              if (valid) {
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                  //this.addLoading = true;
                  //NProgress.start();
                  //let para = Object.assign({}, this.add_Form);
                  //para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');

                  this.$axios
                    .post(this.url_add_Form, {
                      //shopID: sessionStorage.getItem("shopID")
                      shopID:'1',
                      formulaName:this.add_Form.formulaName,
                      purchaseCount:this.add_Form.purchaseCount,
                      purchaseManufacture:this.add_Form.purchaseManufacture
                    })
                    .then(res => {
                      //this.addLoading = false;
                      //NProgress.done();
                      this.$message({
                        message: '提交成功',
                        type: 'success'
                      });
                      this.$refs['add_Form'].resetFields();
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
