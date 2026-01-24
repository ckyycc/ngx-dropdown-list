import {Component, ElementRef, EventEmitter, Output, ViewChild, signal, computed, input, AfterViewInit} from '@angular/core';
import {stopPropagationAndDefault, isNumber} from '../utils/util';
import {CommonModule, DecimalPipe} from '@angular/common';

@Component({
  selector: 'anchor',
  template: `
    <span #anchor tabindex="2" [ngClass]="anchorClass()" (window:resize)="onResize()"
          (mousedown)="onAnchorClick($event)" (blur)="onAnchorBlur($event)"> {{anchorDisplayText()}}
      <span #selectionClearance class="selection-clearance" (mousedown)="onClearanceClick($event)" *ngIf="showClearanceFlag()">&times;</span>
    </span>
  `,
  styleUrls: ['./anchor.component.scss'],
  standalone: true,
  imports: [ CommonModule ],
  providers: [DecimalPipe]
})

export class AnchorComponent implements AfterViewInit {
  /**
   * Child element reference of anchor
   */
  @ViewChild('anchor', { read: ElementRef }) anchorRef: ElementRef;

  /**
   * bind to [placeHolder] for displaying the place holder string of the anchor.
   */
  placeHolder = input<string>('');

  /**
   * bind to [checkbox] for checking whether the clearance flag should be shown or not.
   */
  checkbox = input<boolean>(false);

  /**
   * bind to [suffixText] for displaying the suffix of the selected text of anchor
   */
  suffixText = input<string>('');

  /**
   * bind to [allowClear] for enabling the clearance (clearance is not avaiable when checkbox is enabled)
   */
  allowClear = input<boolean>(true);

  /**
   * bind to [formatNumber] for show formatted number text
   */
  formatNumber = input<boolean>(false);

  /**
   * bind to [selectedText] for displaying the selected text on anchor
   */
  selectedText = input<any>(null);

  /**
   * bind to [openStatus], it's the visibility status of dropdown, for showing the arrow on anchor
   */
  openStatus = input<boolean>(false);

  /**
   * bind to [disabled] for disabling the anchor
   */
  disabled = input<boolean>(false);

  /**
   * will be triggered when clicking the anchor
   */
  @Output() anchorClick = new EventEmitter<any>();
  /**
   * will be triggered when clicking the clearance
   */
  @Output() clearanceClick = new EventEmitter<any>();

  /**
   * length of anchor element, used for calculate the string length of the anchor displayed text.
   */
  anchorLength = signal<number>(0);

  constructor(private _decimalPipe: DecimalPipe) {}

  ngAfterViewInit() {
    this.onResize();
  }

  /**
   * flag for showing the clearance flag - using computed for better performance
   */
  showClearanceFlag = computed(() => {
    return !this.checkbox() && this.selectedText() && this.allowClear();
  });

  /**
   * the text displays on anchor - using computed for better performance
   */
  anchorDisplayText = computed(() => {
    let anchorDisplayText = this.selectedText() ? (this.formatNumber() ? (isNumber(this.selectedText()) ?
      this._decimalPipe.transform(this.selectedText(), '1.0-2') : this.selectedText()) :
      this.selectedText()) + (this.suffixText() ? this.suffixText() : '') : this.placeHolder();

    let charLength = 1;
    if (this.showClearanceFlag() && this.anchorLength() > 0) {
      charLength = Math.floor((this.anchorLength() - 50) / 7);
    } else {
      charLength = Math.floor((this.anchorLength() - 50) / 7);
    }

    if (anchorDisplayText.length > charLength) {
      anchorDisplayText = anchorDisplayText.slice(0, charLength - 2) + '...';
    }
    return anchorDisplayText;
  });

  /**
   * anchor CSS class - using computed for better performance
   */
  anchorClass = computed(() => {
    let anchorClassStatusPart;
    let anchorClassFontColor;
    if (this.disabled()) {
      anchorClassStatusPart = 'selection-anchor-disabled';
      anchorClassFontColor = 'place-holder';
    } else {
      if (this.openStatus()) {
        anchorClassStatusPart = 'selection-anchor-open';
      } else {
        anchorClassStatusPart = 'selection-anchor-close';
      }
      if (this.selectedText() != null) {
        anchorClassFontColor = 'selected-item';
      } else {
        anchorClassFontColor = 'place-holder';
      }
    }
    return `${anchorClassStatusPart} ${anchorClassFontColor}`;
  });

  /**
   * triggered when clicking the anchor
   */
  onAnchorClick(event: Event): void {
    this.anchorClick.emit(event);
  }

  /**
   * triggered with (blur) of anchor
   */
  onAnchorBlur(event: Event): void {
    stopPropagationAndDefault(event);
  }

  /**
   * triggered when clicking the clearance
   */
  onClearanceClick(event: Event): void {
    this.clearanceClick.emit(event);
  }

  /**
   * triggered when resizing, get the clientWidth of anchor
   */
  onResize() {
    const width = this.anchorRef ? this.anchorRef.nativeElement ? this.anchorRef.nativeElement.clientWidth : 0 : 0;
    this.anchorLength.set(width);
  }
}
