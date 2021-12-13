import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-auth-button-group',
    template: `
    <div class="auth-button-group" fxLayout="column">
        <button mat-raised-button (click)="buttonClick('google')" class="auth-button">
            <mat-icon svgIcon="google-login"></mat-icon>
            &nbsp;Sign up with Google
        </button>
        <button mat-raised-button (click)="buttonClick('facebook')" class="auth-button">
            <mat-icon svgIcon="facebook-login"></mat-icon>
            &nbsp;Sign up with Facebook
        </button>
    </div>
    `,
    styleUrls: ['./auth-button-group.component.scss']
})
export class AuthButtonGroupComponent {
    constructor(private authService: AuthService) {}

    buttonClick(type: 'google' | 'facebook'): void {
        this.authService.ssoLogin(type);
    }
}
