<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>
          菜单管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-select v-model="select_cate" filterable placeholder="筛选条件" class="handle-select mr10">
          <el-option key="1" label="Pizza编号" value="Pizza编号"></el-option>
          <el-option key="2" label="Pizza名称" value="Pizza名称"></el-option>
        </el-select>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="success" @click="addPizza">添加新品</el-button>
        <el-dialog title="添加菜品" :visible.sync="addFormVisible">
          <el-form v-model="addObj">
            <el-upload
              align="center"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-change="handleAvatarSuccessAdd"
              accept="image/jpeg, image/jpg, image/png"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="addObj.picURL" :src="addObj.picURL" class="avatar" width="100%">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过2M</div>
            </el-upload>
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="addObj.pizzaName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth">
              <el-input v-model="addObj.description" autocomplete="off"></el-input>
            </el-form-item>
            <div align="center">9寸所需原料(12寸用量为9寸的1.5倍)</div><br>
            <el-col span="12">
              <el-form-item label="面粉" :label-width="formLabelWidth">
                <el-input-number v-model="addObj.flour" :min="0" :max="1000" :step="100" label="面粉"></el-input-number>
              </el-form-item>
              <el-form-item label="鸡蛋" :label-width="formLabelWidth">
                <el-input-number v-model="addObj.egg" :min="0" :max="300" :step="50" label="鸡蛋"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="芝士" :label-width="formLabelWidth">
                <el-input-number v-model="addObj.cheese" :min="0" :max="1000" :step="50" label="芝士"></el-input-number>
              </el-form-item>
              <el-form-item label="蔬菜" :label-width="formLabelWidth">
                <el-input-number
                  v-model="addObj.vegetable"
                  :min="0"
                  :max="1000"
                  :step="100"
                  label="蔬菜"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-form-item label="牛肉" :label-width="formLabelWidth">
              <el-input-number v-model="addObj.meat" :min="0" :max="1000" :step="100" label="牛肉"></el-input-number>
            </el-form-item>
            <el-form-item label="价格（9寸）" :label-width="formLabelWidth">
              <el-input v-model="addObj.price9" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格（12寸）" :label-width="formLabelWidth">
              <el-input v-model="addObj.price12" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addDo">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <el-table :data="pizzaData" ref="filterTable" border class="table" fit>
        <el-table-column prop="pizzaID" label="ID" width="100"></el-table-column>
        <el-table-column prop="pizzaName" label="名称" :formatter="formatter"></el-table-column>
        <!-- <el-table-column prop="description" label="描述" width="200"></el-table-column>
        <el-table-column prop="formula" label="原料" width="230"></el-table-column>
        <el-table-column prop="price9" label="价格（9寸）" sortable width="150"></el-table-column>
        <el-table-column prop="price12" label="价格（12寸）" sortable width="150"></el-table-column>-->
        <el-table-column
          prop="pizzaStatus"
          label="状态"
          width="250"
          :filters="[{ text: '上架', value: '上架' }, { text: '下架', value: '下架' }]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.pizzaStatus === '上架' ? 'primary' : 'info'"
              disable-transitions
            >{{scope.row.pizzaStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="350" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="openDetails(scope.row)">查看</el-button>
            <el-button size="mini" @click="editPizza(scope.row, scope.$index)">编辑</el-button>
            <el-dialog title="修改菜单" :visible.sync="editFormVisible">
              <el-form v-model="editObj">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  accept="image/jpeg, image/jpg, image/png"
                  :on-change="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img :src="editObj.picURL" class="avatar" width="100%">
                  <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过2M</div>
                </el-upload>
                <el-form-item label="名称" :label-width="formLabelWidth">
                  <el-input v-model="editObj.pizzaName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                  <el-input v-model="editObj.description" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="原料" :label-width="formLabelWidth">
                  <el-input v-model="editObj.flour" autocomplete="off"></el-input>
                </el-form-item>-->
                <!-- <el-form-item label="面粉" :label-width="formLabelWidth">
                  <el-input-number
                    v-model="editObj.flour"
                    @change="handleFormulaChange('flour')"
                    :min="0"
                    :max="100"
                    label="面粉"
                  ></el-input-number>
                </el-form-item>-->
                <el-form-item label="价格（9寸）" :label-width="formLabelWidth">
                  <el-input v-model="editObj.price9" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="价格（12寸）" :label-width="formLabelWidth">
                  <el-input v-model="editObj.price12" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-radio v-model="editObj.pizzaStatus" label="上架">上架</el-radio>
                  <el-radio v-model="editObj.pizzaStatus" label="下架">下架</el-radio>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editDo(scope.row)">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order",
  data() {
    return {
      urlSelect: "/pizzaexpress/item/getorderbyselect",
      urlInit: "/pizzaexpress/item/getallitems",
      urlDetail: "/pizzaexpress/item/getallitems",
      urlDel: "/pizzaexpress/item/getallitems",
      urlEdit: "/pizzaexpress/item/updateitems",
      urlAdd: "/pizzaexpress/item/getallitems",
      pizzaData: [],
      cur_page: 1,
      total: 20,
      active: 0,
      select_cate: "",
      select_word: "",
      pizzaID: "-1",
      pizzaName: "-1",
      editFormVisible: false,
      addFormVisible: false,
      formLabelWidth: "120px",
      detailObj: "",
      editObj: {
        pizzaName: "",
        description: "",
        flour: 0,
        egg: 0,
        cheese: 0,
        vegetable: 0,
        meat: 0,
        pizzaStatus: "",
        price9: "",
        picURL: "",
        price12: ""
      },
      addObj: {
        pizzaName: "",
        description: "",
        flour: 0,
        egg: 0,
        cheese: 0,
        vegetable: 0,
        meat: 0,
        pizzaStatus: "",
        price9: "",
        picURL: "",
        price12: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    formatter(row, column) {
      return row.pizzaName;
    },
    getData() {
      this.$axios.post(this.urlInit).then(res => {
        let pizzaData = res.data.itemData.data;
        this.pizzaData = pizzaData;
        let status = res.data.status; //状态码
        if (status == 200) {
          console.log(this.pizzaData);
        } else {
          console.log(status);
        }
      });
      // this.pizzaData = [
      //   {
      //     pizzaID: "1",
      //     pizzaName: "夏威夷芝心披萨",
      //     description: "好吃",
      //     flour: 2,
      //     egg: 1,
      //     cheese: 4,
      //     vegetable: 2,
      //     meat: 3,
      //     pizzaStatus: "上架",
      //     picURL:
      //       "http://pic.dominos.com.cn:8000/ApiPicture/20190306/3caea7802d1b4039bc51f1822f447a5f.jpg",
      //     price9: "99",
      //     price12: "122"
      //   },
      //   {
      //     pizzaID: "1",
      //     pizzaName: "夏威夷芝心披萨",
      //     description: "好吃",
      //     pizzaStatus: "下架",
      //     flour: 2,
      //     egg: 1,
      //     cheese: 4,
      //     vegetable: 2,
      //     meat: 3,
      //     price9: "99",
      //     picURL: "",
      //     price12: "122"
      //   },
      //   {
      //     pizzaID: "1",
      //     pizzaName: "夏威夷芝心披萨",
      //     description: "好吃",
      //     flour: 2,
      //     egg: 1,
      //     cheese: 4,
      //     vegetable: 2,
      //     meat: 3,
      //     pizzaStatus: "下架",
      //     price9: "99",
      //     picURL: "",
      //     price12: "122"
      //   }
      // ];
    },
    filterStatus(value, row) {
      return row.pizzaStatus === value;
    },
    search() {
      switch (this.select_cate) {
        case "pizza名称":
          this.pizzaID = "-1";
          this.pizzaName = this.select_word;
          break;
        case "pizza编号":
          this.pizzaName = "-1";
          this.pizzaID = this.select_word;
          break;
      }

      this.$axios
        .post(this.urlSelect, {
          pizzaID: this.pizzaID,
          pizzaName: this.pizzaName
        })
        .then(res => {
          let pizzaData = res.data.itemData.data;
          this.pizzaData = pizzaData;
          let status = res.data.status; //状态码
          if (status == 200) {
            console.log(this.pizzaData);
          } else {
            console.log(status);
          }
        });
    },
    addPizza() {
      this.addObj = {
        pizzaName: "",
        description: "",
        flour: 0,
        egg: 0,
        cheese: 0,
        vegetable: 0,
        meat: 0,
        pizzaStatus: "",
        price9: "",
        picURL: "",
        price12: ""
      };
      this.addFormVisible = true;
    },
    addDo() {
      console.log("addObj", this.addObj);
      // this.$axios
      //   .post(this.urlAdd, {
      //     pizzaName: this.addObj.pizzaName,
      //     description: this.addObj.description,
      //     picURL: this.addObj.picURL,
      //     pizzaStatus: this.addObj.pizzaStatus,
      //     flour: this.addObj.flour,
      //     egg: this.addObj.egg,
      //     cheese: this.addObj.cheese,
      //     vegetable: this.addObj.vegetable,
      //     meat: this.addObj.meat,
      //     price9: this.addObj.price9,
      //     price12: this.addObj.price12
      //   })
      //   .then(res => {
      //     // let pizzaData = res.data.itemData.data;
      //     // this.pizzaData = pizzaData;
      //     this.getData()
      //     let status = res.data.status; //状态码
      //     if (status == 200) {
      //       console.log(this.this.pizzaData);
      //     } else {
      //       console.log(status);
      //     }
      //   });
      this.addFormVisible = false;
    },

    openDetails(row) {
      // this.$axios
      //   .post(this.urlDetail, {
      //     pizzaID: row.pizzaID,
      //   })
      //   .then(res => {
      //     let pizzaDetail = res.data.itemData.data;
      //     this.detailObj = pizzaDetail;
      //     let status = res.data.status; //状态码
      //     if (status == 200) {
      //       console.log(this.detailObj);
      //     } else {
      //       console.log(status);
      //     }
      //   });
      this.$router.push({
        name: "PizzaDetail",
        query: {
          // detail: row
          pizzaID: row.pizzaID,
          pizzaName: row.pizzaName,
          description: row.description,
          pizzaStatus: row.pizzaStatus,
          picURL: row.picURL,
          formula: row.formula,
          price9: row.price9,
          price12: row.price12
        }
      });
      console.log("row:", row);
    },
    editPizza(row, index) {
      this.editFormVisible = true;
      this.editObj = row;
      console.log("row:", row);
    },
    editDo(row) {
      // 传给后台
      this.editFormVisible = false;
      this.$axios
        .post(this.urlEdit, {
          pizzaID: this.editObj.pizzaID,
          pizzaName: this.editObj.pizzaName,
          description: this.editObj.description,
          pizzaStatus: this.editObj.pizzaStatus,
          picURL: this.editObj.picURL,
          formula: this.editObj.formula,
          price9: this.editObj.price9,
          price12: this.editObj.price12
        })
        .then(res => {
          let pizzaAfterEdit = res.data.itemData.data;
          this.pizzaData.row = pizzaAfterEdit;
          let status = res.data.status; //状态码
          if (status == 200) {
            console.log("after update", this.this.pizzaData.row);
          } else {
            console.log(status);
          }
        });
    },
    // delPizza(row) {
    //   this.$axios
    //     .post(this.urlDel, {
    //       pizzaID: row.pizzaID
    //     })
    //     .then(res => {
    //       let pizzaAfterEdit = res.data.itemData.data;
    //       this.pizzaData.row = pizzaAfterEdit;
    //       let status = res.data.status; //状态码
    //       if (status == 200) {
    //         console.log(this.pizzaData.row);
    //       } else {
    //         console.log(status);
    //       }
    //     });
    // },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.editObj.picURL =
        "https://oss.cyzone.cn/2014/0617/20140617021745301.jpg";
    },
    handleAvatarSuccessAdd(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.addObj.picURL =
        "https://oss.cyzone.cn/2014/0617/20140617021745301.jpg";
    },
    beforeAvatarUpload(file) {
      const isIMG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isIMG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isIMG && isLt2M;
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 360px;
  height: 180px;
  display: block;
}
</style>
