import {Component, signal, input} from '@angular/core';
import {SelectionGroupItems} from '../types';

@Component({
  selector: 'group-item',
  template: `
    <label class="dropdown-item dropdown-item-group" (mousedown)="onItemGroupClick($event)">{{item().group}}</label>
  `,
  styleUrls: ['./group-item.component.scss'],
  standalone: true
})

export class GroupItemComponent {
  /**
   * bind to [item], the group item of dropdown
   */
  item = input<SelectionGroupItems>(null);

  /**
   * prevent all clicking event from happening
   */
  onItemGroupClick(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();
  }
}
