import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, distinct } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgIcon } from './shared/enums/icons.type';
import { MatDialog } from '@angular/material/dialog';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { Store } from '@ngxs/store';
import { VisitedHomepage } from './store/last-homepage/last-homepage.actions';
import { ProfileReminderService } from './shared/services/profile-reminder.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SvgIconModel } from './shared/models/svg-icon.model';
import { SVG_ICONS } from './shared/constants/icons.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'STEMFest Explorer Trail';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store,
    _: ProfileReminderService,
    snackbar: MatSnackBar,
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer
  ) {
    showIosChromeWarning(snackbar);
    registerIcons(matIconRegistry, domSanitizer);
  }

  get currentUrl(): Observable<string> {
    return this.router.events.pipe(
      // tslint:disable-next-line:deprecation
      startWith(null),
      map(() => this.router.url),
      distinct(),
    );
  }

  get isMap() {
    return this.currentUrl.pipe(
      map((url) => url === '/'),
    );
  }

  ngOnInit(): void {
    const visited = localStorage.getItem('visited');
    if (visited == null) {
      this.dialog.open(SplashScreenComponent, {panelClass: 'app-dialog'});
      localStorage.setItem('visited', 'true');
    }

    this.store.dispatch(new VisitedHomepage());
  }

}

function showIosChromeWarning(snackbar: MatSnackBar) {
  // https://developer.chrome.com/multidevice/user-agent
  if (navigator.userAgent.includes('CriOS/')) {
    snackbar.open(
      'Apple prevents the use of a camera within an app running in Chrome, ' +
        'please use Safari or scan the QR codes directly from your phone.',
      'Close',
      {
        politeness: 'assertive',
        duration: 10_000,
      }
    );
  }
}

function registerIcons(
  matIconRegistry: MatIconRegistry,
  domSanitizer: DomSanitizer
) {
  const iconArr: SvgIconModel[] = SVG_ICONS;

  iconArr.forEach(item => {
    matIconRegistry.addSvgIcon(
      item.name,
      domSanitizer.bypassSecurityTrustResourceUrl(
        `app/../assets/icons/${item.file}`
      )
    );
  });
}
