import { Component, OnInit, Input } from '@angular/core';
import { StemColorsService } from '../../services/stem-colors.service';
import { StemCategory } from '../../enums/stem-cateogry.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() color?: 'green' | 'blue' | 'orange' | 'purple' | 'pink';
  @Input() outlined: any;
  @Input() disabled: boolean;
  @Input() inverted: any;
  @Input() category?: StemCategory;
  @Input() value: string;

  constructor(private stemColors: StemColorsService) {}

  get colorClass() {
    return this.stemColors.getColor(this.category) ?? this.color ?? 'pink';
  }
}
