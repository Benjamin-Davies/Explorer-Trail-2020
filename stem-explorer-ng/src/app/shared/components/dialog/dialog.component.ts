import { Component, OnInit, Input } from '@angular/core';
import { StemCategory } from '../../enums/stem-cateogry.enum';
import { StemColorsService } from '../../services/stem-colors.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  @Input() inverted: any;
  @Input() color?: 'green' | 'blue' | 'orange' | 'purple' | 'pink' | 'red';
  @Input() category?: StemCategory;

  constructor(private stemColors: StemColorsService) {}

  get colorClass() {
    return this.stemColors.getColor(this.category) ?? this.color ?? 'pink';
  }
}
