import { Injectable } from '@angular/core';
import { StemCategory } from '../enums/stem-cateogry.enum';

@Injectable()
export class StemColorsService {
  colors = [
    { category: StemCategory.Science, color: 'green' },
    { category: StemCategory.Technology, color: 'blue' },
    { category: StemCategory.Engineering, color: 'orange' },
    { category: StemCategory.Maths, color: 'purple' },
  ];

  getColor(category: StemCategory) {
    return this.colors.find((l) => l.category === category)?.color;
  }
}
