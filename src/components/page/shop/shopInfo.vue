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
        </el-select>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10" >
        </el-input>

        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <br/><br/>
      </div>

      <el-table :data="factory_info" border class="table" @selection-change="selsChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="factory_name" label="工厂名称" width="150"></el-table-column>
        <el-table-column prop="factory_id" label="工厂ID" width="120"></el-table-column>
        <el-table-column prop="factory_count" label="接单量（份）" width="100"></el-table-column>
        <el-table-column prop="factory_number" label="电话号码" width="120"></el-table-column>
        <el-table-column prop="factory_address" label="工厂地址" width="200"></el-table-column>
        <el-table-column prop="start_time" label="营业时间" width="100"></el-table-column>
        <el-table-column prop="end_time" label="打烊时间" width="100"></el-table-column>
        <el-table-column label="操作" width="180">
          <template scope="scope">
            <el-button type="primary" size="small" @click="factory_edit" >修改</el-button>
            <el-button type="danger" size="small" >暂停营业</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div :span="24" class="toolbar" style="padding:10px;">
        <el-button type="danger"  :disabled="this.sels.length===0">批量停业</el-button>
        <el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :page-size="8" :total="100" style="float:right;">
        </el-pagination>
      </div>

    </div>

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
        <el-button type="primary" @click.native="edit_FormVisible = false">提交</el-button>
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
        filters: {
          name: ''
        },
        select_cate: '',
        select_word: '',
        edit_FormVisible:false,
        factory_info:[
          {
            factory_name:"华东师范大学店",
            factory_id:123456,
            factory_number:12580,
            factory_count:1500,
            factory_address:"中山北路3663号",
            start_time:"8:00",
            end_time:"22:00"
          },
          {
            factory_name:"华东师范大学店",
            factory_id:123456,
            factory_number:12580,
            factory_count:1500,
            factory_address:"中山北路3663号",
            start_time:"8:00",
            end_time:"22:00"
          },
          {
            factory_name:"华东师范大学店",
            factory_id:123456,
            factory_number:12580,
            factory_count:1500,
            factory_address:"中山北路3663号",
            start_time:"8:00",
            end_time:"22:00"
          }
        ],
        edit_Form: {
          factory_name:"华东师范大学店",
          factory_id:123456,
          factory_number:12580,
          factory_count:1500,
          factory_address:"中山北路3663号",
          start_time:"8:00",
          end_time:"22:00"
        },
        sels:[],
      }
    },
    methods: {
      factory_edit(){
        this.edit_FormVisible=true;
        // this.edit_Form = Object.assign({}, row);
      },
      selsChange: function (sels) {
        this.sels = sels;
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
