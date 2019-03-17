import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import addpost from '@/components/AddPost'
import editpost from '@/components/EditPost'
import Employees from '@/components/Employee/Employees'
import AddEmployee from '@/components/Employee/AddEmployee'
import EditEmployee from '@/components/Employee/EditEmployee'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/posts/add',
      component: addpost,
      name: 'addpost'
    },
    {
      path: '/posts/:id/edit',
      component: editpost,
      name: 'editpost'
    },
    {
      path: '/employees',
      name: 'employees',
      component: Employees
    },
    {
      path: '/employees/add',
      component: AddEmployee,
      name: 'addEmployee'
    },
    {
      path: '/employees/:id/edit',
      component: EditEmployee,
      name: 'editEmployee'
    }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})