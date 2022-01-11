import { Injectable } from '@angular/core';
import { Category } from '../enums/categories.enum';

@Injectable()
export class StemColorsService {
  colors = [
    { category: Category.Science, colour: 'green' },
    { category: Category.Technology, colour: 'blue' },
    { category: Category.Engineering, colour: 'orange' },
    { category: Category.Maths, colour: 'purple' },
  ];

  getColor(category: Category) {
    return this.colors.find((l) => l.category === category)?.colour;
  }
}
