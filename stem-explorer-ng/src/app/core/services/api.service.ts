import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExternalContent } from '../../shared/models/external-content';
import { FeaturedLocation } from '../../shared/models/featured-location';
import { Messages } from '../../shared/models/messages';
import { Profile } from '../../shared/models/profile';
import { Progress } from '../../shared/models/progress';
import { User } from '../../shared/models/user';

// With the api server running, go to
// http://localhost:5000/swagger
// to view the basic swagger api docs.
@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
  ) {}

  /**
   * Method to get any entities.
   * @param request the API request string, i.e. 'locations'
   */
  getEntity(request: string): Observable<any> {
    return this.http.get(`/${request}`);
  }

  getExternalContent() {
    return this.http.get<ExternalContent[]>(
      `/ExternalContent`
    );
  }

  getFeaturedLocations() {
    return this.http.get<FeaturedLocation[]>(
      `/Locations/Featured`
    );
  }

  getMessages(): Observable<Messages> {
    return this.http.get<Messages>('/assets/messages.json');
  }

  validateAnswer(levelUid: number, answer: string) {
    return this.http.post<boolean>(
      `/ChallengeLevels/${levelUid}/ValidateAnswer`,
      JSON.stringify(answer),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getCurrentUser() {
    return this.http.get<User>(
      `/User/CurrentUser`,
    );
  }

  registerUser(profileInfo: Profile) {
    return this.http.post<User>(
      `/User/RegisterUser`,
      profileInfo,
    );
  }

  updateUser(userInfo: User) {
    return this.http.put<User>(
      `/User/CurrentUser`,
      userInfo,
    );
  }

  getProgress(profileId: number) {
    return this.http.get<Progress[]>(
      `/Progress/${profileId}`,
    );
  }

  levelCompleted(profileId, levelId: number[], correct: boolean) {
    return this.http.post(
      `/Progress/LevelCompleted`,
      {
        levelId,
        correct,
        profileId,
      },
    );
  }

  /** Profile Endpoints */

  getProfile(userId: string) {
    return this.http.get<Profile>(
      `/Profile?userId=${userId}`,
    );
  }

  createProfile(profile: Profile) {
    return this.http.post<Profile>(
      `/Profile`,
      profile,
    );
  }

  updateProfile(profile: Profile) {
    return this.http.put<Profile>(
      `/Profile/Update`,
      profile,
    );
  }
}
