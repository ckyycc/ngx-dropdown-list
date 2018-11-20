import {Component, Input} from '@angular/core';
import {SelectionGroupItems} from '../types/selection-group-items.types';

@Component({
  selector: 'group-item',
  template: `
    <label class="dropdown-item dropdown-item-group" (mousedown)="onItemGroupClick($event)">{{item.group}}</label>
  `,
  styleUrls: ['./group-item.component.scss']
})

export class GroupItemComponent {
  /**
   * bind to [item], the group item of dropdown
   */
  @Input() item: SelectionGroupItems;

  /**
   * prevent all clicking event from happening
   */
  onItemGroupClick(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();
  }
}
