import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { GoogleTagManagerService } from "angular-google-tag-manager";
import { AuthService } from "src/app/core/auth/auth.service";
import { Category } from "src/app/shared/enums/categories.enum";
import { Levels } from "src/app/shared/enums/levels.enum";
import { Colour } from "src/app/shared/enums/stem-colours.enum";
import { Profile } from "src/app/shared/models/profile";
import { Challenge, ChallengeLevel } from "src/challenge/models/challenge";
import { ChallengeApiService } from "src/challenge/services/challenge-api.service";
import { AnswerDialogComponent } from "../answer-dialog/answer-dialog.component";
import { HintDialogComponent } from "../hint-dialog/hint-dialog.component";
import { ResultDialogComponent } from "../result-dialog/result-dialog.component";
import { LargeCategoryIcons } from "src/app/shared/enums/large-category-icons.enum";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { LastHomepageState } from "src/app/store/last-homepage/last-homepage.state";
import { LevelCompleted } from "src/locations/store/locations.actions";
import { ChallengeCompact } from "../../models/challenge-compact";

@Component({
  selector: "app-challenge-view",
  templateUrl: "./challenge-view.component.html",
  styleUrls: ["./challenge-view.component.scss"],
})
export class ChallengeViewComponent implements OnInit {
  challengeId: number;
  challenge$: ChallengeCompact;

  _levelIsCompleted = false;
  challenge_;
  selectedLevel_;

  Colour = Colour;
  Category = Category;
  CategoryIcons = LargeCategoryIcons;
  Levels = Levels;
  profile: Profile;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private api: ChallengeApiService,
    private gtmService: GoogleTagManagerService,
    private authService: AuthService,
    private router: Router
  ) {
    this.challengeId = +this.route.snapshot.params["id"];
    this.profile = JSON.parse(localStorage.getItem("profile"));
  }

  get currentLevelIsCompleted(): boolean {
    return this._levelIsCompleted;
  }

  ngOnInit(): void {
    this.loadChallenge();
  }

  /**
   * Method hit when the Get Hint button is pressed, triggers the Hint Dialog component
   */
  getHint(): void {
    this.dialog.open(HintDialogComponent, {
      data: {
        title: this.challenge_.title,
        category: this.challenge_.category,
        level: this.selectedLevel_,
      },
      panelClass: "app-dialog",
    });
    this.gtmTag("get hint");
  }

  /**
   * Method called when Enter answer button is pressed. Opens the answer dialog component,
   * then checks if the answer is correct, is true marks the level as completed and then
   * triggers the results dialog to open.
   */
  enterAnswer(): void {
    const answerDialog = this.dialog.open(AnswerDialogComponent, {
      data: {
        level: this.selectedLevel_,
        challenge: this.challenge_,
      },
      panelClass: "app-dialog",
    });
    this.gtmTag("answer attempt");

    answerDialog.afterClosed().subscribe(async (response) => {
      if (response !== undefined && response.length) {
        const result = await this.api
          .checkAnswer(this.selectedLevel_, response)
          .toPromise();

        if (result) {
          this.markLevelCompleted();
        }

        this.saveResult(result);
        this.resultsDialog(result);
        this.gtmTag(result ? "answer correct" : "answer wrong");
      }
    });
  }

  /**
   * Copies the selected level to a new object with isCompleted as true, then replaces
   * the selected level and with that new object. This keeps the isCompleted state for that
   * level even when the user changes level and comes back again.
   */
  private markLevelCompleted(): void {
    const completed = {
      ...this.selectedLevel_,
      complete: true,
    };
    const idx = this.challenge_.challengeLevels.indexOf(this.selectedLevel_);

    this.challenge_.challengeLevels[idx] = completed;
    this.selectedLevel_ = completed;
    // check if all levels are completed and add tag to GTM
    if (idx === this.challenge_.challengeLevels.length - 1) {
      this.gtmTagWithoutLevel("challenge complete");
    }
  }

  private async saveResult(result: boolean) {
    if (this.profile) {
      const token = JSON.parse(localStorage.getItem("token"));
      await this.api
        .levelCompleted(token, this.profile.id, this.selectedLevel_.uid, result)
        .toPromise();
      if (result) {
        // @TODO
      }
    } else if (result) {
      this.authService.recordGuestCompleted(this.selectedLevel_.uid);
    }
  }

  /**
   * Loads the challenge and sets the selected level as the lowest.
   */
  private async loadChallenge() {
    const token = JSON.parse(localStorage.getItem("token"));
    const challenge = await this.api
      .getChallenge(this.challengeId, token, this.profile?.id)
      .toPromise();

    this.challenge_ = challenge;
    this.selectedLevel_ =
      challenge.challengeLevels.find((level) => !level.complete) ??
      challenge.challengeLevels[0];
    this.gtmTagWithoutLevel("successful QR scan");
  }

  /**
   * Method that opens the results dialog component and then checks for the user's action on close
   * and if user chooses next level, changes to the next level, and if user chooses to try again
   * reopens the answers dialog component.
   * @param success answer is true or false
   */
  private resultsDialog(success: boolean): void {
    const dialog = this.dialog.open(ResultDialogComponent, {
      data: {
        difficulty: this.selectedLevel_.difficulty,
        title: this.challenge_.title,
        category: this.challenge_.category,
        isCorrect: success,
        hasNext: this.hasNextLevel(),
      },
      panelClass: "app-dialog",
    });
    dialog.afterClosed().subscribe((res) => {
      if (res === "next-level") {
        this.changeLevel();
      }
      if (res === "try-again") {
        this.enterAnswer();
      }
    });
  }

  /**
   * changes the selected level to the next level
   */
  private changeLevel(): void {
    const idx = this.challenge_.challengeLevels.indexOf(this.selectedLevel_);
    this.selectedLevel_ = this.challenge_.challengeLevels[idx + 1];
  }

  /**
   * checks if there is a next level
   */
  private hasNextLevel(): boolean {
    const idx = this.challenge_.challengeLevels.indexOf(this.selectedLevel_);
    return idx + 1 >= this.challenge_.challengeLevels.length;
  }

  /**
   * add tag to GTM on challenge actions
   * @param event string for what the user is doing, i.e. 'answer attempt'
   */
  private gtmTag(event: string): void {
    const tag = {
      event,
      challengeTitle: this.challenge_.title,
      level: this.selectedLevel_.difficulty,
    };
    this.gtmService.pushTag(tag);
  }

  /**
   * add tag to GTM on challenge complete
   */
  private gtmTagWithoutLevel(event: string): void {
    const tag = {
      event,
      challengeTitle: this.challenge_.title,
    };
    this.gtmService.pushTag(tag);
  }
}
