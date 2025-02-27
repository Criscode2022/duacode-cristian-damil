import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SubsManagerDirective } from '../core/directives/subs-manager/subs-manager.directive';
import { UsersService } from '../core/services/users.service';
import { User } from '../core/types/user';
import { UserComponent } from '../user/user.component';
import { CreateDialog } from './components/create-dialog.component';

@Component({
  selector: 'app-user-list',
  imports: [
    CommonModule,
    UserComponent,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent extends SubsManagerDirective implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  readonly dialog = inject(MatDialog);
  private usersService = inject(UsersService);

  protected users: User[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  protected pageSize = 0;
  protected totalItems = 0;

  protected changePage(event: PageEvent): void {
    const pageIndex = event.pageIndex + 1;
    const params: Params = { page: pageIndex };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
    });
  }

  ngOnInit(): void {
    this.subs.add(
      this.route.queryParams.subscribe((params) => {
        const page = params['page'] || 1;

        const queryParams = {
          first_name: params['firstName'] ?? null,
          last_name: params['lastName'] ?? null,
          email: params['email'] ?? null,
        };

        const filteredValues = Object.fromEntries(
          Object.entries(queryParams).filter(([_, value]) => value),
        );

        this.subs.add(
          this.usersService.getUsers(page).subscribe((users) => {
            this.users = users.data;
            this.pageSize = users.per_page;
            this.totalItems = users.total;

            if (Object.keys(filteredValues).length) {
              this.users = this.users.filter((user) =>
                Object.entries(filteredValues).every(([key, value]) =>
                  (user as any)[key]
                    ?.toLowerCase()
                    .includes(value.toLowerCase()),
                ),
              );
            }
          }),
        );
      }),
    );
  }

  protected openDialog(): void {
    this.dialog.open(CreateDialog);
  }
}
