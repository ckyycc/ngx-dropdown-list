import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'input-filter',
  template: `
    <input type="text" class="filter-box" [(ngModel)]="filterValue" (input)="onChange()" (blur)="onFilterTextBlur($event)">
  `,
  styleUrls: ['./input-filter.component.scss']
})

export class InputFilterComponent {
  /**
   * bind to [filterValue], the value of the filter
   */
  @Input() filterValue: string;
  /**
   * bind to [inputFilterBlur], emits with (blur) of filter input box
   */
  @Output() inputFilterBlur = new EventEmitter<string>();
  /**
   * bind to [filterValueChange], for 2-way binding of filterValue
   */
  @Output() filterValueChange = new EventEmitter<string>();

  /**
   * triggers with (blur) event, emits the (inputFilterBlur) event
   */
  onFilterTextBlur(event) {
    this.inputFilterBlur.emit(event);
  }

  /**
   * triggers with (input) event, emits the (filterValueChange) event for 2-way binding of filterValue
   */
  onChange() {
    this.filterValueChange.emit(this.filterValue);
  }
}
