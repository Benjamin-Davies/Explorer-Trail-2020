import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StemColours } from '../../app/shared/enums/stem-colours.enum';
import { LocationInfoType } from '../constants/location-info-type.enum';
import { ChallengeDialogData } from '../models/challenge-dialog.model';
import { LocationChallenge } from '../models/location-challenge.model';
import { Location } from '../models/location.model';
import { LocationInfo } from '../models/location-info.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-challenge-dialog',
    template: `
        <app-dialog [category]="challenge.category">
            <app-challenge-title [category]="challenge.category"
                [title]="challenge.title">
            </app-challenge-title>

            <p>{{challenge.description}}</p>

            <p class="location-name" [ngClass]="'text-colour  ' + Colours[challenge.category]">
                {{data.location.name}}
            </p>
            <div class="contactInfo">
                <ng-container *ngFor="let info of locationInfo">
                    <ng-container *ngIf="!!info.label">
                        <app-contact-info
                            [type]="info.type"
                            [category]="challenge.category"
                            [label]="info.label"
                            (infoClick)="viewOnMap()"
                        ></app-contact-info>
                    </ng-container>
                </ng-container>
            </div>
            <div fxLayout="row" fxLayoutAlign="end center">
                <app-button mat-dialog-close
                    [category]="challenge.category"
                    (click)="cameraView()"
                    aria-label="Start challenge"
                    value="Scan QR Code"></app-button>
            </div>
        </app-dialog>
    `
})
export class ChallengeDialogComponent implements OnInit {
    challenge: LocationChallenge;
    location: Location;
    locationInfo: LocationInfo[];
    googleUrl = 'https://www.google.com/maps/'

    Colours = StemColours;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ChallengeDialogData,
        private router: Router,
    ) {
        this.challenge = this.data.challenge;
        this.location = this.data.location;
    }

    ngOnInit() {
        this._setLocationInfo();
    }

    viewOnMap(): void {
        (window as any).open(
            `${this.googleUrl}search/${this.location.name}/@${
                this.location.position.lat},${this.location.position.lng}`,
            '_blank'
        );
    }

    cameraView(): Promise<boolean> {
        return this.router.navigate([`camera`]);
    }

    private _setLocationInfo() {
        this.locationInfo = [
            {
                type: LocationInfoType.Address,
                label: this.location.address,
            },
            {
                type: LocationInfoType.Website,
                label: this.location.link,
                class: 'truncate',
            },
            {
                type: LocationInfoType.Phone,
                label: this.location.phone,
            },
            {
                type: LocationInfoType.Email,
                label: this.location.email,
                class: 'truncate'
            },
        ];
    }
}
