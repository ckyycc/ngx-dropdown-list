import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './item';
import { GroupItemComponent } from './group-item';
import { InputFilterComponent } from './filter';
import { AnchorComponent } from './anchor';
import { DropdownComponent } from './dropdown';
import { DropdownListComponent } from './dropdown-list.component';

@NgModule({
  declarations: [
    DropdownListComponent,
    ItemComponent,
    GroupItemComponent,
    InputFilterComponent,
    AnchorComponent,
    DropdownComponent
  ],
  exports: [ DropdownListComponent],
  imports: [ CommonModule, FormsModule ],
  providers: [],
  bootstrap: [],
})
export class DropdownListModule {}
