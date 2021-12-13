import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocationChallenge } from '../models/location-challenge.model';
import { Location } from '../models/location.model';
import { GeolocationService } from '../services/geolocation.service';
import { ChallengeDialogComponent } from './challenge-dialog.component';

@Component({
    selector: 'app-list-view',
    template: `
    <div class="list--padding" *ngIf="locations" fxLayout="column" fxLayoutAlign="space-around center">
        <ng-container *ngFor="let location of locations | sortByDistance:distances; trackBy: trackLocations">
            <app-challenge-list-card class="list--challenge-card"
            [distance]="distances[location.uid] | largeDistance"
            [challenge]="location.locationChallenges[0]"
            (click)="openInfo(location, location.locationChallenges[0])">
            </app-challenge-list-card>
        </ng-container>
    </div>
    `
})
export class ListViewComponent implements OnInit {
    @Input() locations: Location[];

    distances: number[] = [];
    userLocation: google.maps.LatLngLiteral;

    constructor(
        private dialog: MatDialog,
        private geolocation: GeolocationService,
    ) {
        this.geolocation.getPosition().then(position => {
            if (position) {
                this.userLocation = {
                    lat: position.lat,
                    lng: position.lng
                };
            }
        });
    }

    ngOnInit() {
        this._setDistance();
    }

    trackLocations(_: number, item: Location) {
        return item?.uid;
    }

    openInfo(location: Location, challenge: LocationChallenge): void {
        this.dialog.open(ChallengeDialogComponent, {
            data: { location, challenge },
            panelClass: 'app-dialog',
        });
    }

    private _setDistance() {
        this.locations.forEach(location => {
            if (this.distances[location.uid] === undefined) {
                this.distances[location.uid] = null;

                this.geolocation.getPosition().then(userLocation => {
                    const response = this.geolocation.getDistance(
                        location.position,
                        userLocation,
                    );

                    const newDistances = [...this.distances];
                    newDistances[location.uid] = response;
                    this.distances = newDistances;
                });
            }
        });
    }
}
