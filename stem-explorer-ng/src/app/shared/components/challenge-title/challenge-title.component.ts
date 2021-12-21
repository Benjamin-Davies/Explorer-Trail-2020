import { Component, Input, OnInit } from '@angular/core';
import { StemCategory } from '../../enums/stem-cateogry.enum';
import { StemColours } from '../../enums/stem-colours.enum';

@Component({
  selector: 'app-challenge-title',
  template: `<h3 [class]="Colour[category]"><ng-content></ng-content></h3>`,
  styleUrls: ['./challenge-title.component.scss'],
})
export class ChallengeTitleComponent implements OnInit {
  @Input() category: StemCategory;

  Colour = StemColours;

  constructor() {}

  ngOnInit(): void {
    console.warn(this.category, StemColours[this.category]);
  }
}
