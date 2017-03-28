import Vue from 'vue'
import App from './App.vue'

test('App mounts without exceptions', () => {
  const Ctor = Vue.extend(App)
  const vm = new Ctor().$mount()
  expect(vm.$el.textContent).toMatchSnapshot()
})