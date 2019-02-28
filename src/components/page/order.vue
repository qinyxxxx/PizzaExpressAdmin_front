<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>工厂订单信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
                <el-select v-model="select_cate" filterable placeholder="筛选条件" class="handle-select mr10">
                    <el-option key="1" label="订单编号" value="订单编号"></el-option>
                    <el-option key="2" label="配送员" value="配送员"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10" >
                </el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <br/><br/>
                <el-date-picker v-model="select_date" type="datetimerange" :picker-options="pickerOptions2"
                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
                <br/><br/>
                <el-radio v-model="radio" label="1">配送完成</el-radio>
                <el-radio v-model="radio" label="2">正在配送</el-radio>
            </div>
            <el-table :data="orderData" border class="table" ref="multipleTable" > <!--@selection-change="handleSelectionChange" -->
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column prop="orderid" label="ID" width="100"></el-table-column>
                <el-table-column prop="date" label="订单时间" sortable width="220"></el-table-column>
                <el-table-column prop="user" label="用户" width="150"></el-table-column>
                <el-table-column prop="deliverer" label="配送员" width="150"></el-table-column>
                <el-table-column prop="orderInfo" label="订单内容" width="260"></el-table-column>
                <el-table-column prop="orderStatus" label="配送状态" width="120"></el-table-column>
                <el-table-column prop="orderAmount" label="金额" width="120"></el-table-column>
                
                <!-- <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <!-- <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog> -->

        <!-- 删除提示框 -->
        <!-- <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                url: 'http://localhost:8080/static/ordertable.json',
                orderData: [],
                cur_page: 1,
                // multipleSelection: [],  // 多选
                select_cate: '',
                select_word: '',
                // del_list: [],  // 删除列表
                is_search: false,
                // editVisible: false,  // 编辑按钮可以看见否
                // delVisible: false,   // 删除按钮可以显示否
                form: {
                    orderid: '',
                    date: '',
                    user: '',
                    deliverer: '',
                    orderInfo: '',
                    orderStatus: '',
                    orderAmount: ''
                },
                idx: -1,
                radio: '1',
                pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
                },
                select_date: ''
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.orderData.filter((d) => {
                    // let is_del = false;
                    // for (let i = 0; i < this.del_list.length; i++) {
                    //     if (d.orderid === this.del_list[i].orderid) {
                    //         is_del = true;
                    //         break;
                    //     }
                    // }
                    // if (!is_del) {
                    // if (d.address.indexOf(this.select_cate) > -1 &&
                    //     (d.name.indexOf(this.select_word) > -1 ||
                    //         d.address.indexOf(this.select_word) > -1)
                    // ) {
                    //     return d;
                    // }
                    // }
                    return d
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                // if (process.env.NODE_ENV === 'development') {
                //     this.url = '/ms/table/list';
                // };
                this.$axios.post(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    console.log(res);
                    this.orderData = res.data.list;
                })
                // this.axios.get('http://localhost:8081/static/ordertable.json').then
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            // handleEdit(index, row) {
            //     this.idx = index;
            //     const item = this.tableData[index];
            //     this.form = {
            //         orderid: item.orderid,
            //         date: item.date,
            //         user: item.user,
            //         deliverer: item.deliverer,
            //         orderInfo: item.orderInfo,
            //         orderStatus: item.orderStatus,
            //         orderAmount: item.orderAmount
            //     }
            //     // this.editVisible = true;
            // },
            // handleDelete(index, row) {
            //     this.idx = index;
            //     this.delVisible = true;
            // },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            // handleSelectionChange(val) {
            //     this.multipleSelection = val;
            // },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            }
        }
    }

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
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
</style>
