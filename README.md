# ngx-dropdown-list

[![npm](https://img.shields.io/npm/v/ngx-dropdown-list.svg?style=flat-square)](https://www.npmjs.com/package/ngx-dropdown-list) [![npm downloads](https://img.shields.io/npm/dm/ngx-dropdown-list.svg)](https://www.npmjs.com/package/ngx-dropdown-list) [![Travis](https://img.shields.io/travis/ckyycc/ngx-dropdown-list.svg?style=flat-square)](https://travis-ci.org/ckyycc/ngx-dropdown-list) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/ckyycc/ngx-dropdown-list/blob/master/LICENSE)

An Angular 7 module for selecting data from drop-down list which supports multi-selection and filter.

## Installation
```bash
npm install ngx-dropdown-list --save
```
## DEMO
Check out the [DEMO](https://ckyycc.github.io/ngx-dropdown-list/) for more information!

## Usage

### Importing The 'ngx-dropdown-list' Module
```TypeScript
import { DropdownListModule } from 'ngx-dropdown-list';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    DropdownListModule,
    ...
  ],
  providers: [],
  bootstrap: [...]
})

export class AppModule { }

```
### Enabling Dropdown List
```HTML
<ngx-dropdown-list (selectionChange)="onChange($event)"
                   [items]="optionItems"
                   [multiSelection]="false"
                   [placeHolder]="'place holder of the drop-down list'"
                   [(selectedValue)]="maxRowsLimitation"
                   [suffixText]="' suffix text'"
                   [filterBox]="false"
                   [formatNumber]="true"
                   [disabled]="false">
</ngx-dropdown-list>
```

## Parameters
Name  | Description | Example | 
------------- | ------------- | -------------
(selectionChange)  | On change function called after the status of selection changed | (selectionChange)="onChange($event)"
items  | Source data of the drop-down list | [items]="optionItems"
multiSelection  | Provides support for multiple selection | [multiSelection]="true"
placeHolder  | Place holder of the drop-down list | [placeHolder]="'place holder of the drop-down list'"
selectedValue  | selected value of the drop-down list, supports 2-way binding | [(selectedValue)]="maxRowsLimitation"
suffixText  | suffix text of the drop-down list | [suffixText]="' suffix text'"
searchColumn  | the column which will be searched by the search input | [searchColumn]="'KPI'"
filterBox  | Enable or disable the filter input |  [filterBox]="true"
formatNumber  | Provides support for formatting numbers | [formatNumber]="true"
disabled  | Enable or disable the drop-down list | [disabled]="false"

### Input data samples:
```TypeScript
/* input date without group info. */
optionItems = [
  {id: 'Max',     value: 'Max',     text: 'Maximum'},
  {id: 'Average', value: 'Average', text: 'Average'},
  {id: 'Sum',     value: 'Sum',     text: 'Total'},
  {id: 'Last',    value: 'Last',    text: 'Last'}
];

/* input date with group info. */
timezones = [
  {group: 'Africa', items: [
      {id: '1', value: 'Africa/Abidjan', text: 'Africa - Abidjan'},
      {id: '2', value: 'Africa/Accra', text: 'Africa - Accra'},
      {id: '3', value: 'Africa/Addis_Ababa', text: 'Africa - Addis Ababa'},
      {id: '4', value: 'Africa/Algiers', text: 'Africa - Algiers'},
      {id: '5', value: 'Africa/Asmara', text: 'Africa - Asmara'},
    ]},
  {group: 'America', items: [
      {id: '6', value: 'America/Adak', text: 'America - Adak'},
      {id: '7', value: 'America/Anchorage', text: 'America - Anchorage'},
      {id: '8', value: 'America/Anguilla', text: 'America - Anguilla'},
      {id: '9', value: 'America/Antigua', text: 'America - Antigua'},
      {id: '10', value: 'America/Araguaina', text: 'America - Araguaina'},
    ]}
  ]
```

Todo
----
* ~~Support Angular 7~~
* ...

## License
 [MIT](/LICENSE)
