import { Injectable } from '@angular/core';
import { MapIcon, MapIconInverted } from '../constants/map-icons.constant';
import { LocationChallenge } from '../models/location-challenge.model';
import { Location } from '../models/location.model';

const MAP_CENTRE = new google.maps.LatLng(-37.685896, 176.167090);

@Injectable({ providedIn: 'root' })
export class MapViewService {
    constructor() {}

    mapOptions(): google.maps.MapOptions {
        return {
            center: MAP_CENTRE,
            zoom: 18,
            scrollwheel: true,
            disableDefaultUI: true,
            disableDoubleClickZoom: true,
            maxZoom: 22,
            minZoom: 18,
            gestureHandling: 'auto',
            styles: [
                {
                    featureType: 'poi',
                    stylers: [{ visibility: 'off' }],
                },
                {
                    featureType: 'road',
                    stylers: [{ visibility: 'simplified' }],
                },
                {
                    featureType: 'landscape',
                    stylers: [{ visibility: 'simplified' }],
                },
                {
                    featureType: 'administrative',
                    stylers: [{ visibility: 'off' }],
                },
                {
                    featureType: 'transit',
                    stylers: [{ visibility: 'off' }],
                },
            ],
        };
    }

    addMarker(location: Location): google.maps.Marker {
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(location.position),
            title: location.name,
            icon: {
                // url: this._markerIconURL(location.challenge),
                url: this._markerIconURL(location['locationChallenges']),
                scaledSize: new google.maps.Size(30, 48),
            }
        });

        return marker;
    }

    private _markerIconURL(challenge: LocationChallenge): string {
        let marker: string;
        // return challenge.complete ? MapIconInverted[challenge.category]
        //     : MapIcon[challenge.category];

        challenge[0].levels.forEach(level => {
            if (level.complete) {
                marker = MapIconInverted[challenge[0].category];
            } else {
                marker = MapIcon[challenge[0].category];
            }
        });
        return marker;
    }
}
