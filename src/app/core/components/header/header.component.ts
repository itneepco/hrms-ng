import { Component } from '@angular/core';

import { MenuService } from '../../services/menu.service';
import { AuthService } from './../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private menuService: MenuService,
    private auth: AuthService) {}

  toggleMenu() {
    this.menuService.menuToggle(true)
  }

  onLogout() {
    this.auth.logout();
  }
}
