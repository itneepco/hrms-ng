import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-child-node',
  templateUrl: './add-child-node.component.html',
  styleUrls: ['./add-child-node.component.scss']
})
export class AddChildNodeComponent implements OnInit {
  isSearching = false;

  constructor(public dialogRef: MatDialogRef<AddChildNodeComponent>) { }

  ngOnInit() {
  }

  onSearch() {
    this.isSearching = true
    setTimeout(() => { 
      this.isSearching = false 
    }, 2000)
  }

}
