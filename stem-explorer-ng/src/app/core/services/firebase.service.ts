import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  constructor(private afAuth: AngularFireAuth) {}

  googleSignin(): Promise<any> {
    const provider = new auth.GoogleAuthProvider();
    return this.providerSignin(provider);
  }

  facebookSignin(): Promise<any> {
    const provider = new auth.FacebookAuthProvider();
    return this.providerSignin(provider);
  }

  providerSignin(provider: auth.AuthProvider): Promise<any> {
    return this.afAuth.signInWithPopup(provider);
  }

  signOut(): Promise<any> {
    return this.afAuth.signOut();
  }

  emailRegister(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  emailSignin(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  forgotPassword(email: string): Promise<any> {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  async updatePhoto(photoUrl: string): Promise<void> {
    const user = await this.afAuth.currentUser;
    user.updateProfile({ photoUrl });
  }
}
