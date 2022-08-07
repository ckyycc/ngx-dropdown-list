import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {clearAllSelection, getFirstSelectedItem, stopPropagationAndDefault} from './utils/util';

@Component({
  selector: 'ngx-dropdown-list',
  template: `
    <span class="ngx-select">
        <anchor (anchorClick)="onAnchorClick($event)" (clearanceClick)="onClearanceClick($event)"
                [checkbox]="multiSelection"
                [formatNumber]="formatNumber"
                [suffixText]="suffixText"
                [placeHolder]="placeHolder"
                [allowClear]="allowClear"
                [openStatus]="dropdownVisibility"
                [selectedText]="selectedText"
                [disabled]="disabled">
        </anchor>
        <dropdown #dropdown (dropdownBlur) = "onItemsBlur()" (selectionChange)="onSelectionChange($event)"
                [items]="items"
                [checkbox]="multiSelection"
                [filterBox]="filterBox"
                [formatNumber]="formatNumber"
                [suffixText]="suffixText"
                [(selectedValue)]="selectedValue"
                (itemClick) = "onItemClick()"
                [disabled]="disabled">
        </dropdown>
    </span>
  `,
  styleUrls: ['./dropdown-list.component.scss'],
})

export class DropdownListComponent {
  @ViewChild('dropdown', { read: ElementRef }) dropdownRef: ElementRef;

  /**
   * bind to [placeHolder] for displaying the place holder string of the anchor.
   */
  @Input() placeHolder: string;
  /**
   * bind to [items] for the options/groups in the dropdown
   */
  @Input() items: any[];
  /**
   * bind to [multiSelection], the flag for multi-select (checkbox) mode.
   */
  @Input() multiSelection = false;
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
   * for 2-way binding of [selectedValue], using async event to
   * prevent "ExpressionChangedAfterItHasBeenCheckedError".
   */
  @Output() selectedValueChange = new EventEmitter<string>(true);
  /**
   * [selectionChange] event that will be triggered when changing of the selection.
   * Using async event to prevent "ExpressionChangedAfterItHasBeenCheckedError".
   */
  @Output() selectionChange = new EventEmitter<any>(true);

  /**
   * visibility flag of drop down
   */
  dropdownVisibility = false;

  /**
   * current selected text
   */
  get selectedText(): any {
    if (!this.multiSelection) {
      const selectedItem = getFirstSelectedItem(this.items);
      return selectedItem ? selectedItem.text : undefined;
    }
  }

  /**
   * triggered with (selectionChange) event, emits (selectedValueChange) and (selectionChange)
   */
  onSelectionChange(event) {
    this.selectedValueChange.emit(event);
    this.selectionChange.emit(event);
  }

  /**
   * triggered with (anchorClick) event, controlling the "open" and "close" of the dropdown
   */
  onAnchorClick(event: Event): void {
    if (this.disabled) {
      stopPropagationAndDefault(event);
      return;
    }
    if (this._isSelectionOpen()) {
      this._hideItemList();
    } else {
      this._showItemsList();
    }
    stopPropagationAndDefault(event);
  }

  /**
   * triggered with (itemClick) event, closes the dropdown in non-checkbox mode
   */
  onItemClick(): void {
    if (!this.multiSelection) {
      this._hideItemList();
    }
  }

  /**
   * triggered with (clearanceClick) event, clearing all selections
   * and emits (selectedValueChange) and (selectionChange) event for empty value
   */
  onClearanceClick(event: Event): void {
    if (!this.multiSelection) {
      this.selectedValue = void 0;
      this.selectedValueChange.emit(undefined);
      this.selectionChange.emit(undefined);
      clearAllSelection(this.items);
    }
    stopPropagationAndDefault(event);
  }

  /**
   * triggered with (dropdownBlur) event, closes the dropdown
   */
  onItemsBlur(): void {
    if (this._isSelectionOpen()) {
      this._hideItemList();
    }
  }

  /**
   * close the dropdown
   */
  private _hideItemList(): void {
    // hide the dropdown element (has some problem for using CSS directly, using this as a workaround)
    this._dropdownElement.classList.remove('visible');
    this._dropdownElement.style.display = 'none';
    this.dropdownVisibility = false;
  }

  /**
   * open the dropdown
   */
  private _showItemsList(): void {
    // display the dropdown element (has some problem for using CSS directly, using this as a workaround)
    this._dropdownElement.classList.add('visible');
    this._dropdownElement.style.display = 'block';

    this.dropdownVisibility = true;

    // scrolling to the selected item
    if (this._selectedElement) {
      this._selectedElement.scrollIntoView({ behavior: 'auto', block: 'center' });
    }

    // setting the focus
    if (this.filterBox && !this.multiSelection) {
      this._filterInputElement.focus();
    } else {
      this._dropdownElement.focus();
    }
  }

  /**
   * visibility status of dropdown
   */
  private _isSelectionOpen(): boolean {
    return this.dropdownVisibility;
  }

  /**
   * get the real dropdown element (for focusing and visibility controlling), the <span> not the <dropdown>
   */
  private get _dropdownElement(): any {
    return this.dropdownRef ? this.dropdownRef.nativeElement ? this.dropdownRef.nativeElement.firstElementChild : null : null;
  }

  /**
   * get the real filter element (for focusing), the <input> not the <input-filter>
   */
  private get _filterInputElement(): any {
    return this._dropdownElement ?
      this._dropdownElement.firstElementChild ? this._dropdownElement.firstElementChild.firstElementChild : null : null;
  }

  /**
   * get the HTMLElement of selected item, for doing (scrollIntoView) scrolling to the selected item
   */
  private get _selectedElement(): HTMLElement {
    const selectedItem = getFirstSelectedItem(this.items);
    return selectedItem ? document.getElementById(selectedItem.id) as HTMLElement : undefined;
  }
}
