import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LargeCategoryIcons } from '../../app/shared/enums/large-category-icons.enum';
import { StemColours } from '../../app/shared/enums/stem-colours.enum';
import { LocationChallenge } from '../models/location-challenge.model';
import { Location } from '../models/location.model';
import { ChallengeDialogComponent } from './challenge-dialog.component';

@Component({
    selector: 'app-map-marker-window',
    template: `
        <div class="info-title" fxLayout="row" fxLayoutAlign="space-between">
            <div>
                <h3>{{ location.name }}</h3>
            </div>
        </div>

        <ng-container *ngFor="let challenge of location.locationChallenges; trackBy: trackChallenges">
            <app-button [category]="challenge.category"
                [hasIcon]="true"
                value="View challenge"
                (buttonClick)="openChallenge(location, challenge)">
            </app-button>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapMarkerWindowComponent {
    @Input() location: Location;

    Icon = LargeCategoryIcons;
    Colour = StemColours;

    constructor(
        private dialog: MatDialog
    ) {}

    trackChallenge(_: number, item: LocationChallenge) {
        return item?.id;
    }

    openChallenge(location: Location, challenge: LocationChallenge) {
        this.dialog.open(ChallengeDialogComponent, { data: {
                challenge,
                location
            }, panelClass: 'app-dialog',
        });
    }
}
