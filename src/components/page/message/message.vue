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
          <el-table
            :data="unread"
            ref="unread"
            :show-header="false"
            style="width: 100%"
            :reserve-selection="true"
          >
            <!--@selection-change="sels_unread_Change"-->
            <!--<el-table-column type="selection" width="55"  @selection-change="sels_unread_Change">-->
            <!--</el-table-column>-->
            <el-table-column prop="content">
              <!--<template slot-scope="scope" >-->
              <!--<span class="message-title">{{scope.row.content}}</span>-->
              <!--</template>-->
            </el-table-column>
            <el-table-column prop="time" width="180"></el-table-column>

            <el-table-column width="120">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="handleRead(scope.$index, scope.row)"
                >进货</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--<div class="handle-row">-->
          <!--<el-checkbox :indeterminate="isIndeterminate_unread" v-model="checkAll_unread"-->
          <!--:disabled="this.unread.length===0" @change="handleCheckAllChange_unread">全选</el-checkbox>-->
          <!--<el-button type="primary" @click="batchRead" :disabled="this.sels_unread.length===0" >批量进货</el-button>-->
          <!--<el-button type="primary" @click="jiancha" >检查</el-button>-->
          <!--</div>-->
        </el-tab-pane>

        <el-dialog title="进货" :visible.sync="add_FormVisible" :close-on-click-modal="false">
          <el-form :model="add_Form" label-width="80px" ref="add_Form">
            <el-row>
              <el-col :span="8">
                <el-form-item label="进货原料" prop="title">
                  <el-input :readonly="true" v-model="add_Form.title"></el-input>
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
                  <el-input-number v-model="add_Form.purchaseCount" :min="0" :max="1000"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="add_FormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addMaterial">提交</el-button>
            <!--@click.native="add_FormVisible = false"-->
          </div>
        </el-dialog>

        <el-tab-pane :label="`已读消息(${readed.length})`" name="second">
          <template v-if="message === 'second'">
            <el-table :data="readed" :show-header="false" style="width: 100%">
              <!--@selection-change="sels_readed_Change"-->
              <el-table-column prop="content">
                <!--<template slot-scope="scope">-->
                <!--<span class="message-title">{{scope.row.content}}</span>-->
                <!--</template>-->
              </el-table-column>
              <el-table-column prop="time" width="150"></el-table-column>
            </el-table>
            <!--<div class="handle-row">-->
            <!--<el-checkbox :indeterminate="isIndeterminate_readed" v-model="checkAll_readed" @change="handleCheckAllChange_readed">全选</el-checkbox>-->
            <!--<el-button type="danger" @click="batchReaded" :disabled="this.sels_readed.length===0">批量删除</el-button>-->
            <!--</div>-->
          </template>
        </el-tab-pane>

        <!--<el-tab-pane :label="`回收站(${trash.length})`" name="third">-->
        <!--<template v-if="message === 'third'">-->
        <!--<el-table :data="trash" :show-header="false" style="width: 100%">-->
        <!--<el-table-column>-->
        <!--<template slot-scope="scope">-->
        <!--<span class="message-title">{{scope.row.title}}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="date" width="150"></el-table-column>-->
        <!--&lt;!&ndash;<el-table-column width="120">&ndash;&gt;-->
        <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
        <!--&lt;!&ndash;<el-button @click="handleRestore(scope.$index)">还原</el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;</template>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
        <!--</el-table>-->
        <!--<div class="handle-row">-->
        <!--<el-button type="danger" @click="batchDelete">清空回收站</el-button>-->
        <!--</div>-->
        <!--</template>-->
        <!--</el-tab-pane>-->
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "messages",
  data() {
    return {
      url_unread: "/pizzaexpress/notice/queryunreadnotices", //得到未读消息
      url_change_status: "/pizzaexpress/notice/updatenoticestatus", //未读消息到已读
      url_readed: "/pizzaexpress/notice/queryreadnotices", //得到已读消息
      url_add_Form: "/pizzaexpress/purchase/addpurchaseformula", //保存进货信息

      message: "first",
      showHeader: false,

      checkAll_unread: false,
      //checkAll_readed: false,
      isIndeterminate_unread: false,
      //isIndeterminate_readed: false,

      sels_unread: [],
      //sels_readed: [],
      //sels_trash: [],
      readed: [],
      //trash: [],

      unread: [
        {
          //ID:1,
          noticeID: "",
          title: "",
          time: "2018-04-19 20:00:00",
          content: "白菜需要进货啦！"
        },
        {
          //ID:2,
          noticeID: "",
          title: "",
          time: "2018-04-19 21:00:00",
          content: "猪肉需要进货啦！"
        }
      ],
      readed: [
        {
          time: "2018-04-19 20:00:00",
          content: "火腿需要进货啦！"
        }
      ],
      // trash: [
      //   {
      //     date: "2018-04-19 20:00:00",
      //     title: "大蒜需要进货啦！"
      //   }
      // ]
      add_FormVisible: false,
      add_Form: {
        noticeID: "",
        title: "",
        purchaseManufacture: "",
        purchaseCount: "500"
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .post(this.url_unread, {
          shopID: sessionStorage.getItem("shopID")
          // shopID: "1" //因为没有login
        })
        .then(res => {
          this.unread = res.data.unreadNoticeData.data;
        });

      this.$axios
        .post(this.url_readed, {
          shopID: sessionStorage.getItem("shopID")
          // shopID: "1" //因为没有login
        })
        .then(res => {
          let readed = res.data.readNoticeData.data;
          this.readed = readed;
        });
    },
    handleRead(index, row) {
      // const item = this.unread.splice(index, 1);
      // console.log(item);
      // this.readed = item.concat(this.readed);
      this.add_FormVisible = true;
      this.add_Form.title = row.title;
      this.add_Form.noticeID = row.noticeID;
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
                // shopID: "1",
                formulaName: this.add_Form.title,
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

            this.$axios
              .post(this.url_change_status, {
                //shopID: sessionStorage.getItem("shopID")
                noticeId: this.add_Form.noticeID
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
          });
        }
      });
    },

    handleDel(index) {
      const item = this.readed.splice(index, 1);
      this.trash = item.concat(this.trash);
    }

    // handleRestore(index) {
    //   const item = this.trash.splice(index, 1);
    //   this.readed = item.concat(this.readed);
    // }

    // sels_unread_Change: function (sels_unread) {
    //   this.sels_unread = sels_unread;
    //   this.checkAll_unread = this.sels_unread.length === this.unread.length;
    //   this.isIndeterminate_unread = this.sels_unread.length > 0 && this.sels_unread.length < this.unread.length;
    // },

    // handleCheckAllChange_unread(val) {
    //   this.sels_unread = val ?  this.unread : [];
    //   if(this.sels_unread.length){
    //   this.sels_unread.forEach(item => {
    //     this.$refs.unreadTable.toggleRowSelection(item,true)
    //   });
    //   }
    //   else {
    //     this.sels_unread = this.unread;
    //     this.sels_unread.forEach(item => {
    //       this.$refs.unreadTable.toggleRowSelection(item,false)
    //     });
    //     // this.$refs.unreadTable.clearSelection()
    //   }
    //   this.isIndeterminate_unread = false;
    // },
    // batchRead: function () {
    //   var ids = this.sels_unread.map(item => item.id).toString();
    //   this.$confirm('确认批量进货选中记录吗？', '提示', {
    //     type: 'info'
    //   }).then(() => {
    //     // this.listLoading = true;
    //     //NProgress.start();
    //     // let para = { ids: ids };
    //     // batchRemoveUser(para).then((res) => {
    //     //   //this.listLoading = false;
    //     //   //NProgress.done();
    //     //   this.$message({
    //     //     message: '进货成功',
    //     //     type: 'success'
    //     //   });
    //     //   this.getUsers();
    //     // });
    //     this.$message({
    //       message: '进货成功',
    //       type: 'success'
    //     });
    //   }).catch(() => {
    //
    //   });
    //   },
    //
    //
    // jiancha(){
    //   this.$message({
    //     message: 'this.sels_unread：'+this.sels_unread.length,
    //     type: 'success'
    //   });
    // },
  }
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

