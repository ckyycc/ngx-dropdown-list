// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting
} from '@angular/platform-browser/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting(),
  {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true
  }
);

// Import all test files directly
import './ngx-dropdown-list/utils/util.spec';
