import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserSearchComponent } from '../user-search/user-search.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    UserSearchComponent,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    UserSearchComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  protected mode$: Observable<'side' | 'over'>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.mode$ = this.breakpointObserver
      .observe('(min-width: 768px)')
      .pipe(map((result) => (result.matches ? 'side' : 'over')));
  }
}
