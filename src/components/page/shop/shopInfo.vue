<template>
  <section>

    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>工厂情况</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container" >

      <div >
        <el-select v-model="select_cate" filterable placeholder="筛选条件" class="handle-select mr10">
          <el-option key="1" label="工厂名称" value="工厂名称"></el-option>
          <el-option key="2" label="工厂ID" value="工厂ID"></el-option>
        </el-select>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10" >
        </el-input>

        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <br/><br/>
      </div>

      <el-table :data="factory_info" border class="table" ><!--@selection-change="selsChange"-->
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column prop="shopName" label="工厂名称" width="150"></el-table-column>
        <el-table-column prop="shopId" label="工厂ID" width="130"></el-table-column>
        <el-table-column prop="salesVolume" label="接单量（份）" width="120"></el-table-column>
        <el-table-column prop="phone" label="电话号码" width="120"></el-table-column>
        <el-table-column prop="address" label="工厂地址" width="200"></el-table-column>
        <el-table-column prop="startTime" label="营业时间" width="100"></el-table-column>
        <el-table-column prop="endTime" label="打烊时间" width="100"></el-table-column>
        <el-table-column label="操作" width="200">
          <template scope="scope">
            <el-button type="primary" size="small" @click="factory_edit(scope.$index, scope.row)" >修改</el-button>
            <el-button type="danger" size="small" @click="factory_delete(scope.$index, scope.row)"  >暂停营业</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div :span="24" class="toolbar" style="padding:10px;">
        <!--<el-button type="danger"  :disabled="this.sels.length===0">批量停业</el-button>-->
        <el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :page-size="8" :total="100" style="float:right;">
        </el-pagination>
      </div>

    </div>

    <el-dialog title="新增" :visible.sync="add_FormVisible" :close-on-click-modal="false">
      <el-form :model="add_Form" label-width="80px"  ref="add_Form">

        <el-row>
          <el-col :span="12">
            <el-form-item label="工厂账号" prop="account">
              <el-input v-model="add_Form.account"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工厂密码" prop="password">
              <el-input  v-model="add_Form.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="工厂名称" prop="shopName">
              <el-input v-model="add_Form.shopName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话号码" prop="phone">
              <el-input v-model="add_Form.phone" ></el-input>
            </el-form-item>

          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="工厂地址" prop="posString">
              <el-input  v-model="add_Form.posString"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row >
          <el-col :span="12">
            <el-form-item label="营业时间" prop="startTime">
              <el-time-picker   v-model="add_Form.startTime" value-format="HH:mm"  format="HH:mm">
              </el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="打烊时间" prop="endTime">
              <el-time-picker   v-model="add_Form.endTime" value-format="HH:mm"  format="HH:mm">
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="add_FormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit">提交</el-button><!--@click.native="add_FormVisible = false"-->
      </div>
    </el-dialog>



    <el-dialog title="修改" :visible.sync="edit_FormVisible" :close-on-click-modal="false">
      <el-form :model="edit_Form" label-width="80px"  ref="edit_Form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="工厂名称" prop="factory_name">
              <el-input v-model="edit_Form.factory_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工厂ID" prop="factory_id">
              <el-input v-model="edit_Form.factory_id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电话号码">
              <el-input v-model="edit_Form.factory_number" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接单量">
              <el-input  v-model="edit_Form.factory_count"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="工厂地址">
              <el-input  v-model="edit_Form.factory_address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row >
          <el-col :span="12">
            <el-form-item label="营业时间">
              <el-time-picker   v-model="edit_Form.start_time" value-format="HH:mm"  format="HH:mm">
              </el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="打烊时间">
              <el-time-picker   v-model="edit_Form.end_time" value-format="HH:mm"  format="HH:mm">
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="edit_FormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit">提交</el-button><!--@click.native="edit_FormVisible = false"-->
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
        url_factory_info:"/pizzaexpress/shop/getallshops",//显示所有工厂信息
        url_edit_Form: "/pizzaexpress/purchase/getpurchasebyformula", //保存修改工厂信息 需要修改！
        url_add_Form: "/pizzaexpress/shop/insertnewshop", //保存新的工厂信息
        url_factory_delete:"/pizzaexpress/shop/deleteshop",//删除某个工厂

        filters: {
          name: ''
        },
        select_cate: '',
        select_word: '',
        factory_info:[
          {
            shopName:"华东师范大学店1",
            shopId:123456,
            phone:12580,
            salesVolume:1500,
            address:"中山北路3663号",
            startTime:"8:00",
            endTime:"22:00"
          },
          {
            shopName:"华东师范大学店2",
            shopId:123456,
            phone:12580,
            salesVolume:1500,
            address:"中山北路3663号",
            startTime:"8:00",
            endTime:"22:00"
          },
          {
            shopName:"华东师范大学店3",
            shopId:123456,
            phone:12580,
            salesVolume:1500,
            address:"中山北路3663号",
            startTime:"8:00",
            endTime:"22:00"
          }
        ],
        edit_FormVisible:false,
        edit_Form: {
          factory_name:"",
          factory_id:"",
          factory_number:"",
          factory_count:"",
          factory_address:"",
          start_time:"",
          end_time:""
        },
        add_FormVisible:false,
        add_Form: {
          shopName:"",
          account:"",
          phone:"",
          password:"",
          posString:"",
          startTime:"",
          endTime:""
        },
        //sels:[],
      }
    },
    created() {
      this.getData();
    },
    methods: {

      getData(){
        this.$axios
          .post(this.url_factory_info, {
            //shopID: sessionStorage.getItem("shopID")
            //shopID:'1' //因为没有login
          })
          .then(res => {
            let factory_info = res.data.shopData.data;
            this.factory_info = factory_info;
          });
      },


      //显示新增界面
      handleAdd() {
        this.add_FormVisible = true;
        this.add_Form = {
          factory_name:"",
          factory_id:"",
          factory_number:"",
          factory_count:"",
          factory_address:"",
          start_time:"",
          end_time:""
        };
      },

     //新增
      addSubmit() {
        this.$refs.add_Form.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              //this.addLoading = true;
              //NProgress.start();
              //let para = Object.assign({}, this.add_Form);

              this.$axios
                .post(this.url_add_Form, {
                  //shopID: sessionStorage.getItem("shopID")
                  //add_Form:para
                  shopName:this.add_Form.shopName,
                  account:this.add_Form.account,
                  phone:this.add_Form.phone,
                  password:this.add_Form.password,
                  posString:this.add_Form.posString,
                  startTime:this.add_Form.startTime,
                  endTime:this.add_Form.endTime,
                  picUrl:'https://tse4-mm.cn.bing.net/th?id=OIP.-f_CE3A-13sMV8RI1iU4TAHaFj&pid=Api&dpr=1'
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
            });
          }
        });
      },

      factory_edit(index, row){
        this.edit_FormVisible=true;
        this.edit_Form = Object.assign({}, row);
      },
      //编辑提交工厂信息
      editSubmit: function () {
        this.$refs.edit_Form.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              //this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.edit_Form);
              //para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');

              this.$axios
                .post(this.url_edit_Form, {
                  //shopID: sessionStorage.getItem("shopID")
                  edit_Form:para
                })
                .then(res => {
                  //this.addLoading = false;
                  //NProgress.done();
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['edit_Form'].resetFields();
                  this.edit_FormVisible = false;
                  this.getData();
                });

              // editUser(para).then((res) => {
              //   //this.editLoading = false;
              //   //NProgress.done();
              //   this.$message({
              //     message: '提交成功',
              //     type: 'success'
              //   });
              //   this.$refs['edit_Form'].resetFields();
              //   this.edit_FormVisible = false;
              //   this.getUsers();
              // });


            });
          }
        });
      },

      // selsChange: function (sels) {
      //   this.sels = sels;
      // },
      factory_delete(index, row){
        this.$confirm('确认暂停这家工厂吗？', '提示', {}).then(() => {

          this.$axios
            .post(this.url_factory_delete, {
              shopID:row.shopId
            })
            .then(res => {
              this.$message({
                message: '停业操作完成',
                type: 'success'
              });
              this.getData();
            });
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
  ul,li{
    list-style: none;
  }
</style>
