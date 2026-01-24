import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { enableProdMode } from '@angular/core';
import { appConfig } from './app.config';
import '@angular/compiler';

enableProdMode();

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.log(err));
