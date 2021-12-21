import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { StemCategory } from 'src/app/shared/enums/stem-cateogry.enum';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';
import { AuthService } from '../../../app/core/services/auth.service';
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
  Levels: any = Levels;
  cssClass: string;
  Category = StemCategory;
  message = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ResultDialogData,
    public auth: AuthService,
    private router: Router
  ) {
    this.cssClass = `inverted ${this.data.isCorrect ? StemColours[this.data.category] : 'pink'}`;
  }

  ngOnInit() {
    this._setMessage();
  }

  /**
   * Navigate to home
   */
  openCamera(): void {
    this.router.navigate(['camera']);
  }

  /**
   * Navigate to log in
   */
  toLogin(): void {
    this.router.navigateByUrl('/login');
  }

  private _setMessage() {
    const possibleMsgs = this.data.isCorrect ? RESULT_SUCCESS : RESULT_FAIL;
    this.message = possibleMsgs[Math.floor(Math.random() * possibleMsgs.length)];
  }
}
