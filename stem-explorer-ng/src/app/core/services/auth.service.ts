import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from 'src/app/shared/models/profile';
import { User } from 'src/app/shared/models/user';
import { ApiService } from 'src/app/core/services/api.service';
import { ProfileReminderService } from 'src/app/shared/services/profile-reminder.service';
import { TEAM_NAME_ONE, TEAM_NAME_TWO } from '../../users/constants/team-name.constant';
import { LocalStorageTypes } from '../constants/local-storage.enum';
import { FirebaseService } from './firebase.service';
import { GuestService } from './guest.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _user: User;
  token: string;
  profile$: BehaviorSubject<Profile> = new BehaviorSubject(null);

  actionCodeSettings = {
    url: 'https://stemexplorertrail.nz/'
  };

  constructor(
    private api: ApiService,
    private profileReminder: ProfileReminderService,
    private firebaseService: FirebaseService,
    private guestService: GuestService,
    private router: Router,
  ) {
    this._user = JSON.parse(localStorage.getItem(LocalStorageTypes.CurrentUser));
    if (this._user !== null) {
      this.userToken();
      this.setProfile();
    }
  }

  userToken(): string {
    this.token = JSON.parse(localStorage.getItem(LocalStorageTypes.Token));
    return this.token;
  }

  profile(): string {
    return JSON.parse(localStorage.getItem(LocalStorageTypes.Profile));
  }

  ssoLogin(provider: 'google' | 'facebook'): void {
    const authProvider = provider === 'google' ? this.firebaseService.googleSignin() :
      provider === 'facebook' ? this.firebaseService.facebookSignin() : null;

    authProvider.then((credentials) => {
      this.setUser(credentials.user);
      if (credentials.additionalUserInfo.isNewUser) {
        const newProfile: Profile = {
          id: null,
          email: credentials.user.email,
          userId: credentials.user.uid,
          profileCompleted: false,
        };
        this.createProfile(newProfile);
      } else {
        return this.router.navigate(['/']);
      }
    });
  }

  /**
   * sign out
   */
  async signOut(): Promise<void> {
    await this.firebaseService.signOut();
    localStorage.removeItem(LocalStorageTypes.CurrentUser);
    localStorage.removeItem(LocalStorageTypes.Token);
    localStorage.removeItem(LocalStorageTypes.Profile);
    this._user = null;
    this.token = null;

    this.profile$.next(null);
  }

  /**
   * register by email, then send email vertification and create new profile
   */
  registerEmail(email: string, password: string, firstName: string, lastName: string) {
    return this.firebaseService.emailRegister(email, password).then((credentials) => {
      this.setUser(credentials.user);
      credentials.user.sendEmailVerification(this.actionCodeSettings);

      const profile: Profile = {
        id: null,
        firstName,
        lastName,
        email: credentials.user.email,
        userId: credentials.user.uid,
        profileCompleted: false,
      };
      this.createProfile(profile);
    });
  }

  /**
   * email log in for existing users
   */
  async emailLogin(email: string, password: string): Promise<void> {
    return this.firebaseService.emailSignin(email, password).then(response =>
      this.setUser(response.user)
    );
  }

  /**
   * email reset password link.
   */
  async forgotPassword(email: string): Promise<any> {
    return this.firebaseService.forgotPassword(email);
  }

  /**
   * Get the user profile
   */
  setProfile(){
    const obs = this.api.getProfile(this._user.id).pipe(map(res => {
        localStorage.setItem(LocalStorageTypes.Profile, JSON.stringify(res));
        this.profile$.next(res);
        return res;
      }));
    return obs;
  }

  /**
   * update user profile
   */
  updateProfile(profile: Profile, photo?: any): Observable<Profile> {
    if (photo !== null) {
      this.updatePhotoURL(photo);
    }
    return this.api.updateProfile(profile);
  }

  updatePhotoURL(photoURL: string): void {
    this.firebaseService.updatePhoto(photoURL);
  }

  /**
   * set the firebase user in the local storage
   * @param user firebase.user data object
   */
  private setUser(user: firebase.User) {
    this._user = {
      id: user.uid,
      email: user.email,
      photo: user.photoURL
    };
    localStorage.setItem(LocalStorageTypes.CurrentUser, JSON.stringify(this._user));
  }

  /**
   * creates a profile for the user in our db.
   */
  private createProfile(profile: Profile) {
    profile = {
      ...profile,
      nickname: this._setTeamName(),
    };

    console.warn(profile.nickname);
    console.warn(JSON.stringify(localStorage.getItem(LocalStorageTypes.CurrentUser)));

    this.api.createProfile(profile).pipe(map((newProfile: Profile) => {
      if (newProfile) {
        localStorage.setItem(LocalStorageTypes.Profile, JSON.stringify(newProfile));
        this.profileReminder.remindUser();
        this.guestService.recordGuestCompleted(newProfile.id);
        return this.router.navigate(['profile']);
      }
    })).subscribe();
  }

  private _setTeamName() {
    const firstIdx = Math.floor(Math.random() * TEAM_NAME_ONE.length);
    const secondIdx = Math.floor(Math.random() * TEAM_NAME_TWO.length);

    return `${TEAM_NAME_ONE[firstIdx]} ${TEAM_NAME_TWO[secondIdx]}`;
  }

  // async getProgress(profileId: number) {
  //   return await this.api.getProgress(await this.getToken(), profileId).toPromise();
  // }

  // async levelCompleted(profileId: number, levelId: number, correct: boolean) {
  //   return await this.api.levelCompleted(await this.getToken(), profileId, levelId, correct).toPromise();
  // }
}
