import {Component, EventEmitter, Output, input, effect} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'input-filter',
  template: `
    <input type="text" class="filter-box" [(ngModel)]="internalFilterValue" (input)="onChange()" (blur)="onFilterTextBlur($event)">
  `,
  styleUrls: ['./input-filter.component.scss'],
  standalone: true,
  imports: [ FormsModule ]
})

export class InputFilterComponent {
  /**
   * bind to [filterValue], input signal from parent component
   */
  filterValue = input<string>('');

  /**
   * internal property for ngModel binding (not a signal)
   */
  internalFilterValue: string = '';

  /**
   * bind to [inputFilterBlur], emits with (blur) of filter input box
   */
  @Output() inputFilterBlur = new EventEmitter<string>();
  /**
   * bind to [filterValueChange], for 2-way binding of filterValue
   */
  @Output() filterValueChange = new EventEmitter<string>();

  constructor() {
    // Sync parent filterValue to internal property
    effect(() => {
      this.internalFilterValue = this.filterValue();
    });
  }

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
    this.filterValueChange.emit(this.internalFilterValue);
  }
}
