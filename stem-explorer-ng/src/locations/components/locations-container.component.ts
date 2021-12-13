import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterLocationsPipe } from '../pipes/filter-locations.pipe';
import { LocationFilter } from '../models/location-filter.model';
import { Location } from '../models/location.model';
import { LocationApiService } from '../services/location-api.service';
import { Router } from '@angular/router';

enum HomeView {
    MapView,
    ListView,
}

@Component({
    selector: 'app-locations-container',
    template: `
    <app-locations-filter (filterChanged)="filterChanged($event)"></app-locations-filter>

    <ng-container *ngIf="locations$ | async; let locations">

        <ng-container [ngSwitch]="userHomeView">
            <ng-container *ngSwitchCase="HomeView.MapView">
                <app-map [locations]="locations"></app-map>
            </ng-container>

            <ng-container *ngSwitchCase="HomeView.ListView">
                <app-list-view [locations]="locations"></app-list-view>
            </ng-container>
        </ng-container>
    </ng-container>

    <app-location-nav-buttons [leftIcon]="userHomeView === HomeView.MapView ? 'list-view' : 'map-white'" (leftButtonClicked)="navAction($event)"
    ></app-location-nav-buttons>
    `,
    providers: [FilterLocationsPipe]
})
export class LocationsContainerComponent implements OnInit {
    locations$: Observable<Location[]>;
    userHomeView: HomeView;
    filter: LocationFilter;

    HomeView = HomeView;

    constructor(
        private locationApi: LocationApiService,
        private router: Router
    ) {
        const savedView = JSON.parse(localStorage.getItem('homeView'));
        savedView ? this._setHomeView(savedView) : this._setHomeView(HomeView.MapView);
    }

    ngOnInit(): void {
        this.locations$ = this._getLocations();
    }

    filterChanged(filter: LocationFilter): void {
        this.filter = filter;
    }

    navAction(action: 'left' | 'right'): void {
        switch (action) {
            case 'left':
                const view = this.userHomeView === HomeView.MapView ? HomeView.ListView : HomeView.MapView;
                this._setHomeView(view);
                break;
            case 'right':
                this.router.navigate(['camera']);
                break;
        }
    }

    private _setHomeView(view: HomeView): void {
        this.userHomeView = view;
        localStorage.setItem('homeView', JSON.stringify(this.userHomeView));
    }

    private _getLocations(): Observable<Location[]> {
        return this.locationApi.getLocations();
    }
}
