import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire';
import { SharedModule } from '../shared/shared.module';
import { FirebaseConfigService } from './config/firebase-config.service';
import { DrawerComponent } from './components/drawer/drawer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConfigService } from './config/config.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PageNotFoundComponent } from './components/error-pages/page-not-found.component';

function getFirebaseConfig(firebaseConfig: FirebaseConfigService) {
  return firebaseConfig.get();
}

const firebaseOptions: Provider = {
  provide: FIREBASE_OPTIONS,
  useFactory: getFirebaseConfig,
  deps: [ FirebaseConfigService ]
};

const ConfiguredAngularFireModule: ModuleWithProviders<AngularFireModule> = {
  ngModule: AngularFireModule,
  providers: [ firebaseOptions ]
};

@NgModule({
  declarations: [
    DrawerComponent,
    ToolbarComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ConfiguredAngularFireModule
  ],
  exports: [
    DrawerComponent,
    ToolbarComponent,
  ],
  providers: [
    ConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
})
export class CoreModule {}
