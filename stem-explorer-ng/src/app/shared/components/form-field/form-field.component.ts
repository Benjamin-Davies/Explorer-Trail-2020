import { Component, Input } from '@angular/core';
import { Category } from '../../enums/categories.enum';
import { StemColorsService } from '../../services/stem-colors.service';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent {
  @Input() category: Category;

  constructor(private stemColors: StemColorsService) {}

  get colour() {
    return this.stemColors.getColor(this.category);
  }
}
