import { Component, Input } from '@angular/core';
import { Colour } from '../../enums/stem-colours.enum';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
})
export class ContactInfoComponent {
  @Input() category: number;
  @Input() link: string;
  @Input() icon: string;
  @Input() label: string;
  Colour = Colour;

  constructor() {}
}
