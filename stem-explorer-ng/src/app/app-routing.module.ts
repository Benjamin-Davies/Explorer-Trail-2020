import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from 'src/locations/components/map/map.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { DirtyFormGuard } from './shared/guards/dirty-form.guard';
import { FeaturedLocationsComponent } from './containers/featured-locations/featured-locations.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    canDeactivate: [DirtyFormGuard]
  },
  { path: 'featured', component: FeaturedLocationsComponent },
  // lazy loading
  {
    path: '',
    loadChildren: () => import('../locations/locations.module').then(m => m.LocationsModule)
  },
  {
    path: 'challenge/:id',
    loadChildren: () => import('../challenge/challenge.module').then(m => m.ChallengeModule)
  },
  {
    path: 'camera',
    loadChildren: () => import('../camera/camera.module').then(m => m.CameraModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
