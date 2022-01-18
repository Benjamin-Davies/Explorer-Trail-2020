import { Component, Input } from '@angular/core';
import { Category } from '../../enums/categories.enum';
import { Colour } from '../../enums/stem-colours.enum';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  @Input() inverted: any;
  @Input() colour?: 'green' | 'blue' | 'orange' | 'purple' | 'pink' | 'red';
  @Input() category?: Category;

  Colour = Colour;

  constructor() {}
}
