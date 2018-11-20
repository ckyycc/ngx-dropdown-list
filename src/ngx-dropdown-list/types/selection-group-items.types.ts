import { SelectionItem } from './selection-item.types';

/**
 * dropdown option group item
 */
export interface SelectionGroupItems {
  group: string;
  items: SelectionItem[];
}
