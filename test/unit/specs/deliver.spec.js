import Vue from 'vue'
import Deliver from '@/components/page/deliver/deliver'
import { shallowMount } from '@vue/test-utils'
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import axios from "axios";
Vue.use(axios)

describe('deliver.vue', () => {
    const Constructor = Vue.extend(Deliver)
    const vm = new Constructor().$mount()
  it('应该有create函数', () => {
    expect(typeof Deliver.created).toBe('function')
  })
  it('应该有初始化的url',() => {
    expect(typeof Deliver.data).toBe('function')
    const defaultData = Deliver.data()
    expect(defaultData.urlInit).toBe('/pizzaexpress/deliver/getalldeliver')
  })
  it('初始化一页的数量应该是20', () => {
    expect(vm.total).toBe(10)
  })
  it('应该有控制翻页的函数',() => {
    expect(typeof Deliver.methods.handleCurrentChange).toBe('function')
  })
  it('应该用到getData函数', () => {
    expect(typeof Deliver.methods.getData).toBe('function')
  })
//   it('getData应该返回deliverData', done => {
//     const wrapper = shallowMount(Foo)
//     wrapper.find('button').trigger('click')
//     wrapper.vm.$nextTick(() => {
//       expect(wrapper.vm.value).toBe('value')
//       done()
//     })
//   })

})