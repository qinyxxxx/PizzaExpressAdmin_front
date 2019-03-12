<template>
  <div class>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-document"></i>消息处理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="message">
        <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
          <el-table :data="unread" :show-header="false" style="width: 100%" @selection-change="sels_unread_Change">
            <!--<el-table-column width="55">-->
              <!--<template slot-scope="scope" >-->
                <!--<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
                  <!--<el-checkbox ></el-checkbox>-->
                <!--</el-checkbox-group>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column type="selection" width="55"  @selection-change="sels_unread_Change">
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <span class="message-title">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" width="180"></el-table-column>
            <el-table-column width="120">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleRead(scope.$index)">进货</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="handle-row">
            <el-checkbox :indeterminate="isIndeterminate_unread" v-model="checkAll_unread" @change="handleCheckAllChange_unread">全选</el-checkbox>
            <el-button type="primary" @click="batchRead" :disabled="this.sels_unread.length===0" >批量进货</el-button>
            <el-button type="primary" @click="jiancha" >检查</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="`已读消息(${readed.length})`" name="second">
          <template v-if="message === 'second'">
            <el-table :data="readed" :show-header="false" style="width: 100%" @selection-change="sels_readed_Change">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <span class="message-title">{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" width="150"></el-table-column>
              <el-table-column width="120">
                <template slot-scope="scope">
                  <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="handle-row">
              <el-checkbox :indeterminate="isIndeterminate_readed" v-model="checkAll_readed" @change="handleCheckAllChange_readed">全选</el-checkbox>
              <el-button type="danger" @click="batchReaded" :disabled="this.sels_readed.length===0">批量删除</el-button>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane :label="`回收站(${trash.length})`" name="third">
          <template v-if="message === 'third'">
            <el-table :data="trash" :show-header="false" style="width: 100%">
              <el-table-column>
                <template slot-scope="scope">
                  <span class="message-title">{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" width="150"></el-table-column>
              <!--<el-table-column width="120">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-button @click="handleRestore(scope.$index)">还原</el-button>-->
                <!--</template>-->
              <!--</el-table-column>-->
            </el-table>
            <div class="handle-row">
              <el-button type="danger" @click="batchDelete">清空回收站</el-button>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "messages",
  data() {
    return {
      urlInit: "/pizzaexpress/message/getallmessage",
      message: "first",
      showHeader: false,


      checkAll_unread: false,
      checkAll_readed: false,
      isIndeterminate_unread: false,
      isIndeterminate_readed: false,

      sels_unread: [],
      sels_readed: [],
      sels_trash: [],
      readed: [],
      trash: [],

      unread: [
        {
          ID:1,
          date: "2018-04-19 20:00:00",
          title: "白菜需要进货啦！"
        },
        {
          ID:2,
          date: "2018-04-19 21:00:00",
          title: "猪肉需要进货啦！"
        }
      ],
      readed: [
        {
          date: "2018-04-19 20:00:00",
          title: "火腿需要进货啦！"
        }
      ],
      trash: [
        {
          date: "2018-04-19 20:00:00",
          title: "大蒜需要进货啦！"
        }
      ]
    };

  },
  created() {
    this.getData();
  },
  methods: {
    //   getData(){
    //       this.axios
    //       .post(this.urlInit, {
    //           shopID: sessionStorage.getItem("shopID")
    //       })
    //       .then(res => {
    //           let
    //       })
    //   },
    handleRead(index) {
      const item = this.unread.splice(index, 1);
      console.log(item);
      this.readed = item.concat(this.readed);
    },
    handleDel(index) {
      const item = this.readed.splice(index, 1);
      this.trash = item.concat(this.trash);
    },
    // handleRestore(index) {
    //   const item = this.trash.splice(index, 1);
    //   this.readed = item.concat(this.readed);
    // }
    sels_unread_Change: function (sels_unread) {
      this.sels_unread = sels_unread;
      this.checkAll_unread = this.sels_unread.length === this.unread.length;
      this.isIndeterminate_unread = this.sels_unread.length > 0 && this.sels_unread.length < this.unread.length;
    },
    handleCheckAllChange_unread(val) {
      this.sels_unread = val ?  this.unread : [];

      // this.sels_unread.forEach(item => {
      //   this.$refs.table.toggleRowSelection(item,true)
      // });
      this.isIndeterminate_unread = false;
    },
    batchRead: function () {
      var ids = this.sels_unread.map(item => item.id).toString();
      this.$confirm('确认批量进货选中记录吗？', '提示', {
        type: 'info'
      }).then(() => {
        // this.listLoading = true;
        //NProgress.start();
        // let para = { ids: ids };
        // batchRemoveUser(para).then((res) => {
        //   //this.listLoading = false;
        //   //NProgress.done();
        //   this.$message({
        //     message: '进货成功',
        //     type: 'success'
        //   });
        //   this.getUsers();
        // });
        this.$message({
          message: '进货成功',
          type: 'success'
        });
      }).catch(() => {

      });
      },


    jiancha(){
      this.$message({
        message: 'this.sels_unread：'+this.sels_unread.length,
        type: 'success'
      });
    },


    sels_readed_Change: function (sels_readed) {
        this.sels_readed = sels_readed;
        this.checkAll_readed = this.sels_readed.length === this.readed.length;
        this.isIndeterminate_readed = this.sels_readed.length > 0 && this.sels_readed.length < this.readed.length;
      },
    handleCheckAllChange_readed(val) {
      this.sels_readed = val ?  this.readed : [];

      // this.sels_unread.forEach(item => {
      //   this.$refs.table.toggleRowSelection(item,true)
      // });
      this.isIndeterminate_readed = false;
    },
    batchReaded: function () {
        var ids = this.sels_readed.map(item => item.id).toString();
        this.$confirm('确认批量删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          // this.listLoading = true;
          //NProgress.start();
          // let para = { ids: ids };
          // batchRemoveUser(para).then((res) => {
          //   //this.listLoading = false;
          //   //NProgress.done();
          //   this.$message({
          //     message: '进货成功',
          //     type: 'success'
          //   });
          //   this.getUsers();
          // });
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        }).catch(() => {

        });
      },

    batchDelete: function () {
      this.sels_trash = this.trash;
      var ids = this.sels_trash.map(item => item.id).toString();
      this.$confirm('确认清空回收站吗？', '提示', {
        type: 'warning'
      }).then(() => {
        // this.listLoading = true;
        //NProgress.start();
        // let para = { ids: ids };
        // batchRemoveUser(para).then((res) => {
        //   //this.listLoading = false;
        //   //NProgress.done();
        //   this.$message({
        //     message: '进货成功',
        //     type: 'success'
        //   });
        //   this.getUsers();
        // });
        this.$message({
          message: '成功清空回收站',
          type: 'success'
        });
      }).catch(() => {

      });
    },
  },
  // computed: {
  //   unreadNum() {
  //     return this.unread.length;
  //   }
  // }
};
</script>

<style>
.message-title {
  cursor: pointer;
}
.handle-row {
  margin-top: 30px;
}
</style>

