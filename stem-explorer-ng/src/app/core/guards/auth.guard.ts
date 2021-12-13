import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
    return of(this.auth._user).pipe(
      take(1),
      filter((user) => {
        if (!user) {
          this.router.navigate(['login']);
        }
        return !!user;
      }),
      map(user => !!user)
    );
  }
}
