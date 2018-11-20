import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  maxRowsLimitation1;
  maxRowsLimitation2;
  maxRowLimitations1 = [
    {id: '100000', value: 100000, text: 100000},
    {id: '200000', value: 200000, text: 200000},
    {id: '300000', value: 300000, text: 300000},
    {id: '400000', value: 400000, text: 400000},
    {id: '500000', value: 500000, text: 500000},
  ];
  maxRowLimitations2 = [
    {id: '100000', value: 100000, text: 100000},
    {id: '200000', value: 200000, text: 200000},
    {id: '300000', value: 300000, text: 300000},
    {id: '400000', value: 400000, text: 400000},
    {id: '500000', value: 500000, text: 500000},
    {id: '600000', value: 600000, text: 600000},
  ];
  measureItems = [
    {id: 'Max',     value: 'Max',     text: 'Maximum', selected: false},
    {id: 'Average', value: 'Average', text: 'Average', selected: false},
    {id: 'Sum',     value: 'Sum',     text: 'Total',   selected: false},
    {id: 'Last',    value: 'Last',    text: 'Last',    selected: false}
  ];

  timezoneNoRegion;
  timezonesNoRegion = [
    {id: 'America/Aruba', value: 'America/Aruba', text: 'America - Aruba (GMT-04:00)', selected: false},
    {id: 'America/Asuncion', value: 'America/Asuncion', text: 'America - Asuncion (GMT-03:00)', selected: false},
    {id: 'America/Atikokan', value: 'America/Atikokan', text: 'America - Atikokan (GMT-05:00)', selected: false},
    {id: 'America/Atka', value: 'America/Atka', text: 'America - Atka (GMT-10:00)', selected: false},
    {id: 'America/Bahia', value: 'America/Bahia', text: 'America - Bahia (GMT-03:00)', selected: false},
    {id: 'America/Bahia_Banderas', value: 'America/Bahia_Banderas', text: 'America - Bahia Banderas (GMT-06:00)', selected: false},
    {id: 'America/Barbados', value: 'America/Barbados', text: 'America - Barbados (GMT-04:00)', selected: false},
    {id: 'America/Belem', value: 'America/Belem', text: 'America - Belem (GMT-03:00)', selected: false},
    {id: 'America/Belize', value: 'America/Belize', text: 'America - Belize (GMT-06:00)', selected: false},
    {id: 'America/Blanc-Sablon', value: 'America/Blanc-Sablon', text: 'America - Blanc-Sablon (GMT-04:00)', selected: false},
    {id: 'America/Boa_Vista', value: 'America/Boa_Vista', text: 'America - Boa Vista (GMT-04:00)', selected: false},
    {id: 'America/Bogota', value: 'America/Bogota', text: 'America - Bogota (GMT-05:00)', selected: false},
    {id: 'America/Boise', value: 'America/Boise', text: 'America - Boise (GMT-07:00)', selected: false},
    {id: 'America/Buenos_Aires', value: 'America/Buenos_Aires', text: 'America - Buenos Aires (GMT-03:00)', selected: false},
    {id: 'America/Cambridge_Bay', value: 'America/Cambridge_Bay', text: 'America - Cambridge Bay (GMT-07:00)', selected: false},
    {id: 'America/Campo_Grande', value: 'America/Campo_Grande', text: 'America - Campo Grande (GMT-03:00)', selected: false},
    {id: 'America/Cancun', value: 'America/Cancun', text: 'America - Cancun (GMT-05:00)', selected: false},
    {id: 'America/Caracas', value: 'America/Caracas', text: 'America - Caracas (GMT-04:00)', selected: false},
    {id: 'America/Catamarca', value: 'America/Catamarca', text: 'America - Catamarca (GMT-03:00)', selected: false},
    {id: 'America/Cayenne', value: 'America/Cayenne', text: 'America - Cayenne (GMT-03:00)', selected: false},
    {id: 'America/Cayman', value: 'America/Cayman', text: 'America - Cayman (GMT-05:00)', selected: false},
    {id: 'America/Chicago', value: 'America/Chicago', text: 'America - Chicago (GMT-06:00)', selected: false},
    {id: 'America/Chihuahua', value: 'America/Chihuahua', text: 'America - Chihuahua (GMT-07:00)', selected: false},
    {id: 'America/Coral_Harbour', value: 'America/Coral_Harbour', text: 'America - Coral Harbour (GMT-05:00)', selected: false},
    {id: 'America/Cordoba', value: 'America/Cordoba', text: 'America - Cordoba (GMT-03:00)', selected: false},
    {id: 'America/Costa_Rica', value: 'America/Costa_Rica', text: 'America - Costa Rica (GMT-06:00)', selected: false},
    {id: 'America/Creston', value: 'America/Creston', text: 'America - Creston (GMT-07:00)', selected: false},
    {id: 'America/Cuiaba', value: 'America/Cuiaba', text: 'America - Cuiaba (GMT-03:00)', selected: false},
    {id: 'America/Curacao', value: 'America/Curacao', text: 'America - Curacao (GMT-04:00)', selected: false},
    {id: 'America/Danmarkshavn', value: 'America/Danmarkshavn', text: 'America - Danmarkshavn (GMT+00:00)', selected: false},
    {id: 'America/Dawson', value: 'America/Dawson', text: 'America - Dawson (GMT-08:00)', selected: false},
    {id: 'America/Dawson_Creek', value: 'America/Dawson_Creek', text: 'America - Dawson Creek (GMT-07:00)', selected: false},
    {id: 'America/Denver', value: 'America/Denver', text: 'America - Denver (GMT-07:00)', selected: false},
    {id: 'America/Detroit', value: 'America/Detroit', text: 'America - Detroit (GMT-05:00)', selected: false},
    {id: 'America/Dominica', value: 'America/Dominica', text: 'America - Dominica (GMT-04:00)', selected: false},
    {id: 'America/Edmonton', value: 'America/Edmonton', text: 'America - Edmonton (GMT-07:00)', selected: false},
    {id: 'America/Eirunepe', value: 'America/Eirunepe', text: 'America - Eirunepe (GMT-05:00)', selected: false},
    {id: 'America/El_Salvador', value: 'America/El_Salvador', text: 'America - El Salvador (GMT-06:00)', selected: false},
    {id: 'America/Ensenada', value: 'America/Ensenada', text: 'America - Ensenada (GMT-08:00)', selected: false},
    {id: 'America/Fort_Nelson', value: 'America/Fort_Nelson', text: 'America - Fort Nelson (GMT-07:00)', selected: false},
    {id: 'America/Fort_Wayne', value: 'America/Fort_Wayne', text: 'America - Fort Wayne (GMT-05:00)', selected: false},
    {id: 'America/Fortaleza', value: 'America/Fortaleza', text: 'America - Fortaleza (GMT-03:00)', selected: false},
    {id: 'America/Glace_Bay', value: 'America/Glace_Bay', text: 'America - Glace Bay (GMT-04:00)', selected: false},
    {id: 'America/Godthab', value: 'America/Godthab', text: 'America - Godthab (GMT-03:00)', selected: false},
    {id: 'America/Goose_Bay', value: 'America/Goose_Bay', text: 'America - Goose Bay (GMT-04:00)', selected: false},
    {id: 'America/Grand_Turk', value: 'America/Grand_Turk', text: 'America - Grand Turk (GMT-05:00)', selected: false},
    {id: 'America/Grenada', value: 'America/Grenada', text: 'America - Grenada (GMT-04:00)', selected: false},
    {id: 'America/Guadeloupe', value: 'America/Guadeloupe', text: 'America - Guadeloupe (GMT-04:00)', selected: false},
    {id: 'America/Guatemala', value: 'America/Guatemala', text: 'America - Guatemala (GMT-06:00)', selected: false},
    {id: 'America/Guayaquil', value: 'America/Guayaquil', text: 'America - Guayaquil (GMT-05:00)', selected: false},
    {id: 'America/Guyana', value: 'America/Guyana', text: 'America - Guyana (GMT-04:00)', selected: false},
    {id: 'America/Halifax', value: 'America/Halifax', text: 'America - Halifax (GMT-04:00)', selected: false},
    {id: 'America/Havana', value: 'America/Havana', text: 'America - Havana (GMT-05:00)', selected: false},
    {id: 'America/Hermosillo', value: 'America/Hermosillo', text: 'America - Hermosillo (GMT-07:00)', selected: false},
  ];

  timezones = [
    {group: 'Africa', items: [
        {id: 'Africa/Abidjan', value: 'Africa/Abidjan', text: 'Africa - Abidjan (GMT+00:00)', selected: false},
        {id: 'Africa/Accra', value: 'Africa/Accra', text: 'Africa - Accra (GMT+00:00)', selected: false},
        {id: 'Africa/Addis_Ababa', value: 'Africa/Addis_Ababa', text: 'Africa - Addis Ababa (GMT+03:00)', selected: false},
        {id: 'Africa/Algiers', value: 'Africa/Algiers', text: 'Africa - Algiers (GMT+01:00)', selected: false},
        {id: 'Africa/Asmara', value: 'Africa/Asmara', text: 'Africa - Asmara (GMT+03:00)', selected: false},
      ]},
    {group: 'America', items: [
        {id: 'America/Adak', value: 'America/Adak', text: 'America - Adak (GMT-10:00)', selected: false},
        {id: 'America/Anchorage', value: 'America/Anchorage', text: 'America - Anchorage (GMT-09:00)', selected: false},
        {id: 'America/Anguilla', value: 'America/Anguilla', text: 'America - Anguilla (GMT-04:00)', selected: false},
        {id: 'America/Antigua', value: 'America/Antigua', text: 'America - Antigua (GMT-04:00)', selected: false},
        {id: 'America/Araguaina', value: 'America/Araguaina', text: 'America - Araguaina (GMT-03:00)', selected: false},
      ]},
    {group: 'Asia', items: [
        {id: 'Asia/Aden', value: 'Asia/Aden', text: 'Asia - Aden (GMT+03:00)', selected: false},
        {id: 'Asia/Almaty', value: 'Asia/Almaty', text: 'Asia - Almaty (GMT+06:00)', selected: false},
        {id: 'Asia/Amman', value: 'Asia/Amman', text: 'Asia - Amman (GMT+02:00)', selected: false},
        {id: 'Asia/Anadyr', value: 'Asia/Anadyr', text: 'Asia - Anadyr (GMT+12:00)', selected: false},
        {id: 'Asia/Aqtau', value: 'Asia/Aqtau', text: 'Asia - Aqtau (GMT+05:00)', selected: false},
      ]},
    {group: 'US', items: [
        {id: 'US/Alaska', value: 'US/Alaska', text: 'US - Alaska (GMT-09:00)', selected: false},
        {id: 'US/Aleutian', value: 'US/Aleutian', text: 'US - Aleutian (GMT-10:00)', selected: false},
        {id: 'US/Arizona', value: 'US/Arizona', text: 'US - Arizona (GMT-07:00)', selected: false},
        {id: 'US/Central', value: 'US/Central', text: 'US - Central (GMT-06:00)', selected: false},
        {id: 'US/East-Indiana', value: 'US/East-Indiana', text: 'US - East-Indiana (GMT-05:00)', selected: false},
      ]}
  ];
  timezone;

  timezones1 = [
    {group: 'Africa', items: [
        {id: 'Africa/Abidjan1', value: 'Africa/Abidjan', text: 'Africa - Abidjan (GMT+00:00)', selected: false},
        {id: 'Africa/Accra1', value: 'Africa/Accra', text: 'Africa - Accra (GMT+00:00)', selected: false},
        {id: 'Africa/Addis_Ababa1', value: 'Africa/Addis_Ababa', text: 'Africa - Addis Ababa (GMT+03:00)', selected: false},
        {id: 'Africa/Algiers1', value: 'Africa/Algiers', text: 'Africa - Algiers (GMT+01:00)', selected: false},
        {id: 'Africa/Asmara1', value: 'Africa/Asmara', text: 'Africa - Asmara (GMT+03:00)', selected: false},
      ]},
    {group: 'America', items: [
        {id: 'America/Adak1', value: 'America/Adak', text: 'America - Adak (GMT-10:00)', selected: false},
        {id: 'America/Anchorage1', value: 'America/Anchorage', text: 'America - Anchorage (GMT-09:00)', selected: false},
        {id: 'America/Anguilla1', value: 'America/Anguilla', text: 'America - Anguilla (GMT-04:00)', selected: false},
        {id: 'America/Antigua1', value: 'America/Antigua', text: 'America - Antigua (GMT-04:00)', selected: false},
        {id: 'America/Araguaina1', value: 'America/Araguaina', text: 'America - Araguaina (GMT-03:00)', selected: false},
      ]},
    {group: 'Asia', items: [
        {id: 'Asia/Aden1', value: 'Asia/Aden', text: 'Asia - Aden (GMT+03:00)', selected: false},
        {id: 'Asia/Almaty1', value: 'Asia/Almaty', text: 'Asia - Almaty (GMT+06:00)', selected: false},
        {id: 'Asia/Amman1', value: 'Asia/Amman', text: 'Asia - Amman (GMT+02:00)', selected: false},
        {id: 'Asia/Anadyr1', value: 'Asia/Anadyr', text: 'Asia - Anadyr (GMT+12:00)', selected: false},
        {id: 'Asia/Aqtau1', value: 'Asia/Aqtau', text: 'Asia - Aqtau (GMT+05:00)', selected: false},
      ]},
    {group: 'US', items: [
        {id: 'US/Alaska1', value: 'US/Alaska', text: 'US - Alaska (GMT-09:00)', selected: true},
        {id: 'US/Aleutian1', value: 'US/Aleutian', text: 'US - Aleutian (GMT-10:00)', selected: false},
        {id: 'US/Arizona1', value: 'US/Arizona', text: 'US - Arizona (GMT-07:00)', selected: false},
        {id: 'US/Central1', value: 'US/Central', text: 'US - Central (GMT-06:00)', selected: false},
        {id: 'US/East-Indiana1', value: 'US/East-Indiana', text: 'US - East-Indiana (GMT-05:00)', selected: false},
    ]}
  ];
  timezone1;
  get selectedMeasures() {
    const items = this.measureItems.filter(item => item.selected);
    return items.length ? JSON.stringify(items.map(item => ({id: item.id, value: item.value, text: item.text}))) : '';
  }
}
