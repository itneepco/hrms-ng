import { Component, Input } from '@angular/core';

import { NavObject } from '../../model/nav-object';
import { MenuService } from '../../../core/services/menu.service';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css']
})
export class SubheaderComponent {
  @Input('title') title: string;
  @Input('navObj') navObj: NavObject;
}
