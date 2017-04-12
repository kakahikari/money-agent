export const routes = [
  {
    path: '/',
    component: require('pages'),
    redirect: {name: 'index'},
    children: [
      { path: 'index', component: require('pages/welcome'), name: 'index', meta: { requiresAuth: true } },
      {
        path: 'do/',
        component: require('pages/templates'),
        name: 'do',
        meta: { requiresAuth: true },
        children: [
          { path: 'memberList', name: 'memberList', component: require('pages/templates/memberList'), meta: { requiresAuth: true } },
          { path: 'depositList', name: 'depositList', component: require('pages/templates/depositList'), meta: { requiresAuth: true } },
          { path: 'withdrawList', name: 'withdrawList', component: require('pages/templates/withdrawList'), meta: { requiresAuth: true } }
        ]
      }
    ]
  },
  { path: '/login', component: require('pages/login'), name: 'login' },

  { path: '*', redirect: { name: 'login' } }
]
