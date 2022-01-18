import { Component, Input } from '@angular/core';
import { StemCategory } from '../../enums/stem-cateogry.enum';
import { Colour } from '../../enums/stem-colours.enum';

@Component({
  selector: 'app-challenge-title',
  template: `<h3 [class]="Colour[category]"><ng-content></ng-content></h3>`,
  styleUrls: ['./challenge-title.component.scss'],
})
export class ChallengeTitleComponent {
  @Input() category: StemCategory;

  Colour = Colour;

  constructor() {}
}
