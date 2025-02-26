import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsersService } from '../core/services/users.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-list',
  imports: [MatProgressSpinnerModule, UserComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  private UsersService = inject(UsersService);
  users: any[] = [];

  ngOnInit(): void {
    this.UsersService.getUsers(1).subscribe((users) => {
      this.users = users;
    });
  }
}
