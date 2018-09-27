import { NavObject } from '../../../shared/model/nav-object';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss']
})
export class HierarchyComponent {
  nav: NavObject[] = [
    { name: 'Hierarchy Home', path: 'home' }
  ]
}
