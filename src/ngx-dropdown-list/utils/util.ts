/**
 * check whether the provided items contains group
 */
export function hasGroup(items): boolean {
  return items ? (items.find(item => item.group) != null) : false;
}

/**
 * clear all selections from the provide items.
 * @param items the dropdown items, can be group or item
 */
export function clearAllSelection(items: any): void {
  if (hasGroup(items)) {
    for (const groupItem of items) {
      if (groupItem.items) {
        groupItem.items.filter(item => item.selected).forEach(item => item.selected = false);
      }
    }
  } else {
    // clear the selection of previous selected item
    items.filter(item => item.selected).forEach(item => item.selected = false);
  }
}

/**
 * stop all propagation and default actions
 */
export function stopPropagationAndDefault(event: Event): void {
  event.stopImmediatePropagation();
  event.stopPropagation();
  event.preventDefault();
}

/**
 * check whether the provided value is number of not
 */
export function isNumber(value: any): boolean {
  return !(value == null || isNaN(value) || value.length === 0);
}

/**
 * get the selected item from the items list (including item and group)
 */
export function getFirstSelectedItem(items: any): any {
  if (!items) {
    return undefined;
  }
  let selectedItem;
  if (hasGroup(items)) {
    for (const item of items) {
      selectedItem = item.items ? item.items.find(subItem => subItem.selected) : undefined;
      if (selectedItem) {
        break;
      }
    }
  } else {
    selectedItem = items ? items.find(item => item.selected) : undefined;
  }
  return selectedItem;
}
