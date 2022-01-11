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
    return this.http.get<ChallengeCompact[]>(`./assets/challenges.json`).pipe(
      map((challenges: ChallengeCompact[]) => {
        return challenges[id - 1];
      })
    );
    // return this.api.getEntity(`Challenges/${id}`);
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
