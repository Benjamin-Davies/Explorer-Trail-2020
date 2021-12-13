import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
import { Challenge } from '../models/challenge';

@Injectable({ providedIn: 'root' })
export class ChallengeApiService {
  constructor(private api: ApiService, private router: Router) {}

  /**
   * Get challenge from API
   * @param id ID number for the challenge
   */
  getChallenge(id: number, token?: string, profileId?: number): Observable<Challenge> {
    let params = new HttpParams();
    params = params.set('profileId', profileId);

    return this.api.getEntity(`Challenges/${id}`).pipe(
      catchError((err) => {
        console.warn('err', err);
        this.router.navigate(['']);
        return of(null);
      })
    );
  }

  /**
   * Checks if answer attempt is true or false
   * @param level selected level the answer is for
   * @param answer the user's answer attempt
   */
  checkAnswer(challengeId: number, answer: string) {
    return this.api.validateAnswer(challengeId, answer);
  }

  levelCompleted(profileId: number, levelId: number[], correct: boolean) {
    return this.api.levelCompleted(profileId, levelId, correct);
  }
}
