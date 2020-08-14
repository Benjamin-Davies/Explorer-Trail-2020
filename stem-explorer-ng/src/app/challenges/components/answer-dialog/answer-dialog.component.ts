import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Levels } from '../../../shared/enums/levels.enum';
import { ChallengeLevel } from 'src/app/shared/models/challenge-level';
import { Challenge } from 'src/app/shared/models/challenge';
import { AnswerType } from 'src/app/shared/enums/answer-type.enum';
import { ApiService } from 'src/app/shared/services/api.service';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';

export interface AnswerDialogData {
  level: ChallengeLevel;
  challenge: Challenge;
}

/*
* Component for the list view dialog for more information
*/
@Component({
  selector: 'app-answer-dialog',
  templateUrl: './answer-dialog.component.html',
  styleUrls: ['./answer-dialog.component.scss']
})
export class AnswerDialogComponent {

  Levels: any = Levels;
  AnswerType: any = AnswerType;
  Colour = StemColours;

  validationError?: string;
  checkingAnswer = false;
  selectedAnswer = '';
  answerValue = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AnswerDialogData,
    private dialogRef: MatDialogRef<AnswerDialogComponent>,
    private api: ApiService,
  ) { }

  // Async allows us to do this in an imperative style w/o blocking
  async submitAnswer(answer: string) {
    // Don't do anything if the user has already made a choice
    if (this.checkingAnswer) { return; }
    // Flags to change the UI
    this.checkingAnswer = true;
    this.selectedAnswer = answer;

    // Use the api to check the answer
    // const isCorrect = this.api.validateAnswer(this.data.level, answer);
    const isCorrect = true;
    // Close the dialog and return if the given answer was correct
    this.dialogRef.close(isCorrect);
  }

}
