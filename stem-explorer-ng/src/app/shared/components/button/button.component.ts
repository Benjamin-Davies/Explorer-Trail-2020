import { Component, Input } from '@angular/core';
import { StemCategory } from '../../enums/stem-cateogry.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() colour?: 'green' | 'blue' | 'orange' | 'purple' | 'pink';
  @Input() outlined: any;
  @Input() disabled: boolean;
  @Input() inverted: any;
  @Input() category?: StemCategory;
  @Input() value: string;

  constructor() {}
}
