import { DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { CategoryIcons } from 'src/app/shared/enums/large-category-icons.enum';
import { FilterLocationsPipe } from 'src/app/shared/pipes/filter-locations.pipe';
import { Filter } from 'src/locations/models/filter';
import { GeolocationService } from 'src/locations/services/geolocation.service';
import { MapConfigService } from 'src/locations/services/map-config.service';
import { Colour } from '../../../app/shared/enums/stem-colours.enum';
import { Location, LocationChallenge } from '../../models/location';
import { ChallengeDialogComponent } from '../challenge-dialog/challenge-dialog.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [FilterLocationsPipe],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  @ViewChild('infoWindow', { static: false }) infoWindow: TemplateRef<unknown>;
  map: google.maps.Map;
  markers = new Map<Location, google.maps.Marker>();

  filter: Filter;
  locations: Location[];
  location: Location;
  distance: number;
  userLocation: google.maps.LatLngLiteral;
  userLocationLat: number;
  userLocationLng: number;
  Colour = Colour;
  Icon = CategoryIcons;
  locationAccess = false;
  locationsSubscription: any;
  tilesLoaded = false;

  infoW: google.maps.InfoWindow;
  userMarker: google.maps.Marker;
  portal: TemplatePortal<any>;

  constructor(
    private mapConfig: MapConfigService,
    private filterLocations: FilterLocationsPipe,
    private geolocation: GeolocationService,
    private gtmService: GoogleTagManagerService,
    private dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private defaultInjector: Injector,
    private viewContainerRef: ViewContainerRef
  ) {
    this.geolocation.getPosition().then((pos) => {
      if (pos) {
        this.userLocationLat = pos.lat;
        this.userLocationLng = pos.lng;
        this.userLocation = {
          lat: pos.lat,
          lng: pos.lng,
        };

        if (this.userMarker) {
          this.userMarker.setPosition(pos);
        }
      }
    });

    this.locationAccess = !navigator.geolocation;
  }

  ngOnInit(): void {
    this.getLocations();
  }

  ngAfterViewInit(): void {
    this.mapInit();
  }

  ngOnDestroy(): void {
    this.locationsSubscription?.unsubscribe();
  }

  trackLocations(_: number, item: Location) {
    return item?.uid;
  }

  trackChallenges(_: number, item: LocationChallenge) {
    return item?.challengeId;
  }

  mapInit(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapConfig.mapOptions());
    this.map.addListener('tilesloaded', () => {
      this.tilesLoaded = true;
    });
    this.map.addListener('click', () => {
      this.infoW?.close();
    });
    this.setMapMarkers();
  }

  filterChanged(filter: Filter) {
    this.filter = filter;
    this.setMapMarkers();
  }

  clickOnMarker(marker, location: Location): void {
    this.getDistanceToLocation(location.position);
    this.location = location;

    this.infoW?.close();
    this.portal?.detach();

    this.infoW = new google.maps.InfoWindow({
      content: '<div id="info-window-container"></div>',
    });
    this.infoW.open(marker.getMap(), marker);

    this.infoW.addListener('domready', () => {
      const el = this.gmap.nativeElement as HTMLElement;
      const container = el.querySelector('#info-window-container');
      // Dom Portals allow us to display Angular components inside
      // non-Angular DOM elements
      const portalOutlet = new DomPortalOutlet(
        container,
        this.componentFactoryResolver,
        this.appRef,
        this.defaultInjector
      );
      const portal = new TemplatePortal(this.infoWindow, this.viewContainerRef);
      portal.attach(portalOutlet);
      this.portal = portal;
    });

    this.addGtmTag('open location info', location.name);
  }

  /**
   * Method fired when user clicked on a challenge button in the Location info window. Triggers the Challenge dialog box.
   * @param location location data object
   * @param challenge individual challenge
   * @todo have a contact/links object in the location info, so we can send through that and only location name. Currently
   * if location has multiple challenges they also get sent through.
   */
  openChallenge(location: Location, challenge: LocationChallenge): void {
    this.dialog.open(ChallengeDialogComponent, {
      data: {
        challenge,
        location,
      },
      panelClass: 'app-dialog',
    });
    this.addGtmTag('open challenge info', challenge.challengeTitle);
  }

  /**
   * Gets all locations from store
   */
  private getLocations(): void {
    // get locations from api service
  }

  private setMapMarkers(): void {
    if (!this.locations || !this.filter) {
      return;
    }

    const filtered = this.filterLocations.transform(this.locations, this.filter);
    // Delete markers that are no longer shown
    this.deleteHiddenMarkers(filtered);

    // Add new markers
    filtered.forEach((loc) => {
      if (this.markers.has(loc)) {
        // Don't create duplicate markers
        return;
      }

      const marker = this.mapConfig.addMarker(loc);
      marker.addListener('click', () => {
        this.clickOnMarker(marker, loc);
      });
      this.markers.set(loc, marker);
    });

    this.addUserMarker();
    this.markers.forEach((m) => m.setMap(this.map));
  }

  private deleteHiddenMarkers(locations: Location[]) {
    this.markers.forEach((marker, loc) => {
      const stillVisible = locations.indexOf(loc) >= 0;
      if (!stillVisible) {
        marker.setMap(null);
        this.markers.delete(loc);
      }
    });
  }

  private addUserMarker() {
    if (!this.userMarker) {
      this.userMarker = new google.maps.Marker({
        position: new google.maps.LatLng(this.userLocationLat, this.userLocationLng),
        map: this.map,
        icon: '/assets/icons/personMarker.png',
      });
    }
    this.userMarker.setMap(this.map);
  }

  /**
   * Gets the distance to location. Resets distance to an empty string to prevent previous distance
   * from showing in the Info Window, and only assigns the distance text to it if current has a
   * current position. If user does not have a current position, then obs returns undefined and distance
   * remains as an empty string.
   * @param position the lat and lng object of a location
   */
  private getDistanceToLocation(position: google.maps.LatLngLiteral): void {
    this.distance = null;

    if (this.userLocation) {
      this.distance = this.geolocation.getDistance(position, this.userLocation);
    }
  }

  /**
   * add tag to GTM on the card click
   * @param title challenge title
   */
  private addGtmTag(event: string, title: string): void {
    const gtmTag = { event, title };
    this.gtmService.pushTag(gtmTag);
  }
}
