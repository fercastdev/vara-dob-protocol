import { Routes, RouterModule } from '@angular/router';
import { LoginDispatchComponent } from 'app/report-ds/login-dispatch/loginDispatch.component';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [

  {
    path: 'my-pools',
    loadChildren: () => import('../../my-pools/my-pools.module').then(m => m.MyPoolsModule)
  },
  {
    path: 'create-pool/:step/:id',
    loadChildren: () => import('../../create-pool/create-pool.module').then(m => m.CreatePoolModule) 
  },
  {
    path: 'home',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'pool',
    loadChildren: () => import('../../pool-dashboard/pool-dashboard.module').then(m => m.PoolDashboardModule)
  },
  {
    path: 'user-profile/:id',
    loadChildren: () => import('../../user-profile/user-profile.module').then(m => m.UserProfileModule)
  },
  {
    path: 'settings/:id',
    loadChildren: () => import('../../settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'explore-pools',
    loadChildren: () => import('../../explore/explore.module').then(m => m.ExploreModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('../../notifications-detail/notifications-detail.module').then(m => m.NotificationsDetailModule)
  },
  {
    path: 'dispatch',
    component: LoginDispatchComponent
  },
];
