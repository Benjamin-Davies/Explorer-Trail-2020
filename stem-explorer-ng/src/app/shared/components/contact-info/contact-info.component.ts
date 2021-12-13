import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocationInfoType } from '../../../../locations/constants/location-info-type.enum';
import { Category } from '../../enums/categories.enum';
import { StemColours } from '../../enums/stem-colours.enum';

enum ContactIcon {
  'location_on' = 0,
  'launch' = 1,
  'phone' = 2,
  'mail_outline' = 3,
}

@Component({
  selector: 'app-contact-info',
  template: `
    <div [class]="contactClass + ' location--contact-info'" fxLayout="row" fxLayout="start center">
      <mat-icon>{{ContactIcon[type]}}</mat-icon>
      <ng-container *ngIf="link">
        <a [class]="contactClass" [href]="link" target="_blank">
            {{label}}
        </a>
      </ng-container>

      <ng-container *ngIf="!link">
        <span (click)="infoClick.emit()">
          {{label}}
        </span>
      </ng-container>
    </div>
  `,
})
export class ContactInfoComponent implements OnInit {
  @Input() category: Category;
  @Input() label: string;
  @Input() type: LocationInfoType;

  @Output() infoClick = new EventEmitter();

  link: string;
  ContactIcon = ContactIcon;
  StemColours = StemColours;
  contactClass: string;

  constructor() {}

  ngOnInit() {
    this._setLink();

    this.contactClass = `text-colour ${StemColours[this.category]} truncate`;
  }

  private _setLink() {
    let linkString: string;
    switch (this.type) {
      case LocationInfoType.Website:
        linkString = `http://${this.label}`;
        break;
      case LocationInfoType.Phone:
        linkString = `tel:${this.label}`;
        break;
      case LocationInfoType.Email:
        linkString = `mailto:${this.label}`;
        break;
      default:
        linkString = undefined;
    }
    this.link = linkString;
  }
}
