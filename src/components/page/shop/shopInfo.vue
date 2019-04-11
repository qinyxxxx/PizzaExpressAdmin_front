<template>
  <section>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>工厂情况</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div>
        <el-select v-model="select_cate" filterable placeholder="筛选条件" class="handle-select mr10">
          <el-option key="1" label="工厂名称" value="工厂名称"></el-option>
          <el-option key="2" label="工厂ID" value="工厂ID"></el-option>
        </el-select>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>

        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button type="plain" @click="clear">清除/刷新</el-button>
        <br>
        <br>
      </div>

      <el-table :data="factory_info.slice((cur_page-1)*10,cur_page*10)" border class="table">
        <!--@selection-change="selsChange"-->
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column prop="shopID" label="工厂ID" width="130"></el-table-column>
        <el-table-column prop="shopName" label="工厂名称" width="150"></el-table-column>
        <el-table-column prop="shopSalesVolume" label="接单量（份）" width="120"></el-table-column>
        <el-table-column prop="shopPhone" label="电话" width="120"></el-table-column>
        <el-table-column prop="shopAddress" label="工厂地址" :formatter="formatter"></el-table-column>
        <el-table-column prop="shopStartTime" label="营业时间" width="100"></el-table-column>
        <el-table-column prop="shopEndTime" label="打烊时间" width="100"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="factory_edit(scope.$index, scope.row)">修改</el-button>
            <el-button
              type="danger"
              size="small"
              @click="factory_delete(scope.$index, scope.row)"
            >暂停营业</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div :span="24" class="toolbar" style="padding:10px;">
        <!--<el-button type="danger"  :disabled="this.sels.length===0">批量停业</el-button>-->
        <el-pagination
          layout="prev, pager, next"
          background
          @current-change="handleCurrentChange"
          :current-page="cur_page"
          :total="total"
          style="float:right;"
        ></el-pagination>
      </div>
    </div>

    <el-dialog title="新增" :visible.sync="add_FormVisible" :close-on-click-modal="false">
      <el-form :model="add_Form" label-width="80px" :rules="rules" ref="add_Form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="管理账号" prop="account">
              <el-input v-model="add_Form.account"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码" prop="password">
              <el-input v-model="add_Form.password" type="password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="确认密码" prop="password2">
              <el-input v-model="add_Form.password2" type="password"></el-input>
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
            <el-form-item label="电话号码" prop="shopPhone">
              <el-input v-model.number="add_Form.shopPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="工厂地址" prop="shopAddress">
              <el-input v-model="add_Form.shopAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="营业时间" prop="startTime">
              <el-time-picker v-model="add_Form.shopStartTime" value-format="HH:mm" format="HH:mm"></el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="打烊时间" prop="endTime">
              <el-time-picker v-model="add_Form.shopEndTime" value-format="HH:mm" format="HH:mm"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="add_FormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit">提交</el-button>
        <!--@click.native="add_FormVisible = false"-->
      </div>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="edit_FormVisible" :close-on-click-modal="false">
      <el-form :model="edit_Form" label-width="80px" ref="edit_Form" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="工厂名称" prop="shopName">
              <el-input v-model="edit_Form.shopName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话号码">
              <el-input v-model.number="edit_Form.shopPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="工厂地址">
              <el-input v-model="edit_Form.shopAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="营业时间">
              <el-time-picker v-model="edit_Form.shopStartTime" value-format="HH:mm" format="HH:mm"></el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="打烊时间">
              <el-time-picker v-model="edit_Form.shopEndTime" value-format="HH:mm" format="HH:mm"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="edit_FormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit">提交</el-button>
        <!--@click.native="edit_FormVisible = false"-->
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
      url_factory_info: "/pizzaexpress/shop/getallshops", //显示所有工厂信息
      url_edit_Form: "/pizzaexpress/shop/updateShop", //保存修改工厂信息 需要修改！
      url_add_Form: "/pizzaexpress/shop/insertnewshop", //保存新的工厂信息
      url_factory_delete: "/pizzaexpress/shop/deleteshop", //删除某个工厂
      url_select_factory: "/pizzaexpress/shop/getShopByIDorName",

      cur_page: 1,
      total: 0,
      select_cate: "",
      select_word: "",
      shopID: "-1",
      shopName: "-1",
      factory_info: [],
      edit_FormVisible: false,
      edit_Form: {
        shopID: "",
        shopName: "",
        shopPhone: "",
        shopSalesVolume: "",
        shopAddress: "",
        shopStartTime: "",
        shopEndTime: ""
      },
      add_FormVisible: false,
      add_Form: {
        account: "",
        password: "",
        password2: "",
        shopName: "",
        shopPhone: "",
        shopSalesVolume: "",
        shopAddress: "",
        shopStartTime: "",
        shopEndTime: ""
      },
      rules: {
        account: [
          {
            required: true,
            message: "工厂管理账号不能为空",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 5 到 15 个字符", trigger: "blur" }
        ],
        password2: [
          { required: true, message: "请再次确认密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.add_Form.password) {
                callback(new Error("两次输入密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        shopName: [
          { required: true, message: "名称不能为空", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        shopPhone: [
          { type: "number", message: "电话只能包含数字", trigger: "blur" }
        ],
        shopAddress: [
          { required: true, message: "地址不能为空", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        shopStartTime: [
          { required: true, message: "营业时间不能为空", trigger: "blur" }
        ],
        shopEndTime: [
          { required: true, message: "打烊时间不能为空", trigger: "blur" }
        ]
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
      this.$axios.post(this.url_factory_info, {}).then(res => {
        let factory_info = res.data.shopData.data;
        this.factory_info = factory_info;
        this.total = factory_info.length;
      });
    },
    formatter(row, column) {
      return row.shopAddress;
    },
    clear() {
      this.select_cate = "";
      this.select_word = "";
      this.getData();
    },
    //显示新增界面
    handleAdd() {
      this.add_FormVisible = true;
      this.add_Form = {
        account: "",
        password: "",
        password2: "",
        shopName: "",
        shopPhone: "",
        shopSalesVolume: "",
        shopAddress: "",
        shopStartTime: "",
        shopEndTime: ""
      };
    },

    //新增
    addSubmit() {
      this.$refs.add_Form.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.add_FormVisible = false;
            this.$axios
              .post(this.url_add_Form, {
                shopName: this.add_Form.shopName,
                account: this.add_Form.account,
                shopPhone: this.add_Form.shopPhone,
                password: this.add_Form.password,
                posString: this.add_Form.shopAddress,
                shopStartTime: this.add_Form.shopStartTime,
                shopEndTime: this.add_Form.shopEndTime,
                picUrl:
                  "https://tse4-mm.cn.bing.net/th?id=OIP.-f_CE3A-13sMV8RI1iU4TAHaFj&pid=Api&dpr=1"
              })
              .then(res => {
                let status = res.data.status;
                if (status == 200) {
                  this.$message.success("添加成功！");
                  this.$refs["add_Form"].resetFields();
                  this.getData();
                } else {
                  this.$message.error("添加失败啦");
                }
              });
          });
        }
      });
    },
    search() {
      switch (this.select_cate) {
        case "工厂名称":
          this.shopName = this.select_word;
          this.shopID = "-1";
          break;
        case "工厂ID":
          this.shopID = this.select_word;
          this.shopName = "-1";
          break;
      }
      if (this.select_cate == "") {
        this.$message.error("抱歉，搜索类别不能为空");
      } else if (this.select_word == "") {
        this.$message.error("抱歉，搜索内容不能为空");
      } else {
        this.$axios
          .post(this.url_select_factory, {
            shopID: this.shopID,
            shopName: this.shopName
          })
          .then(res => {
            let shopData = res.data.shopData.data;
            if (shopData.length == 0) {
              this.$message({
                message: "抱歉，未找到记录",
                type: "info"
              });
            } else {
              this.factory_info = shopData;
              this.total = shopData.length;
            }
          });
      }
    },
    factory_edit(index, row) {
      this.edit_FormVisible = true;
      this.edit_Form = row;
    },

    //编辑提交工厂信息
    editSubmit: function() {
      this.$refs.edit_Form.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.edit_FormVisible = false;
            this.$axios
              .post(this.url_edit_Form, {
                shopID: this.edit_Form.shopID,
                shopName: this.edit_Form.shopName,
                shopAddress: this.edit_Form.shopAddress,
                shopPhone: this.edit_Form.shopPhone,
                shopStartTime: this.edit_Form.shopStartTime,
                shopEndTime: this.edit_Form.shopEndTime
              })
              .then(res => {
                let status = res.data.status;
                if (status == 200) {
                  this.$message.success("修改成功！");
                  this.$refs["edit_Form"].resetFields();
                  this.getData();
                } else {
                  this.$message.error("修改失败啦");
                }
              });
          });
        }
      });
    },

    factory_delete(index, row) {
      this.$confirm("确认暂停这家工厂吗？", "提示", {}).then(() => {
        this.$axios
          .post(this.url_factory_delete, {
            shopID: row.shopID
          })
          .then(res => {
            this.$message({
              message: "停业操作完成",
              type: "success"
            });
            this.getData();
          });
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
ul,
li {
  list-style: none;
}
</style>
