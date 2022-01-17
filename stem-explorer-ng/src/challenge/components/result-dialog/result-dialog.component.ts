import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Colour } from '../../../app/shared/enums/stem-colours.enum';
import { RESULT_FAIL, RESULT_SUCCESS } from '../../constants/results-message';

export interface ResultDialogData {
  difficulty: number;
  title: string;
  category: number;
  isCorrect: boolean;
  hasNext: boolean;
}

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss'],
})
export class ResultDialogComponent implements OnInit {
  message = '';
  Colour = Colour;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ResultDialogData, private router: Router) {}

  ngOnInit() {
    this._setMessage();
  }

  /**
   * Navigate to home
   */
  openCamera(): void {
    this.router.navigate(['camera']);
  }

  private _setMessage() {
    const possibleMsgs = this.data.isCorrect ? RESULT_SUCCESS : RESULT_FAIL;
    this.message = possibleMsgs[Math.floor(Math.random() * possibleMsgs.length)];
  }
}
