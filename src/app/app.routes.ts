import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: UserListComponent, pathMatch: 'full' },
      { path: 'user/:userId', component: UserDetailsComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];
