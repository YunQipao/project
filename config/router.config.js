export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/usermanage/userlist', authority: ['admin', 'user'] },
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   icon: 'dashboard',
      //   routes: [
      //     {
      //       path: '/dashboard/analysis',
      //       name: 'analysis',
      //       component: './Dashboard/Analysis',
      //     },
      //     {
      //       path: '/dashboard/monitor',
      //       name: 'monitor',
      //       component: './Dashboard/Monitor',
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'workplace',
      //       component: './Dashboard/Workplace',
      //     },
      //   ],
      // },
      {
        path: '/adminmanage',
        name: 'adminmanage',
        icon: 'warning',
        authority: ['admin'],
        routes: [
          {
            path: '/adminmanage/adminlist',
            name: 'adminlist',
            component: './AdminList/AdminList',
          },
        ],
      },
      {
        path: '/usermanage',
        name: 'usermanage',
        icon: 'user',
        routes: [
          {
            path: '/usermanage/userlist',
            name: 'userlist',
            component: './UserList/UserList',
          },
          {
            path: '/usermanage/userdetail',
            name: 'userdetail',
            component: './Profile/UserProfile',
          },
          {
            path: '/usermanage/userdetail/:id',
            hideInMenu: false,
            component: './Profile/UserProfile',
          },
          {
            path: '/usermanage/userstest',
            name: 'usertest',
            component: './UserList/UserTest',
          },
          {
            path: '/usermanage/usertestdetail',
            name: 'usertestdetail',
            component: './Profile/UserTestProfile',
          },
          {
            path: '/usermanage/usertestdetail/:id',
            hideInMenu: false,
            component: './Profile/UserTestProfile',
          },
        ],
      },
      {
        path: '/ordermanage',
        name: 'ordermanage',
        icon: 'profile',
        routes: [
          {
            path: '/ordermanage/orderlist',
            name: 'orderlist',
            component: './OrderList/OrderList',
          },
          {
            path: '/ordermanage/orderdetail',
            name: 'orderdetail',
            component: './Profile/OrderProfile',
          },
          {
            path: '/ordermanage/orderdetail/:id',
            hideInMenu: false,
            component: './Profile/OrderProfile',
          },

          {
            path: '/ordermanage/ordertest',
            name: 'ordertest',
            component: './OrderList/OrderTest',
          },
          {
            path: '/ordermanage/ordertestdetail',
            name: 'ordertestdetail',
            component: './Profile/OrderTestProfile',
          },
          {
            path: '/ordermanage/ordertestdetail/:id',
            hideInMenu: false,
            authority: ['admin'],
            component: './Profile/OrderTestProfile',
          },
        ],
      },
      {
        path: '/drivermanage',
        name: 'drivermanage',
        icon: 'car',
        routes: [
          {
            path: '/drivermanage/driverlist',
            name: 'driverlist',
            component: './DriverList/DriverList',
          },
          {
            path: '/drivermanage/driverdetail',
            name: 'driverdetail',
            component: './Profile/DriverProfile',
          },
          {
            path: '/drivermanage/driverdetail/:id',
            hideInMenu: false,
            component: './Profile/DriverProfile',
          },
        ],
      },
      {
        path: '/feedbackmanage',
        name: 'feedbackmanage',
        icon: 'audit',
        routes: [
          {
            path: '/feedbackmanage/feedbacklist',
            name: 'feedbacklist',
            component: './FeedbackList/FeedbackList',
          },
          {
            path: '/feedbackmanage/feedbackdetail',
            name: 'feedbackdetail',
            component: './Profile/FeedbackProfile',
          },
          {
            path: '/feedbackmanage/feedbackdetail/:id',
            hideInMenu: false,
            component: './Profile/FeedbackProfile',
          },
        ],
      },
      {
        path: '/statisticsmanage',
        name: 'statisticsmanage',
        icon: 'bar-chart',
        routes: [
          {
            path: '/statisticsmanage/statistics',
            name: 'statistics',
            component: './Statistics/Statistics',
          },
        ],
      },
      {
        path: '/noticemanage',
        name: 'noticemanage',
        icon: 'reconciliation',
        routes: [
          {
            path: '/noticemanage/noticeform',
            name: 'noticeform',
            component: './NoticesList/NoticesForm',
          },
          {
            path: '/noticemanage/noticelist',
            name: 'noticelist',
            component: './NoticesList/NoticesList',
          },
          {
            path: '/noticemanage/noticedetail',
            name: 'noticedetail',
            component: './Profile/NoticesProfile',
          },
          {
            path: '/noticemanage/noticedetail/:id',
            hideInMenu: false,
            component: './Profile/NoticesProfile',
          },
        ],
      },
      {
        path: '/couponsmanage',
        name: 'couponsmanage',
        icon: 'pay-circle',
        routes: [
          {
            path: '/couponsmanage/couponsform',
            name: 'couponsform',
            component: './CouponsList/CouponsForm',
          },
          {
            path: '/couponsmanage/couponslist',
            name: 'couponslist',
            component: './CouponsList/CouponsList',
          },
          {
            path: '/couponsmanage/couponsdetail',
            name: 'couponsdetail',
            component: './Profile/CouponsProfile',
          },
          {
            path: '/couponsmanage/couponsdetail/:id',
            hideInMenu: false,
            component: './Profile/CouponsProfile',
          },
        ],
      },
      // forms
      // {
      //   path: '/form',
      //   icon: 'form',
      //   name: 'form',
      //   routes: [
      //     {
      //       path: '/form/basic-form',
      //       name: 'basicform',
      //       component: './Forms/BasicForm',
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'stepform',
      //       component: './Forms/StepForm',
      //       hideChildrenInMenu: true,
      //       routes: [
      //         {
      //           path: '/form/step-form',
      //           redirect: '/form/step-form/info',
      //         },
      //         {
      //           path: '/form/step-form/info',
      //           name: 'info',
      //           component: './Forms/StepForm/Step1',
      //         },
      //         {
      //           path: '/form/step-form/confirm',
      //           name: 'confirm',
      //           component: './Forms/StepForm/Step2',
      //         },
      //         {
      //           path: '/form/step-form/result',
      //           name: 'result',
      //           component: './Forms/StepForm/Step3',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'advancedform',
      //       authority: ['admin'],
      //       component: './Forms/AdvancedForm',
      //     },
      //   ],
      // },
      // // list
      // {
      //   path: '/list',
      //   icon: 'table',
      //   name: 'list',
      //   routes: [
      //     {
      //       path: '/list/table-list',
      //       name: 'searchtable',
      //       component: './List/TableList',
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'basiclist',
      //       component: './List/BasicList',
      //     },
      //     {
      //       path: '/list/card-list',
      //       name: 'cardlist',
      //       component: './List/CardList',
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'searchlist',
      //       component: './List/List',
      //       routes: [
      //         {
      //           path: '/list/search',
      //           redirect: '/list/search/articles',
      //         },
      //         {
      //           path: '/list/search/articles',
      //           name: 'articles',
      //           component: './List/Articles',
      //         },
      //         {
      //           path: '/list/search/projects',
      //           name: 'projects',
      //           component: './List/Projects',
      //         },
      //         {
      //           path: '/list/search/applications',
      //           name: 'applications',
      //           component: './List/Applications',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   icon: 'profile',
      //   routes: [
      //     // profile
      //     {
      //       path: '/profile/basic',
      //       name: 'basic',
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/basic/:id',
      //       hideInMenu: true,
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'advanced',
      //       authority: ['admin'],
      //       component: './Profile/AdvancedProfile',
      //     },
      //   ],
      // },
      // {
      //   name: 'result',
      //   icon: 'check-circle-o',
      //   path: '/result',
      //   routes: [
      //     // result
      //     {
      //       path: '/result/success',
      //       name: 'success',
      //       component: './Result/Success',
      //     },
      //     { path: '/result/fail', name: 'fail', component: './Result/Error' },
      //   ],
      // },
      // {
      //   name: 'exception',
      //   icon: 'warning',
      //   path: '/exception',
      //   routes: [
      //     // exception
      //     {
      //       path: '/exception/403',
      //       name: 'not-permission',
      //       component: './Exception/403',
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'not-find',
      //       component: './Exception/404',
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'server-error',
      //       component: './Exception/500',
      //     },
      //     {
      //       path: '/exception/trigger',
      //       name: 'trigger',
      //       hideInMenu: true,
      //       component: './Exception/TriggerException',
      //     },
      //   ],
      // },
      // {
      //   name: 'account',
      //   icon: 'user',
      //   path: '/account',
      //   routes: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       component: './Account/Center/Center',
      //       routes: [
      //         {
      //           path: '/account/center',
      //           redirect: '/account/center/articles',
      //         },
      //         {
      //           path: '/account/center/articles',
      //           component: './Account/Center/Articles',
      //         },
      //         {
      //           path: '/account/center/applications',
      //           component: './Account/Center/Applications',
      //         },
      //         {
      //           path: '/account/center/projects',
      //           component: './Account/Center/Projects',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: './Account/Settings/Info',
      //       routes: [
      //         {
      //           path: '/account/settings',
      //           redirect: '/account/settings/base',
      //         },
      //         {
      //           path: '/account/settings/base',
      //           component: './Account/Settings/BaseView',
      //         },
      //         {
      //           path: '/account/settings/security',
      //           component: './Account/Settings/SecurityView',
      //         },
      //         {
      //           path: '/account/settings/binding',
      //           component: './Account/Settings/BindingView',
      //         },
      //         {
      //           path: '/account/settings/notification',
      //           component: './Account/Settings/NotificationView',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // //  editor
      // {
      //   name: 'editor',
      //   icon: 'highlight',
      //   path: '/editor',
      //   routes: [
      //     {
      //       path: '/editor/flow',
      //       name: 'flow',
      //       component: './Editor/GGEditor/Flow',
      //     },
      //     {
      //       path: '/editor/mind',
      //       name: 'mind',
      //       component: './Editor/GGEditor/Mind',
      //     },
      //     {
      //       path: '/editor/koni',
      //       name: 'koni',
      //       component: './Editor/GGEditor/Koni',
      //     },
      //   ],
      // },
      {
        component: '404',
      },
    ],
  },
];
