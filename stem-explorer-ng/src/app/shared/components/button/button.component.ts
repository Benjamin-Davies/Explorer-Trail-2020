import { Component, OnInit, Input } from '@angular/core';
import { StemColoursService } from '../../services/stem-colors.service';
import { Categories } from '../../enums/categories.enum';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() color?: 'green'|'blue'|'orange'|'purple'|'pink';
  @Input() outlined: any;
  @Input() disabled: any;
  @Input() inverted: any;
  @Input() category?: Categories;

  constructor(
    private stemColors: StemColoursService,
  ) { }

  ngOnInit(): void {
  }

  get colorClass() {
    return this.stemColors.getColour(this.category) ?? this.color ?? 'pink';
  }

}
