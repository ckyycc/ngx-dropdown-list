import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectionItem} from '../types';
import {isNumber} from '../utils/util';

@Component({
  selector: 'item',
  template: `
    <label [class.container-checkbox]="checkbox"
           [class.container-selection]="!checkbox && !item.selected"
           [class.container-selection-selected]="!checkbox && item.selected"
           [id]="item.id" (mousedown)="onItemClick(item)">
      {{needFormatNumber(item.text)? (item.text | number:'1.0-2') : item.text}}{{suffixText? suffixText : ''}}
      <ng-container *ngIf="checkbox">
        <input type='checkbox' [id]="'checkbox-'+item.text" (change)="onCheckStatusChange(item)" [checked]="item.selected">
        <span class="checkmark" [id]="'checkmark-'+item.text"></span>
      </ng-container>
    </label>`,
  styleUrls: ['./item.component.scss']
})

export class ItemComponent {
  /**
   * bind to [checkbox], the flag of checkbox mode
   */
  @Input() checkbox: boolean;
  /**
   * bind to [item], the dropdown option item
   */
  @Input() item: SelectionItem;
  /**
   * bind to [formatNumber], the flag for formatting the number
   */
  @Input() formatNumber = false;
  /**
   * bind to [suffixText], the suffixText that will be displayed in the dropdown
   */
  @Input() suffixText: string;
  /**
   * bind to [itemClick] event, triggers when clicking the item of dropdown
   */
  @Output() itemClick = new EventEmitter<string>();
  /**
   * bind to [checkStatusChange] event, triggers when check status is changed in checkbox mode.
   */
  @Output() checkStatusChange = new EventEmitter<string>();

  /**
   * check whether needs to format number for the provided text
   */
  needFormatNumber(value: any): boolean {
    return isNumber(value) && this.formatNumber;
  }

  /**
   * triggered when clicking the item, emits the [itemClick] event
   */
  onItemClick(item) {
    this.itemClick.emit(item);
  }

  /**
   * triggered when checking status changed in checkbox mode, emits the [checkStatusChange] event
   */
  onCheckStatusChange(item) {
    this.checkStatusChange.emit(item);
  }
}
