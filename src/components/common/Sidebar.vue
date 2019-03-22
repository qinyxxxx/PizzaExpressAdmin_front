<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-pizza-shouye1',
                        index: 'echarts',
                        title: '工厂首页',
                      // subs: [
                      //   {
                      //     index: 'Dashboard',
                      //     title: '临时首页'
                      //   },
                      //   {
                      //     index: 'echarts',
                      //     title: '工厂首页',
                      //   }
                      // ]
                    },
                    {
                        icon: 'el-icon-pizza-yingxiaozhushou1',
                        index: 'order',
                        title: '订单情况'
                    },
                    {
                        icon: 'el-icon-pizza-tuandui1',
                        index: 'deliver',
                        title: '配送员情况'
                    },
                    {
                        icon: 'el-icon-pizza-xunikehu1',
                        index: '4',
                        title: '库存情况',
                      subs: [
                        {
                          index: 'warehouse_material',
                          title: '原料库存信息',
                        },
                        {
                          index: 'warehouse_product',
                          title: '成品库存信息',
                        },
                        // {
                        //   index: 'warehouse_emergency',
                        //   title: '库存紧急事件'
                        // }
                      ]

                    },
                    {
                        icon: 'el-icon-pizza-xiaoxi1',
                        index: 'message',
                        title: '消息处理'
                    },
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
