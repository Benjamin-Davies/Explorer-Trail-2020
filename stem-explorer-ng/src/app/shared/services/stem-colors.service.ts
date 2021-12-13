import { Injectable } from '@angular/core';
import { Category } from '../enums/categories.enum';

@Injectable()
export class StemColorsService {
  colors = [
    { category: Category.Science, color: 'green' },
    { category: Category.Technology, color: 'blue' },
    { category: Category.Engineering, color: 'orange' },
    { category: Category.Maths, color: 'purple' },
  ];

  getColor(category: Category) {
    return this.colors.find(l => l.category === category)?.color;
  }
}
