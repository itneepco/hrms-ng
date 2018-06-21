import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { TreeNode } from '../../shared/employee-node';

@Component({
  selector: 'app-node-info',
  templateUrl: "./node-info.component.html",
  styleUrls: ['./node-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeInfoComponent {
  @Input('node') node: TreeNode
}