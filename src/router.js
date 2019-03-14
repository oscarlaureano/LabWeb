import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import ReportExpenses from './views/ReportExpenses.vue'
import ReportProduction from './views/ReportProduction.vue'
import ReportSales from './views/ReportSales.vue'
import ReportSensors from './views/ReportSensors.vue'
import ReportUsers from './views/ReportUsers.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/reportExpenses',
      name: 'ReportExpenses',
      component: ReportExpenses
    },
    {
      path: '/reportProduction',
      name: 'ReportProduction',
      component: ReportProduction
    },
    {
      path: '/reportSales',
      name: 'ReportSales',
      component: ReportSales
    },
    {
      path: '/reportSensors',
      name: 'ReportSensors',
      component: ReportSensors
    },
    {
      path: '/reportUsers',
      name: 'ReportUsers',
      component: ReportUsers
    }
  ]
})
