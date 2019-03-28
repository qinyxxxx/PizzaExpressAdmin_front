import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        // {
        //     path: '/',
        //     redirect: '/dashboard'
        // },
        {
            path: '/Home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '工厂管理员路由描述' },
            children: [
              {
                path: '/echarts',
                component: resolve => require(['../components/page/echarts.vue'], resolve),
                meta: { title: '工厂首页' }
              },
                {
                    path: '/warehouse_material',
                    // component: resolve => require(['../components/page/warehouse_material.vue'], resolve),
                    // meta: { title: '原料库存信息' },
                    // path: '/warehouse',
                    // name: 'Warehouse',
                    // component: resolve => require(['../components/page/warehouse.vue'], resolve),
                    // meta: { title: '库存情况' }
                    component: resolve => require(['../components/page/warehouse/warehouse_material.vue'], resolve),
                    meta: { title: '原料库存信息' }
                },
              {
                path: '/warehouse_product',
                component: resolve => require(['../components/page/warehouse/warehouse_product.vue'], resolve),
                meta: { title: '成品库存信息' }
              },
                {
                    path: '/echarts',
                    component: resolve => require(['../components/page/echarts.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/order',
                    name: 'Order',
                    component: resolve => require(['../components/page/order/order.vue'], resolve),
                    meta: { title: '订单情况' }
                },
                {
                    path: '/message',
                    component: resolve => require(['../components/page/message/message.vue'], resolve),
                    meta: { title: '消息处理' }
                },
                {
                    path: '/deliver',
                    name: 'Deliver',
                    component: resolve => require(['../components/page/deliver/deliver.vue'], resolve),
                    meta: { title: '配送员情况' }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/404/403.vue'], resolve),
                    meta: { title: '403' }
                },
                {
                    path: '/orderDetail',
                    name: 'OrderDetail',
                    component: resolve => require(['../components/page/order/orderDetail.vue'], resolve),
                    meta: { title: '订单详情' }
                },
                {
                    path: '/deliverDetail',
                    name: 'DeliverDetail',
                    component: resolve => require(['../components/page/deliver/deliverDetail.vue'], resolve),
                    meta: { title: '配送员详情' }
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/login/login.vue'], resolve)
            // component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/Home2',
            component: resolve => require(['../components/common/Home2.vue'], resolve),
            meta: { title: '系统管理员路由描述' },
            children: [
                {
                    path: '/dashboard2',
                    name: 'Dashboard2',
                    component: resolve => require(['../components/page/Dashboard2.vue'], resolve),
                    meta: { title: '系统管理首页' }
                },
                {
                    path: '/menu',
                    name: 'Menu',
                    component: resolve => require(['../components/page/menu/menu.vue'], resolve),
                    meta: { title: '菜单管理' }
                },
                {
                    path: '/pizzaDetail',
                    name: 'PizzaDetail',
                    component: resolve => require(['../components/page/menu/pizzaDetail.vue'], resolve),
                    meta: { title: 'pizza详情' }
                },
                {
                    path: '/shopInfo',
                    name: 'ShopInfo',
                    component: resolve => require(['../components/page/shop/shopInfo.vue'], resolve),
                    meta: { title: '工厂情况' }
                },
                {
                    path: '/shopIncome',
                    name: 'ShopIncome',
                    component: resolve => require(['../components/page/shop/shopIncome.vue'], resolve),
                    meta: { title: '工厂收益' }
                },
                {
                    path: '/user',
                    name: 'User',
                    component: resolve => require(['../components/page/user/user.vue'], resolve),
                    meta: { title: '用户管理' }
                },
            ]
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
