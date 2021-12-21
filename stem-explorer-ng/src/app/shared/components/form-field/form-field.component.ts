import { Component, Input } from '@angular/core';
import { StemCategory } from '../../enums/stem-cateogry.enum';
import { StemColorsService } from '../../services/stem-colors.service';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent {
  @Input() category: StemCategory;

  constructor(private stemColors: StemColorsService) {}

  get color() {
    return this.stemColors.getColor(this.category);
  }
}
