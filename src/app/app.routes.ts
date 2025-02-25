import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { UserListComponent } from './user-list/user-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: UserListComponent },
      { path: '**', redirectTo: 'home' },
    ],
  },
];
