import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DropdownListModule } from '../ngx-dropdown-list';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DropdownListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
