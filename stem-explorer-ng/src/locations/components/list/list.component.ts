import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { Location, LocationChallenge } from 'src/locations/models/location';
import { VisitedHomepage } from 'src/app/store/last-homepage/last-homepage.actions';
import { LoadLocationsData } from 'src/locations/store/locations.actions';
import { LocationsState } from 'src/locations/store/locations.state';
import { ChallengeDialogComponent } from '../challenge-dialog/challenge-dialog.component';
import { LevelProgress } from '../challenge-progress/challenge-progress.component';
import { LoadChallengeLevelsData } from 'src/app/store/challenge-levels/challenge-levels.actions';
import { ChallengeLevelsState } from 'src/app/store/challenge-levels/challenge-levels.state';
import { ProgressState } from 'src/app/store/progress/progress.state';
import { WatchProfiles } from 'src/app/store/profiles/profiles.actions';
import { WatchProgress } from 'src/app/store/progress/progress.actions';

/*
* Component to show the challenges in a list view
*/
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Select(LocationsState.locationFilter) public filter$: Observable<number[]>;
  locations: Location[] = [];
  Categories: any = Categories;
  filter: number[] = [];

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private gtmService: GoogleTagManagerService
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadLocationsData());
    this.store.dispatch(new LoadChallengeLevelsData());
    this.store.dispatch(new VisitedHomepage());
    this.store.dispatch(new WatchProfiles());
    this.store.dispatch(new WatchProgress());

    this.getLocations();
    this.filter$.pipe(map(res => this.filter = res)).subscribe();
  }

  /**
   * Method that opens the challenge dialog
   * @param location location data object
   * @param challenge data object of the challenge
   */
  openInfo(location: Location, challenge: LocationChallenge): void {
    this.dialog.open(ChallengeDialogComponent, {
      data: { location, challenge },
      panelClass: 'app-dialog',
    });
    // push to dataLayer
    this.addGtmTag(challenge.challengeTitle);
  }

  /**
   * Gets all locations
   */
  private getLocations(): void {
    this.store.select(LocationsState.locations).pipe(map(res => {
      this.locations = res;
    })).subscribe();
  }

  /**
   * add tag to GTM on the card click
   * @param title challenge title
   */
  private addGtmTag(title: string): void {
    const gtmTag = {
      event: 'card click',
      challengeTitle: title,
    };
    this.gtmService.pushTag(gtmTag);
  }

  progressFor(challenge: LocationChallenge): Observable<LevelProgress[]> {
    return combineLatest([
      this.store.select(ChallengeLevelsState.challengeLevels),
      this.store.select(ProgressState.completedLevels),
    ]).pipe(
      map(([levels, completedLevels]) =>
        levels(challenge.challengeId).map((level) => ({
          difficulty: level.difficulty,
          complete: completedLevels.includes(level.uid),
        }))
      )
    );
  }
}
