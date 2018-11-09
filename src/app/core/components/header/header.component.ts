import { ChangePasswordComponent } from './../../../auth/components/change-password/change-password.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MenuService } from '../../services/menu.service';
import { AuthService } from './../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private menuService: MenuService,
    private dialog: MatDialog,
    public auth: AuthService) {}

  toggleMenu() {
    this.menuService.menuToggle(true)
  }

  onLogout() {
    this.auth.logout();
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent, {
      width: '480px',
      height: '330px'
    })
  }
}
