import { CommonModule } from '@angular/common';
import { NgModule, Provider, ModuleWithProviders } from '@angular/core';
import { DrawerComponent } from './components/drawer/drawer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConfigService } from './config/config.service';
import { SharedModule } from '../shared/shared.module';
import { FirebaseConfigService } from './auth/firebase-config.service';
import { FIREBASE_OPTIONS, AngularFireModule } from '@angular/fire';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';

function getFirebaseConfig(firebaseConfig: FirebaseConfigService) {
  return firebaseConfig.get();
}

const firebaseOptions: Provider = {
  provide: FIREBASE_OPTIONS,
  useFactory: getFirebaseConfig,
  deps: [FirebaseConfigService],
};

const ConfiguredAngularFireModule: ModuleWithProviders<AngularFireModule> = {
  ngModule: AngularFireModule,
  providers: [firebaseOptions],
};

@NgModule({
  declarations: [DrawerComponent, ToolbarComponent],
  imports: [CommonModule, SharedModule, ConfiguredAngularFireModule],
  exports: [DrawerComponent, ToolbarComponent],
  providers: [
    ConfigService,
    AuthService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true,
    // },
  ],
})
export class CoreModule {}
