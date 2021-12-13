import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../app/core/services/auth.service';
import { Location } from '../models/location.model';

@Injectable({ providedIn: 'root' })
export class LocationApiService {
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) {}

    getLocations(): Observable<Location[]> {
        let params = new HttpParams();
        const profileId = this.authService.profile();
        if (profileId) {
            params = params.set('profileId', this.authService.profile());
        }

        return this.http.get<Location[]>(`/Locations`, { params });
    }
}
