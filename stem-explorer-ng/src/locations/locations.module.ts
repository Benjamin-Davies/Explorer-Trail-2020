import { NgModule } from '@angular/core';
import { SharedModule } from '../app/shared/shared.module';
import { ChallengeDialogComponent } from './components/challenge-dialog.component';
import { ChallengeListCardComponent } from './components/challenge-list-card.component';
import { ListViewComponent } from './components/list.component';
import { LocationNavButtonsComponent } from './components/locations-bottom-buttons.component';
import { LocationsContainerComponent } from './components/locations-container.component';
import { LocationsFilterComponent } from './components/locations-filter.component';
import { MapMarkerWindowComponent } from './components/map-marker-window.component';
import { MapComponent } from './components/map.component';
import { LocationsRoutingModule } from './locations-routing.module';
import { FilterLocationsPipe } from './pipes/filter-locations.pipe';

@NgModule({
    imports: [
        SharedModule,
        LocationsRoutingModule,
    ],
    declarations: [
        LocationsContainerComponent,
        MapComponent,
        MapMarkerWindowComponent,
        ChallengeDialogComponent,
        LocationsFilterComponent,
        FilterLocationsPipe,
        ListViewComponent,
        LocationNavButtonsComponent,
        ChallengeListCardComponent,
    ],
})
export class LocationsModule {}
