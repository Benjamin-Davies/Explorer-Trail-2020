import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from './components/camera/camera.component';

const routes: Routes = [
  { path: '', redirectTo: 'camera', pathMatch: 'full' },
  {
    path: 'challenge/:id',
    loadChildren: () => import('../challenge/challenge.module').then((m) => m.ChallengeModule),
  },
  {
    path: 'camera',
    component: CameraComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
