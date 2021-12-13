import { TemplatePortal } from '@angular/cdk/portal';
import {
    AfterViewInit, Component, ElementRef, Input, TemplateRef,
    ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '../models/location.model';
import { GeolocationService } from '../services/geolocation.service';
import { MapViewService } from '../services/map-view.service';
import { ChallengeDialogComponent } from './challenge-dialog.component';

@Component({
    selector: 'app-map',
    template: `
        <div #mapContainer id="map" class="map-container"></div>

        <ng-template #infoWindow>
            <app-map-marker-window [location]="location"></app-map-marker-window>
        </ng-template>

        <ng-container *ngIf="!mapLoaded">
            <div class="bouncer centered"></div>
        </ng-container>
    `,
})
export class MapComponent implements AfterViewInit {
    @Input() locations: Location[];

    @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
    @ViewChild('infoWindow', { static: false }) infoWindow: TemplateRef<unknown>;

    map: google.maps.Map;
    mapLoaded = false;
    markers = new Map<Location, google.maps.Marker>();
    location: Location;
    infoW: google.maps.InfoWindow;
    portal: TemplatePortal;
    userMarker: google.maps.Marker;
    userLocation: google.maps.LatLngLiteral;

    constructor(
        private mapViewService: MapViewService,
        private matDialog: MatDialog,
        private geolocation: GeolocationService,
    ) {
        this.geolocation.getPosition().then(position => {
            if (position) {
                this.userLocation = {
                    lat: position.lat,
                    lng: position.lng,
                };
            }

            if (this.userMarker) {
                this.userMarker.setPosition(position);
            }
        });
    }

    ngAfterViewInit() {
        this._loadMap();
    }

    private _loadMap() {
        this.map = new google.maps.Map(this.gmap.nativeElement, this.mapViewService.mapOptions());
        this.map.addListener('tilesloaded', () => {
            this.mapLoaded = true;
            this._loadMapMarkers();
        });
    }

    private _loadMapMarkers() {
        this.locations.forEach((location: Location) => {
            if (this.markers.has(location)) {
                return;
            }

            const marker: google.maps.Marker = this.mapViewService.addMarker(location);
            marker.addListener('click', () => {
                // this._markerClicked(marker, location);
                this.matDialog.open(ChallengeDialogComponent, {
                    data: {
                        challenge: location['locationChallenges'][0],
                        location
                    }, panelClass: 'app-dialog',
                });
            });

            this.markers.set(location, marker);
        });

        this._addUserMarker();
        this.markers.forEach(mark => mark.setMap(this.map));
    }

    private _removeHiddenMarkers(locations: Location[]) {
        this.markers.forEach((marker, location) => {
            const isVisible = locations.includes(location);
            if (!isVisible) {
                marker.setMap(null);
                this.markers.delete(location);
            }
        });
    }

    private _addUserMarker() {
        if (!this.userMarker && this.userLocation) {
            this.userMarker = new google.maps.Marker({
                position: new google.maps.LatLng(
                    this.userLocation.lat,
                    this.userLocation.lng
                ),
                map: this.map,
                icon: '/assets/icons/personMarker.png'
            });
            this.userMarker.setMap(this.map);
        }
    }
}
