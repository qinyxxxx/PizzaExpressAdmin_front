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
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </div>
      <el-table :data="pizzaData" ref="filterTable" border class="table" fit>
        <el-table-column prop="pizzaID" label="ID" width="300"></el-table-column>
        <el-table-column prop="pizzaName" label="名称" width="500"></el-table-column>
        <!-- <el-table-column prop="description" label="描述" width="200"></el-table-column>
        <el-table-column prop="formula" label="原料" width="230"></el-table-column>
        <el-table-column prop="price9" label="价格（9寸）" sortable width="150"></el-table-column>
        <el-table-column prop="price12" label="价格（12寸）" sortable width="150"></el-table-column>-->
        <el-table-column label="操作" width="350" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="openDetails(scope.row)">查看</el-button>
            <el-button size="mini" @click="editPizza(scope.row, scope.$index)">编辑</el-button>
            <el-dialog title="修改菜单" :visible.sync="editFormVisible">
              <el-form :model="pizzaData">
                <el-form-item label="名称" :label-width="formLabelWidth">
                  <el-input v-model="editObj.pizzaName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                  <el-input v-model="editObj.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="原料" :label-width="formLabelWidth">
                  <el-input v-model="editObj.formula" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="价格（9寸）" :label-width="formLabelWidth">
                  <el-input v-model="editObj.price9" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="价格（12寸）" :label-width="formLabelWidth">
                  <el-input v-model="editObj.price12" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editDo">确 定</el-button>
              </div>
            </el-dialog>
            <el-button size="mini" type="danger" @click="delPizza(scope.row)">下架</el-button>
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
      urlDel: "",
      pizzaData: [],
      cur_page: 1,
      total: 20,
      select_cate: "",
      select_word: "",
      pizzaID: "-1",
      pizzaName: "-1",
      editFormVisible: false,
      formLabelWidth: '120px',
      editObj:{
        pizzaID: "",
        pizzaName: "",
      },
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
    getData() {
      // this.$axios
      //   .post(this.urlInit)
      //   .then(res => {
      //     let pizzaData = res.data.itemData.data;
      //     this.pizzaData = pizzaData;
      //     let status = res.data.status; //状态码
      //     if (status == 200) {
      //       console.log(this.pizzaData);
      //     } else {
      //       console.log(status);
      //     }
      //   });
      this.pizzaData = [
        {
          pizzaID: "1",
          pizzaName: "夏威夷芝心披萨",
          description: "好吃",
          formula: "夏威夷、披萨",
          picURL: "../../assets/img/xiaweiyi.jpg",
          price9: "99",
          price12: "122"
        },
        {
          pizzaID: "1",
          pizzaName: "夏威夷芝心披萨",
          description: "好吃",
          formula: "夏威夷、披萨",
          price9: "99",
          picURL: "",
          price12: "122"
        },
        {
          pizzaID: "1",
          pizzaName: "夏威夷芝心披萨",
          description: "好吃",
          formula: "夏威夷、披萨",
          price9: "99",
          picURL: "",
          price12: "122"
        }
      ];
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
    openDetails(row) {
      this.$router.push({
        name: "PizzaDetail",
        params: {
          detail: row,
        }
      });
      console.log("row:", row);
    },
    editPizza(row, index) {
      this.editObj = row
      this.editFormVisible = true;
      console.log("row:", row.pizzaName);
    },
    editDo(){
      // 传给后台
      this.editFormVisible = false;

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
</style>
