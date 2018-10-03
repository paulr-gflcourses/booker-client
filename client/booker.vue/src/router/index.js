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

const isLogin = (to, from, next) => {
  if (calendar.user) {
    next()
    return
  }else{
    let user = JSON.parse(localStorage.getItem('user') || '[]');
    if (user){
      user.is_active = (user.is_active === '1');
      user.is_admin = (user.is_admin === '1');
      calendar.user = user;
      next()
      return
    }
  }
  next('/login')
};

const isAdmin = (to, from, next) => {
  let admin= (calendar.user.is_admin === '1');
  if (admin && isLogin) {
    next()
    return
  }else{
    alert('You should be authorized as admin!');
    return
  }
}

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
      ],
      beforeEnter: isLogin
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
      beforeEnter: isLogin
    },
    {
      path: '/employees',
      name: 'EmployeeListItem',
      component: EmployeeListItem,
      beforeEnter: isAdmin
    },
    {
      path: '/employee/:id',
      name: 'EmployeeItem',
      component: EmployeeItem,
      props: true,
      beforeEnter: isAdmin
    },
    {
      path: '/employee',
      name: 'EmployeeItem',
      component: EmployeeItem,
      beforeEnter: isAdmin
    },
    {
      path: '/options',
      name: 'OptionsItem',
      component: OptionsItem,
      beforeEnter: isLogin
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
