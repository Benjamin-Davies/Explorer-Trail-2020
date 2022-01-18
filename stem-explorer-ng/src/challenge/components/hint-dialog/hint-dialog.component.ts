import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Colour } from '../../../app/shared/enums/stem-colours.enum';

@Component({
  selector: 'app-hint-dialog',
  templateUrl: './hint-dialog.component.html',
  styleUrls: ['./hint-dialog.component.scss'],
})
export class HintDialogComponent {
  Colour = Colour;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
