import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}

    canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<any> {
        return of(this.auth._user).pipe(
            take(1),
            map(user => {
                if (user) {
                    this.router.navigate(['profile']);
                }

                return !user;
            })
        );
    }
}