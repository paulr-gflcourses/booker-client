import Vue from 'vue'
import Router from 'vue-router'

import CalendarItem from '@/components/CalendarItem'
import LoginItem from '@/components/LoginItem'
import EventItem from '@/components/EventItem'
import BookItem from '@/components/BookItem'

import Page404 from '@/components/Page404'
import calendar from '../calendar/calendar';
// import HomePage from '@/components/HomePage'
// import CartPage from '@/components/CartPage'
// import ProductPage from '@/components/ProductPage'
// import Page404 from '@/components/Page404'
// import products from '../store/products';
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'CalendarItem',
      component: CalendarItem,
      children: [
        {
          // при совпадении пути с шаблоном /user/:id/profile
          // в <router-view> компонента User будет показан UserProfile
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
      // props: {date: calendar.selectedDate}
    },
    // {
    //   path: '/event/:id',
    //   name: 'EventItem',
    //   component: EventItem,
    //   props: true,
    // //   beforeEnter: (to, from, next) => {
    // //     let id = to.params.id;
    // //     if (void 0 === products.list[id]) {
    // //       next({
    // //         path: '/404',
    // //         replace: true
    // //       })
    // //     }
    // //     return next();
    // //   }
    // },
    {
      path: '/404',
      name: '404',
      component: Page404
    },
    {
      path: '*',
      redirect: {name: '404'}
    }
  ]
})
