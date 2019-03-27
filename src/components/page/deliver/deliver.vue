<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-favor"></i>
          配送员信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-select v-model="select_cate" filterable placeholder="筛选条件" class="handle-select mr10">
          <el-option key="1" label="ID" value="ID"></el-option>
          <el-option key="2" label="姓名" value="姓名"></el-option>
        </el-select>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="plain" icon="search" @click="clear">清除</el-button>
        <el-button type="plain" icon="search" @click="getData">刷新</el-button>
      </div>
      <el-table :data="deliverData" ref="filterTable" border class="table" fit>
        <el-table-column prop="deliverID" label="ID" width="150"></el-table-column>
        <el-table-column prop="deliverName" label="姓名" :formatter="formatter"></el-table-column>
        <el-table-column prop="phone" label="电话" width="250"></el-table-column>
        <el-table-column
          prop="deliverStatus"
          label="状态"
          width="250"
          :filters="[{ text: '空闲', value: '空闲' }, { text: '配送中', value: '配送中' }]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.deliverStatus === '空闲' ? 'primary' : 'success'"
              disable-transitions
            >{{scope.row.deliverStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.deliverStatus=='配送中'" type="text" icon="el-icon-view" @click="openDetails(scope.row)">查看配送信息</el-button>
            <!-- <el-button type="text" icon="el-icon-close" @click="delDeliver(scope.row)">解雇</el-button> -->
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
  name: "deliver",
  data() {
    return {
      urlInit: "/pizzaexpress/deliver/getalldeliver",
      urlSelect: "/pizzaexpress/deliver/getdeliverbyselect",
      urlDel: "/pizzaexpress/deliver/deldeliver",
      deliverData: [],
      cur_page: 1,
      total: 20,
      select_cate: "",
      select_word: "",
      deliverID: "-1",
      deliverName: "-1",
      tmp_data: []
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
        //   this.deliverData = [
        //   {
        //     deliverID: "1",
        //     deliverName: "吴青峰",
        //     phone: "13816666666",
        //     shopID: "天下第一店",
        //     deliverStatus: "空闲"
        //   },
        //   {
        //     deliverID: "2",
        //     deliverName: "陈信宏",
        //     phone: "13816666667",
        //     shopID: "天下第一店",
        //     deliverStatus: "配送中"
        //   },
        //   {
        //     deliverID: "3",
        //     deliverName: "小飞象",
        //     phone: "13816666668",
        //     shopID: "天下第一店",
        //     deliverStatus: "配送中"
        //   }
        // ];
      this.$axios
        .post(this.urlInit, {
          shopID: sessionStorage.getItem("shopID")
          // shopID: '1'
        })
        .then(res => {
          console.log(this.orderData);
          let deliverData = res.data.deliverData.data;
          this.deliverData = deliverData;
          let status = res.data.status; //状态码
          if (status == 200) {
            console.log(this.orderData);
          } else {
            console.log(this.orderData);
          }
        });
    },
    filterStatus(value, row) {
      return row.deliverStatus === value;
    },
    search() {
      switch (this.select_cate) {
        case "ID":
          this.deliverName = "-1";
          this.deliverID = this.select_word;
          break;
        case "姓名":
          this.deliverID = "-1";
          this.deliverName = this.select_word;
          break;
      }
      this.$axios
        .post(this.urlSelect, {
          deliverID: this.deliverID,
          deliverName: this.deliverName,
          shopID: sessionStorage.getItem("shopID")
        })
        .then(res => {
          let deliverData = res.data.deliverData.data;
          this.deliverData = deliverData;
          let status = res.data.status; //状态码
          if (status == 200) {
            console.log(this.deliver);
            console.log(sessionStorage.getItem("shopID"));
          } else {
            console.log(status);
          }
        });
    },
    openDetails(row) {
      this.$router.push({
        name: "deliverDetail",
        params: {
          detail: row
        }
      });
      console.log("row:", row.deliverID);
    },
    formatter(row, column) {
      return row.deliverName;
    },
    delDeliver(row) {
      this.$axios
        .post(this.url, {
          deliverID: this.deliverID,
          deliverName: this.deliverName,
          shopID: sessionStorage.getItem("shopID")
        })
        .then(res => {
          let deliverData = res.data.deliverData.data;
          this.deliverData = deliverData;
          let status = res.data.status; //状态码
          if (status == 200) {
            console.log(this.deliver);
            console.log(sessionStorage.getItem("shopID"));
          } else {
            console.log(status);
          }
        });
      console.log("del:", row.deliverName);
    },
    clear() {
      this.select_cate = "";
      this.select_word = "";
      this.getData();
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
.mr10 {
  margin-right: 10px;
}

.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
</style>
