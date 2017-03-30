export const routes = [
  {
    path: '/',
    component: require('pages'),
    redirect: {name: 'index'},
    children: [
      { path: 'index', component: require('pages/welcome'), name: 'index', meta: { requiresAuth: true } },
      { path: 'do/:templateName', component: require('pages/templates'), name: 'do', meta: { requiresAuth: true } }
    ]
  },
  { path: '/login', component: require('pages/login'), name: 'login' },

  { path: '*', redirect: { name: 'login' } }
]
