import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Observable } from 'rxjs';
import { Colour } from 'src/app/shared/enums/stem-colours.enum';
import { ChallengeApiService } from 'src/challenge/services/challenge-api.service';
import { ProgressService } from '../../../app/core/services/progress.service';
import { ChallengeCompact } from '../../models/challenge-compact';
import { HintDialogComponent } from '../hint-dialog/hint-dialog.component';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';

@Component({
  selector: 'app-challenge-view',
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.scss'],
})
export class ChallengeViewComponent implements OnInit {
  challenge$: Observable<ChallengeCompact>;

  challengeId: number;
  levelCompleted = false;
  allChallengesCompleted = false;
  showBackButton = false;

  Colour = Colour;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private api: ChallengeApiService,
    private gtmService: GoogleTagManagerService,
    private progressService: ProgressService
  ) {
    this.challengeId = this.route.snapshot.params['id'];
    console.warn(this.challengeId);
  }

  ngOnInit(): void {
    this._gtmTag('successful QR scan');

    this.challenge$ = this.api.getChallenge(this.challengeId);
    this.levelCompleted = !!localStorage.getItem(this.challengeId.toString());

    if (!!this.levelCompleted) {
      this._gtmTag('Revisit completed challenge');
    }

    this.progressService.progress$.subscribe((progress) => {
      if (progress === 9) {
        this.allChallengesCompleted = true;
      }
    });
  }

  /**
   * Method hit when the Get Hint button is pressed, triggers the Hint Dialog component
   */
  getHint(challenge: ChallengeCompact): void {
    this.dialog.open(HintDialogComponent, {
      data: {
        title: challenge.title,
        category: challenge.category,
        hint: challenge.hint,
      },
      panelClass: 'app-dialog',
    });
    this._gtmTag('hint requested');
  }

  /**
   * Method called when Enter answer button is pressed. Opens the answer dialog component,
   * then checks if the answer is correct, is true marks the level as completed and then
   * triggers the results dialog to open.
   */
  enterAnswer(choice: { idx: number; label: string }, challenge: ChallengeCompact): void {
    const result = choice.idx === challenge.answer;
    this._gtmTag(result ? 'challenge complete' : 'answer wrong');

    if (result) {
      if (!this.levelCompleted) {
        this._updateProgress();
        localStorage.setItem(this.challengeId.toString(), 'true');
      }
      this.levelCompleted = true;
    }
    this._resultsDialog(result, challenge);
  }

  private _updateProgress(): void {
    const progressCount: number = Number(localStorage.getItem('progressCount')) + 1;
    localStorage.setItem('progressCount', progressCount.toString());
    this.allChallengesCompleted = progressCount === 9;
    this.progressService.add();
  }

  /**
   * Method that opens the results dialog component and then checks for the user's action on close
   * and if user chooses next level, changes to the next level, and if user chooses to try again
   * reopens the answers dialog component.
   * @param result answer is true or false
   */
  private _resultsDialog(result: boolean, challenge?: ChallengeCompact) {
    return this.dialog.open(ResultDialogComponent, {
      data: {
        title: challenge.title,
        category: challenge.category,
        isCorrect: result,
        answerBlurb: challenge.answerBlurb,
        allComplete: this.allChallengesCompleted,
      },
      panelClass: 'app-dialog',
    });
  }

  /**
   * add tag to GTM on challenge complete
   */
  private _gtmTag(event: string): void {
    const tag = {
      event,
      challengeId: this.challengeId,
    };
    this.gtmService.pushTag(tag);
  }
}
