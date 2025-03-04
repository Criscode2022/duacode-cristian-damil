import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { StopPropagationDirective } from '../core/directives/stop-propagation/stop-propagation.directive';
import { User } from '../core/types/user';

@Component({
  selector: 'app-user',
  imports: [
    RouterModule,
    ClipboardModule,
    StopPropagationDirective,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  @Input() user = {} as User;
}
