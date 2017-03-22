export const routes = [
  {
    path: '/',
    component: require('pages'),
    children: [
      { path: '/', redirect: {name: 'main'} },
      { path: 'index', component: require('pages/main'), name: 'main', meta: { requiresAuth: true } },

      {
        path: 'auth',
        component: require('pages/auth'),
        children: [
          { path: '/', redirect: { name: 'login' }, name: 'auth' },
          { path: 'login', component: require('pages/auth/login'), name: 'login' },
          { path: 'signup', component: require('pages/auth/signup'), name: 'signup' }
        ]
      }
    ]
  },

  { path: '*', redirect: { name: 'index' } }
]
