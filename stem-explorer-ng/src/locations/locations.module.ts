import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BottomNavComponent } from './components/bottom-navigation/bottom-navigation.component';
import { ChallengeDialogComponent } from './components/challenge-dialog/challenge-dialog.component';
import { ChallengeFilterComponent } from './components/challenge-filter/challenge-filter.component';
import { ChallengeProgressComponent } from './components/challenge-progress/challenge-progress.component';
import { ListComponent } from './components/list/list.component';
import { MapComponent } from './components/map/map.component';
import { LocationsRoutingModule } from './locations-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, LocationsRoutingModule],
  declarations: [
    MapComponent,
    ListComponent,
    ChallengeDialogComponent,
    ChallengeFilterComponent,
    ChallengeProgressComponent,
    BottomNavComponent,
  ],
})
export class LocationsModule {}
