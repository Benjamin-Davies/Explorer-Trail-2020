import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../enums/categories.enum';
import { LargeCategoryIcons } from '../../enums/large-category-icons.enum';
import { StemColours } from '../../enums/stem-colours.enum';

@Component({
  selector: 'app-button',
  template: `
    <button mat-flat-button fxLayout="row" fxLayoutAlign="center center"
      [disabled]="disabled"
      [class]="Colours[category] + (outlined !== undefined ? ' outlined' : '')
                        + (inverted !== undefined ? ' inverted' : '')"
      (click)="buttonClick.emit($event)"
    >
      {{ value }}
      <ng-container *ngIf="hasIcon">
        <mat-icon [svgIcon]="Icon[category]"></mat-icon>
      </ng-container>
    </button>
  `,
})
export class ButtonComponent {
  @Input() value: string;
  @Input() hasIcon = false;
  @Input() disabled = false;
  @Input() category: Category;
  @Input() outlined: string;
  @Input() inverted: string;

  @Output() buttonClick = new EventEmitter();

  Icon = LargeCategoryIcons;
  Colours = StemColours;

  constructor() {}
}
