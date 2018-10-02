import Vue from 'vue'
import Router from 'vue-router'

import CalendarItem from '@/components/CalendarItem'
import LoginItem from '@/components/LoginItem'
import EventItem from '@/components/EventItem'
import BookItem from '@/components/BookItem'
import EmployeeListItem from '@/components/EmployeeListItem'
import EmployeeItem from '@/components/EmployeeItem'
import OptionsItem from '@/components/OptionsItem'

import Page404 from '@/components/Page404'
import calendar from '../calendar/calendar';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CalendarItem',
      component: CalendarItem,
      children: [
        {
          path: 'event/:id',
          name: 'EventItem',
          component: EventItem,
          props: true,
        }
      ]
    },
    {
      path: '/login',
      name: 'LoginItem',
      component: LoginItem
    },
    {
      path: '/newEvent',
      name: 'BookItem',
      component: BookItem,
    },
    {
      path: '/employees',
      name: 'EmployeeListItem',
      component: EmployeeListItem,
    },
    {
      path: '/employee/:id',
      name: 'EmployeeItem',
      component: EmployeeItem,
      props: true
    },
    {
      path: '/employee',
      name: 'EmployeeItem',
      component: EmployeeItem
    },
    {
      path: '/options',
      name: 'OptionsItem',
      component: OptionsItem
    },
    {
      path: '/404',
      name: '404',
      component: Page404
    },
    {
      path: '*',
      redirect: { name: '404' }
    }
  ]
})
