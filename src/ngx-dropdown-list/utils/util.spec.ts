import {clearAllSelection, getFirstSelectedItem, hasGroup, isNumber} from './util';

describe('util of ngxSelector', () => {
  let items, itemsGroup;
  beforeEach(() => {
    items = [
      {id: '100000', value: 100000, text: 100000},
      {id: '200000', value: 200000, text: 200000},
      {id: '300000', value: 300000, text: 300000, selected: true},
      {id: '400000', value: 400000, text: 400000},
      {id: '500000', value: 500000, text: 500000, selected: true},
      {id: '600000', value: 600000, text: 600000},
    ];
    itemsGroup = [{group: 'test1', items: items}, {group: 'test2', items: items}];
  });
  it('#01 hasGroup should return true if there is a group', () => {
    expect(hasGroup(itemsGroup)).toBe(true);
  });
  it('#02 hasGroup should return false if there is no group or input is null', () => {
    expect(hasGroup(items)).toBe(false);
    expect(hasGroup(undefined)).toBe(false);
  });
  it('#03 clearAllSelection should clear all selected status of all items', () => {
    clearAllSelection(itemsGroup);
    expect(items.find(item => item.selected)).toBe(undefined);
    items = [
      {id: '100000', value: 100000, text: 100000},
      {id: '200000', value: 200000, text: 200000},
      {id: '300000', value: 300000, text: 300000, selected: true},
      {id: '400000', value: 400000, text: 400000},
      {id: '500000', value: 500000, text: 500000, selected: true},
      {id: '600000', value: 600000, text: 600000},
     ];
    clearAllSelection(items);
    expect(items.find(item => item.selected)).toBe(undefined);
  });
  it('#04 isNumber should return false for all none number string', () => {
    expect(isNumber('aa')).toBe(false);
    expect(isNumber('1 1')).toBe(false);
    expect(isNumber('')).toBe(false);
    expect(isNumber(undefined)).toBe(false);
  });
  it('#05 isNumber should return true for all number string', () => {
    expect(isNumber(' 1')).toBe(true);
    expect(isNumber(' 1 ')).toBe(true);
    expect(isNumber('123')).toBe(true);
    expect(isNumber('0.0000')).toBe(true);
    expect(isNumber('0.00009')).toBe(true);
    expect(isNumber(' 0.00009')).toBe(true);
    expect(isNumber(' 0.')).toBe(true);
  });
  it('#06 getFirstSelectedItem should return the first selected item', () => {
    expect(getFirstSelectedItem(itemsGroup)).toEqual({id: '300000', value: 300000, text: 300000, selected: true});
    expect(getFirstSelectedItem(items)).toEqual({id: '300000', value: 300000, text: 300000, selected: true});
  });
  it('#07 getFirstSelectedItem should return undefined if no selected item', () => {
    clearAllSelection(items);
    expect(getFirstSelectedItem(itemsGroup)).toEqual(undefined);
    expect(getFirstSelectedItem(items)).toEqual(undefined);
  });
});
