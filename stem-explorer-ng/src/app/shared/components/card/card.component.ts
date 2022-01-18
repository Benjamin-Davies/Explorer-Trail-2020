import { Component, Input } from '@angular/core';
import { Category } from '../../enums/categories.enum';
import { Colour } from '../../enums/stem-colours.enum';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() category: Category;

  Colour = Colour;

  constructor() {}
}
