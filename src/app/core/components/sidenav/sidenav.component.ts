import { Component } from '@angular/core';

import { MenuService } from './../../services/menu.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(public menuService: MenuService,
    public auth: AuthService,  
  ) {}

  toggleMenu() {
    this.menuService.menuToggle(true)
  }
}
