import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hierarchy-home',
  templateUrl: './hierarchy-home.component.html',
  styleUrls: ['./hierarchy-home.component.scss']
})
export class HierarchyHomeComponent {
  isSearching = false;
  employee

  constructor() { }

  onSearch() {
    this.isSearching = true
    this.employee = undefined
    setTimeout(() => { 
      this.isSearching = false 
      this.employee = [];
    }, 2000)
  }

}