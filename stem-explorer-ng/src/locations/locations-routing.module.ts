import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsContainerComponent } from './components/locations-container.component';

const routes: Routes = [
    {
        path: '',
        component: LocationsContainerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LocationsRoutingModule {}
