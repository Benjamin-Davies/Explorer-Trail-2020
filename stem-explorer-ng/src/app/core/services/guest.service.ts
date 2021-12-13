import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class GuestService {
    guestCompletedLevels = [];

    constructor(
        private apiService: ApiService
    ) {}

    recordGuestCompleted(levelId: number): void {
        this.guestCompletedLevels.push(levelId);
    }

    saveGuestLevels(profileId: any): void {
        if (!this.guestCompletedLevels.length) {
            return;
        }
        this.apiService.levelCompleted(profileId, this.guestCompletedLevels, true).subscribe(
            () => this.guestCompletedLevels = []
        );
    }
}
