import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { LocalStorageTypes } from '../../constants/local-storage.enum';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() drawer: MatDrawer;

  loggedIn = false;
  user: User;
  userPhoto: string;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(LocalStorageTypes.CurrentUser));
    console.warn(this.user)
    this.userPhoto = this.user ? this.user.photo : undefined;
    this.isLoggedIn();
  }

  isLoggedIn() {
    return this.auth.profile$.pipe(
      map((profile) => {
        if (!profile) {
          this.user = null;
        }
      })
    );
  }

  navigateToLogin() {
    return this.router.navigate(['login']);
  }

  logout(): void {
    this.auth.signOut().then(() => {
      return this.navigateToHome();
    });
  }

  navigateToHome(): Promise<boolean> {
    return this.router.navigate(['']);
  }

  navigateToProfile(): Promise<boolean> {
    return this.router.navigate(['profile']);
  }
}
