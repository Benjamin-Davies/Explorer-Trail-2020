import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { LargeCategoryIcons } from 'src/app/shared/enums/large-category-icons.enum';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';
import { Profile } from 'src/app/shared/models/profile';
import { Challenge, ChallengeLevel } from 'src/challenge/models/challenge';
import { ChallengeApiService } from 'src/challenge/services/challenge-api.service';
import { AnswerDialogComponent } from '../answer-dialog/answer-dialog.component';
import { HintDialogComponent } from '../hint-dialog/hint-dialog.component';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';

@Component({
  selector: 'app-challenge-view',
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.scss'],
})
export class ChallengeViewComponent implements OnInit {
  challengeId: number;
  challenge: Challenge;
  selectedLevel: ChallengeLevel;
  levelCompleted = false;

  Colour = StemColours;
  Categories = Categories;
  Levels = Levels;
  profile: Profile;

  CategoryIcons = LargeCategoryIcons;

  showBackButton = false;
  challenge$: Observable<Challenge>;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private api: ChallengeApiService,
    private gtmService: GoogleTagManagerService,
    private router: Router
  ) {
    this.challengeId = this.route.snapshot.params['id'];
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit(): void {
    // this._gtmTag('successful QR scan');

    this.challenge$ = this.api.getChallenge(this.challengeId);
    this.levelCompleted = !!localStorage.getItem(this.challengeId.toString());
    if (this.levelCompleted !== undefined) {
      this._gtmTag('Revisit completed challenge');
    }
  }

  /**
   * Takes user back to map/list view when Back button is pressed.
   */
  back(): void {
    this._gtmTag('back to home');
    this.router.navigate(['']);
  }

  /**
   * Method hit when the Get Hint button is pressed, triggers the Hint Dialog component
   */
  getHint(): void {
    this.dialog.open(HintDialogComponent, {
      data: {
        title: this.challenge.title,
        category: this.challenge.category,
        level: this.selectedLevel,
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
  enterAnswer(): void {
    this._gtmTag('answer attempt');

    const answerDialog = this.dialog.open(AnswerDialogComponent, {
      data: {
        level: this.selectedLevel,
        challenge: this.challenge,
      },
      panelClass: 'app-dialog',
    });

    answerDialog
      .afterClosed()
      .pipe(
        filter((answer) => answer !== undefined && answer.length),
        switchMap((answer) => this.api.checkAnswer(this.challengeId, answer))
      )
      .subscribe((result) => {
        if (result) {
          this._saveResult();
        }

        this._resultsDialog(result);
        this._gtmTag(result ? 'challenge complete' : 'answer wrong');
      });
  }

  private async _saveResult() {
    const progressCount: number = Number(localStorage.getItem('progressCount'));
    localStorage.setItem('progressCount', (progressCount + 1).toString());
    localStorage.setItem(this.challengeId.toString(), 'true');
  }

  /**
   * Method that opens the results dialog component and then checks for the user's action on close
   * and if user chooses next level, changes to the next level, and if user chooses to try again
   * reopens the answers dialog component.
   * @param success answer is true or false
   */
  private _resultsDialog(success: boolean): void {
    const dialog = this.dialog.open(ResultDialogComponent, {
      data: {
        difficulty: this.selectedLevel.difficulty,
        title: this.challenge.title,
        category: this.challenge.category,
        isCorrect: success,
      },
      panelClass: 'app-dialog',
    });
    dialog.afterClosed().subscribe((res) => {
      if (res === 'try-again') {
        this.enterAnswer();
      }
    });
  }

  /**
   * add tag to GTM on challenge complete
   */
  private _gtmTag(event: string): void {
    const tag = {
      event,
      challengeTitle: this.challenge.title,
      challengeId: this.challengeId,
    };
    this.gtmService.pushTag(tag);
  }
}
