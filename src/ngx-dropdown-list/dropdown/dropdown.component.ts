import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {clearAllSelection, getFirstSelectedItem, hasGroup, stopPropagationAndDefault} from '../utils/util';

@Component({
  selector: 'dropdown',
  template: `
    <span #dropdown class="dropdown" tabindex="3" (mousedown)="onItemsClick($event)" (blur)="onItemsBlur($event)" *ngIf="!disabled" >
      <input-filter #filterInput tabindex="4" *ngIf="filterBox && !checkbox" [(filterValue)]="filterValue" (inputFilterBlur)="onFilterTextBlur($event)"></input-filter>
      <span #selectionOptions [ngClass]="optionsClass">
        <ng-container *ngFor="let item of itemsValues" >
          <ng-container *ngIf="item && item.group">
            <group-item [item]="item"></group-item>
            <item *ngFor="let subItem of item.items" (itemClick)="onItemClick(subItem)" (checkStatusChange)="toggleSelection(subItem)"
                  [item]="subItem" [checkbox]="checkbox" [formatNumber]="formatNumber" [suffixText]="suffixText">
            </item>
          </ng-container>
          <ng-container *ngIf="item && !item.group">
            <item (itemClick)="onItemClick(item)" (checkStatusChange)="toggleSelection(item)"
                  [item]="item" [checkbox]="checkbox" [formatNumber]="formatNumber" [suffixText]="suffixText">
            </item>
          </ng-container>
        </ng-container>
      </span>
    </span>
  `,
  styleUrls: ['./dropdown.component.scss']
})

export class DropdownComponent implements OnChanges {
  /**
   * Child element reference of dropdown
   */
  @ViewChild('dropdown', { read: ElementRef }) dropdownRef: ElementRef;
  /**
   * Child element reference of filter input text
   */
  @ViewChild('filterInput', { read: ElementRef }) filterInputRef: ElementRef;
  /**
   * bind to [placeHolder] for displaying the place holder string of the anchor.
   */
  @Input() placeHolder: string;
  /**
   * bind to [items] for the options/groups in the dropdown
   */
  @Input() items: any[];
  /**
   * bind to [checkbox], the flag for multi-select (checkbox) mode.
   */
  @Input() checkbox = false;
  /**
   * bind to [selectedValue] for the value of the selected option from dropdown
   */
  @Input() selectedValue: any;
  /**
   * bind to [filterBox] for displaying the filter input text box
   */
  @Input() filterBox = false;
  /**
   * bind to [suffixText] for displaying the suffix of the selected text of anchor
   */
  @Input() suffixText: string;
  /**
   * bind to [disabled] for disabling the dropdown
   */
  @Input() disabled: boolean;
  /**
   * bind to [allowClear] for enabling the clearance (clearance is not avaiable when checkbox is enabled)
   */
  @Input() allowClear = true;
  /**
   * bind to [formatNumber] for show formatted number text
   */
  @Input() formatNumber = false;
  /**
   * for 2-way binding of [selectedValue]
   */
  @Output() selectedValueChange = new EventEmitter<string>(true);
  /**
   * [selectionChange] event that will be triggered when changing of the selection
   */
  @Output() selectionChange = new EventEmitter<any>(true);
  /**
   * [dropdownBlur] event that will be triggered with (blur) of dropdown
   */
  @Output() dropdownBlur = new EventEmitter<any>();
  /**
   * [itemClick] event that will be triggered when clicking the option of dropdown
   */
  @Output() itemClick = new EventEmitter<any>();
  /**
   * filter value
   */
  filterValue: string;
  /**
   * flag of clicking dropdown. It's to prevent (blur) of dropdown from happening in checkbox mode.
   */
  private _clickedItems = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items) {
      this._checkSelectionChange(changes.items.previousValue, changes.items.currentValue);
    }
  }

  /**
   * triggered when clicking the dropdown
   */
  onItemsClick(event: any): void {
    if (event.offsetX > (event.target.clientWidth + event.target.clientLeft)) {
      stopPropagationAndDefault(event);
      return;
    }
    // should ignore clicking on filter
    if (this.checkbox && event.target.type !== 'text') {
      this._clickedItems = true;
    }
  }

  /**
   * triggered when clicking the item
   */
  onItemClick(currentItem): void {
    if (!this.checkbox) {
      this.selectedValue = this._getItemValue(currentItem); // currentItem.value != null ? currentItem.value : currentItem.text;
      clearAllSelection(this.items);
      // set the selection of current one
      currentItem.selected = true;
      this.itemClick.emit(currentItem);
      this._onSelectionChange(this.selectedValue);
    }
  }

  /**
   * triggers with (blur) event of filter input box
   */
  onFilterTextBlur(event): void {
    this.dropdownBlur.emit(event);
  }

  /**
   * triggers with (blur) event of dropdown
   */
  onItemsBlur(event): void {
    if (this.checkbox) {
      if (this._clickedItems) {
        // in checkbox mode, this blur event will be ignored when clicking the dropdown (check the checkbox)
        event.target.focus();
        this._clickedItems = false;
        return;
      }
    }
    this.dropdownBlur.emit(event);
  }

  /**
   * toggle the selection when checking status changed (in checkbox mode)
   */
  toggleSelection(item: {id: string, value?: any, text: any, selected?: boolean}): void {
    item.selected = !item.selected;
    this.selectionChange.emit(this._getItemValue(item)); // item.value != null ? item.value : item.text);
  }

  /**
   * items values list after applying the filter
   */
  get itemsValues(): any[] {
    let filter;
    if (this.filterValue) {
      filter = this.filterValue.toUpperCase();
    }

    if (filter == null) {
      return this.items;
    }
    if (!this.items || this.items.length === 0) {
      return [];
    }
    if (hasGroup(this.items)) {
      const items = [];
      this.items.forEach(groupItem => {
        if (groupItem.group != null && groupItem.group.toString().toUpperCase().includes(filter)) {
          // if groupItem contains the filters, the groupItem needs to be displayed as well
          items.push(groupItem);
        } else {
          const filteredItems = groupItem.items.filter(item => item.text != null && item.text.toString().toUpperCase().includes(filter));
          if (filteredItems && filteredItems.length > 0) {
            items.push({group: groupItem.group, items: filteredItems});
          }
        }
      });
      return items;
    } else {
      return this.items.filter(item => (item.text != null && item.text.toString().toUpperCase().includes(filter)));
    }
  }
  /**
   * options CSS class
   */
  get optionsClass(): string {
    if (this.filterBox && !this.checkbox) {
      return 'options with-filter';
    } else {
      return 'options no-filter';
    }
  }

  /**
   * get item value. Return text if value is not available
   */
  private _getItemValue(item): any {
    return item ? item.value != null ? item.value : item.text : undefined;
  }

  /**
   * selection changed, emits events: (selectedValueChange) and (selectionChange);
   */
  private _onSelectionChange(value) {
    this.selectedValueChange.emit(value);
    this.selectionChange.emit(value);
  }

  /**
   * check whether the selection is changed. Emits relative events when if changed.
   */
  private _checkSelectionChange(previousValue, currentValue) {
    const curSelectedItem = getFirstSelectedItem(currentValue);
    const lastSelectedItem = getFirstSelectedItem(previousValue);
    const curSelectedItemId = curSelectedItem ? curSelectedItem.id : undefined;
    const lastSelectedItemId = lastSelectedItem ? lastSelectedItem.id : undefined;
    if (curSelectedItemId !== lastSelectedItemId && !this.checkbox) {
      this._onSelectionChange(this._getItemValue(curSelectedItem));
    }
  }
}
