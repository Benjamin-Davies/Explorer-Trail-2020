import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Observable } from 'rxjs';
import { CategoryIcons } from 'src/app/shared/enums/large-category-icons.enum';
import { StemCategory } from 'src/app/shared/enums/stem-cateogry.enum';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';
import { ChallengeApiService } from 'src/challenge/services/challenge-api.service';
import { ChallengeCompact } from '../../models/challenge-compact';
import { HintDialogComponent } from '../hint-dialog/hint-dialog.component';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';

@Component({
  selector: 'app-challenge-view',
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.scss'],
})
export class ChallengeViewComponent implements OnInit {
  challengeId: number;
  levelCompleted = false;
  showBackButton = false;
  challenge$: Observable<ChallengeCompact>;

  Colour = StemColours;
  CategoryIcons = CategoryIcons;
  Categories = StemCategory;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private api: ChallengeApiService,
    private gtmService: GoogleTagManagerService,
    private router: Router
  ) {
    this.challengeId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this._gtmTag('successful QR scan');

    this.challenge$ = this.api.getChallenge(this.challengeId);
    this.levelCompleted = !!localStorage.getItem(this.challengeId.toString());

    console.warn('levelCompleted', this.levelCompleted);
    if (this.levelCompleted !== undefined) {
      this._gtmTag('Revisit completed challenge');
    }
  }

  /**
   * Takes user back to map/list view when Back button is pressed.
   */
  toMap(): void {
    this._gtmTag('back to home');
    this.router.navigate(['']);
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

    if (result) {
      this._saveResult();
    }

    this._resultsDialog(result, challenge);
    this._gtmTag(result ? 'challenge complete' : 'answer wrong');
  }

  private async _saveResult() {
    if (!this.levelCompleted) {
      const progressCount: number = Number(localStorage.getItem('progressCount'));
      localStorage.setItem('progressCount', (progressCount + 1).toString());
      localStorage.setItem(this.challengeId.toString(), 'true');
    }
    this.levelCompleted = true;
  }

  /**
   * Method that opens the results dialog component and then checks for the user's action on close
   * and if user chooses next level, changes to the next level, and if user chooses to try again
   * reopens the answers dialog component.
   * @param result answer is true or false
   */
  private _resultsDialog(result: boolean, challenge?: ChallengeCompact): void {
    const dialog = this.dialog.open(ResultDialogComponent, {
      data: {
        title: challenge.title,
        category: challenge.category,
        isCorrect: result,
      },
      panelClass: 'app-dialog',
    });
    dialog.afterClosed().subscribe((res) => {});
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
