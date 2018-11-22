import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './item/item.component';
import { GroupItemComponent } from './group-item/group-item.component';
import { InputFilterComponent } from './filter/input-filter.component';
import { AnchorComponent } from './anchor/anchor.component';
import { DropdownComponent } from './dropdown/dropdown.component';
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
