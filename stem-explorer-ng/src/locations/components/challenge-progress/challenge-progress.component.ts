import { Component, Input } from '@angular/core';
import { StemColorsService } from 'src/app/shared/services/stem-colors.service';
import { StemCategory } from 'src/app/shared/enums/stem-cateogry.enum';
import { LocationLevel } from 'src/locations/models/location';

/*
 * Component for the list view dialog for more information
 */
@Component({
  selector: 'app-challenge-progress',
  templateUrl: './challenge-progress.component.html',
  styleUrls: ['./challenge-progress.component.scss'],
})
export class ChallengeProgressComponent {
  @Input() levels: LocationLevel[] = [];
  @Input() category: StemCategory;
  @Input() shownCount = 5;

  constructor(private stemColors: StemColorsService) {}
}
