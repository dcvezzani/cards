import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CardTable from '@/components/CardTable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CardTable',
      component: CardTable
    }
  ]
})
