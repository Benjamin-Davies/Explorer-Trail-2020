import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { Category } from '../../../shared/enums/categories.enum';

@Component({
  selector: 'app-forgot-password',
  templateUrl: 'forgot-password.component.html',
  styleUrls: ['forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  errorMessage = '';
  emailSent = false;

  forgotPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  Category = Category;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  toLogin(): void {
    this.router.navigate(['login']);
  }

  toMap(): void {
    this.router.navigate(['/']);
  }

  resetPassword() {
    this.auth.forgotPassword(this.forgotPassword.controls.email.value).then(
      () => this.emailSent = true
    ).catch(
      () => this.errorMessage = `Sorry, we don't recognise that email address.`
    );
  }
}
