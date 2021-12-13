import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthButtonGroupComponent } from './components/auth-button-group/auth-button-group.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProfileComponent } from './components/profile-page/profile-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        AuthButtonGroupComponent,
        ForgotPasswordComponent,
        LoginPageComponent,
        ProfileComponent,
        RegisterPageComponent,
    ],
    exports: [],
})
export class UsersModule {}
