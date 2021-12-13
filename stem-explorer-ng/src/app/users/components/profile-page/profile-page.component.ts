import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { ConfigService } from 'src/app/core/config/config.service';
import { CanLeave } from 'src/app/core/guards/dirty-form.guard';
import { AuthService } from 'src/app/core/services/auth.service';
import { Profile } from 'src/app/shared/models/profile';
import { Region } from 'src/app/shared/models/region';
import { ImageService } from 'src/app/shared/services/image.service';
import { LocalStorageTypes } from '../../../core/constants/local-storage.enum';
import { Category } from '../../../shared/enums/categories.enum';
import { REGIONS } from '../../constants/regions.constant';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfileComponent implements OnInit, CanLeave {
  loggedIn: boolean;
  profile: Profile;

  profilePic: any;
  regions: Region[] = [];
  cities: string[] = [];
  termsLink: string;

  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl({value: '', disabled: true}, Validators.required),
    region: new FormControl('', Validators.required),
    homeTown: new FormControl('', Validators.required),
    profilePic: new FormControl(''),
    nickname: new FormControl('')
  });

  Category = Category;

  constructor(
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
    private imageService: ImageService,
    private configService: ConfigService,
    private gtmService: GoogleTagManagerService,
  ) { }

  ngOnInit(): void {
    this.termsLink = this.configService.get('TERMS_LINK');
    this.profile = JSON.parse(localStorage.getItem(LocalStorageTypes.Profile));
    this.profilePic = this.auth._user.photo;
    this._setRegions();
    this.setForm();
  }

  @HostListener('window:beforeunload')
  canLeave() {
    return !this.profileForm.dirty;
  }

  regionChange({ value }: { value: string }) {
    this.profileForm.controls.homeTown.setValue(null);
    this.cities =
      this.regions.find((region) => region.name === value)?.cities ?? [];
  }

  toMap() {
    this.router.navigate(['/']);
  }

  private setForm() {
    this.profileForm.patchValue({
      firstName: this.profile?.firstName || null,
      lastName: this.profile?.lastName || null,
      email: this.profile?.email || this.auth._user.email,
      region: this.profile?.region || null,
      homeTown: this.profile?.homeTown || null,
    });
  }

  onSubmit(): void {
    const updatedUser: Profile = {
      id: this.profile.id,
      firstName: this.profileForm.get('firstName').value,
      lastName: this.profileForm.get('lastName').value,
      region: this.profileForm.get('region').value,
      homeTown: this.profileForm.get('homeTown').value,
      nickname: this.profileForm.get('nickname').value,
      profileCompleted: true,
      userId: this.profile.userId,
      email: this.profile.email,
    };

    this.auth.updateProfile(updatedUser, this.profilePic).subscribe(
      () => {
        this.profileForm.markAsPristine();
        this.addGtmTag('update profile');
        this.snackbar.open('Awesome! Profile updated!', 'Close', {
          duration: 3000
        });
      }
    );
  }

  async selectFile(photo) {
    if (photo.target.files && photo.target.files[0]) {
      this.profileForm.controls.profilePic.markAsDirty();
      const file = photo.target.files[0];
      const url = await this.imageService.readAsDataURL(file);
      const unscaled = await this.imageService.loadImage(url);
      const cropped = this.imageService.cropToSquare(unscaled, 40);
      const croppedURL = cropped.toDataURL('image/webp');
      this.profilePic = croppedURL;
    }
  }

  /**
   * add tag to GTM on update profile
   */
  private addGtmTag(event: string) {
    this.gtmService.pushTag({ event });
  }

  private _setRegions() {
    this.regions = REGIONS;
  }
}
