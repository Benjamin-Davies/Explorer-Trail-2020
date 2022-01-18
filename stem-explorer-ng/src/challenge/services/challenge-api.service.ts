import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
import { ChallengeCompact } from '../models/challenge-compact';

@Injectable({ providedIn: 'root' })
export class ChallengeApiService {
  constructor(private api: ApiService, private http: HttpClient) {}

  /**
   * Get challenge from API
   * @param id ID number for the challenge
   */
  getChallenge(id: number): Observable<ChallengeCompact> {
    return this.http.get<ChallengeCompact[]>(`../../assets/challenges.json`).pipe(
      map((challenges: ChallengeCompact[]) => {
        let challenge: ChallengeCompact;
        for (const [k, v] of Object.entries(challenges)) {
          if (v.id === Number(id)) {
            challenge = challenges[k];
          }
        }
        return challenge;
      })
    );
    // return this.api.getEntity(`Challenges/${id}`);
  }
}
