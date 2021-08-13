import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // chargement des données si nécessaire (lazy-loaded)
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // chargement des données si nécessaire (lazy-loaded)
      component: () => import('../views/BoardAdmin.vue')
    },
    {
      path: '/mod',
      name: 'moderator',
      // chargement des données si nécessaire (lazy-loaded)
      component: () => import('../views/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      // chargement des données si nécessaire (lazy-loaded)
      component: () => import('../views/BoardUser.vue')
    },
    {
      path: '/users',
      name: 'users',
      // chargement des données si nécessaire (lazy-loaded)
      component: () => import('../components/UserListAdmin.vue')
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('../components/PostList.vue')
    },
    {
      path: '/posts/report',
      name: 'posts-signalés',
      component: () => import('../components/PostListAdmin.vue')
    },
    {
      path: '/posts/:id',
      name: 'posts-details',
      component: () => import('../components/Post.vue')
    },
    {
      path: '/users/:id',
      name: 'user-details',
      component: () => import('../components/User.vue')
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('../components/AddPost.vue')
    },
    {
      path: '/comments',
      name: 'comment',
      component: () => import('../components/Post.vue')
    }
  ]
});