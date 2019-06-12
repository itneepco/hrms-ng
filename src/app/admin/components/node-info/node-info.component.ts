import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { TreeNode } from '../../../shared/models/employee-node';

@Component({
  selector: 'app-node-info',
  templateUrl: "./node-info.component.html",
  styleUrls: ['./node-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeInfoComponent {
  @Input('node') node: TreeNode
  @Input('canEdit') canEdit: boolean
  @Output('onEdit') onEdit = new EventEmitter
  
  onClick() {
    this.onEdit.emit()
  }
}