import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

import { auth } from 'firebase/app';

import { AuthApiService } from './auth-api.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly isLoggedIn: Observable<boolean>;

  constructor(
    private afAuth: AngularFireAuth, // this injects firebase authentication
    private authApi: AuthApiService,
  ) {
    this.isLoggedIn = this.afAuth.authState.pipe(
      map(state => {
        if (state)
          return true;
        else
          return false;
      })
    );
  }

  // google signin
  googleAuthLogin() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  async authLogin(provider: auth.AuthProvider) {
    try {
      const res = await this.afAuth.signInWithPopup(provider);

      let user = await this.authApi.getCurrentUser();
      if (!user) {
        const userInfo: User = {
          // id will be ignored
          id: null,
          firstName: '',
          lastName: '',
          region: '',
          homeTown: '',
        };
        user = await this.authApi.registerUser(userInfo);
      }

      console.log('You have been succesfully logged in! woohoo', res, user);
    } catch (error) {
      console.warn(error);
    }
  }

  async logout() {
    await this.afAuth.signOut();
  }
}
