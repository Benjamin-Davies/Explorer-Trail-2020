import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './users/components/login-page/login-page.component';
import { RegisterPageComponent } from './users/components/register-page/register-page.component';
import { ProfileComponent } from './users/components/profile-page/profile-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ForgotPasswordComponent } from './users/components/forgot-password/forgot-password.component';
import { DirtyFormGuard } from './core/guards/dirty-form.guard';
import { FeaturedLocationsComponent } from './containers/featured-locations/featured-locations.component';
import { LocationsContainerComponent } from '../locations/components/locations-container.component';
import { PageNotFoundComponent } from './core/components/error-pages/page-not-found.component';
import { GuestGuard } from './core/guards/guest-guard';

const routes: Routes = [
  { path: '', component: LocationsContainerComponent },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [GuestGuard],
  },
  { path: '*', component: PageNotFoundComponent },
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
