import { Component, Input } from '@angular/core';
import { Category } from '../../enums/categories.enum';
import { LargeCategoryIcons } from '../../enums/large-category-icons.enum';
import { StemColours } from '../../enums/stem-colours.enum';

@Component({
  selector: 'app-challenge-title',
  template: `
    <div fxLayout="row" fxLayoutAlign="start center">
      <mat-icon [svgIcon]="Icon[category]"></mat-icon>
      <h2 [class]="'text-colour ' + Colours[category]">
        <span>{{title}}</span>
      </h2>
    </div>
  `,
})
export class ChallengeTitleComponent {

  @Input() category: Category;
  @Input() title: string;

  Colours = StemColours;
  Icon = LargeCategoryIcons;

  constructor() { }
}
