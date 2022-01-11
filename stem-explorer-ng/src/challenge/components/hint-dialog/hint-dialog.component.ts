import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { Colour } from 'src/app/shared/enums/stem-colours.enum';

@Component({
  selector: 'app-hint-dialog',
  template: `
    <app-dialog [category]="data.category">
      <h3 class="title">{{ data.title }}</h3>
      <p [innerHTML]="data.hint"></p>
    </app-dialog>
  `,
  styles: ['.title { padding-right: 30px; }'],
})
export class HintDialogComponent {
  Level: any = Levels;
  Colour = Colour;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
