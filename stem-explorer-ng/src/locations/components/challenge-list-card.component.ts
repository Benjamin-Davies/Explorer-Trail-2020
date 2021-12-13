import { Component, Input } from '@angular/core';
import { LocationChallenge } from '../models/location-challenge.model';
import { Category } from '../../app/shared/enums/categories.enum';
import { LargeCategoryIcons } from '../../app/shared/enums/large-category-icons.enum';
import { StemColours } from '../../app/shared/enums/stem-colours.enum';

@Component({
  selector: 'app-challenge-list-card',
  template: `
  <mat-card [class]="Colour[challenge.category]">
    <mat-icon class="list--category-icon" [svgIcon]="Icon[challenge.category]"></mat-icon>
    <app-challenge-title [category]="challenge.category"
      [title]="challenge.title"></app-challenge-title>

    <span class="list--distance">{{distance}}</span>
    <h4>{{Category[challenge.category]}}</h4>
    <p>{{challenge.description | truncate:50}}</p>
  </mat-card>
  `,
})
export class ChallengeListCardComponent {
  @Input() challenge: LocationChallenge;
  @Input() distance: any;

  Colour = StemColours;
  Icon = LargeCategoryIcons;
  Category = Category;

  constructor(
  ) { }
}
