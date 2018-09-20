import { Component } from '@angular/core';

import { MenuService } from './../../services/menu.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(public menuService: MenuService) {}

  pages = [
    { name: "Training", icon: 'info', path: '/training' },
    { name: "Leave", icon: 'mood', path: '/leave' },
    { name: "Hierarchy", icon: 'device_hub', path: '/hierarchy' }
  ]

  toggleMenu() {
    this.menuService.menuToggle(true)
  }
}
