import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-location-nav-buttons',
  template: `
    <button mat-fab class="left" (click)="leftButtonClicked.emit('left')">
      <mat-icon svgIcon="{{ leftIcon }}"></mat-icon>
    </button>
    <button mat-fab class="right" (click)="leftButtonClicked.emit('right')">
      <mat-icon svgIcon="QR-Code-2"></mat-icon>
    </button>
  `,
})
export class LocationNavButtonsComponent {
  @Input() leftIcon: string;

  @Output() leftButtonClicked = new EventEmitter<string>();

  constructor() {}
}
