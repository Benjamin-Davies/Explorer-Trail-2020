import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-completed-dialog',
  templateUrl: './completed-dialog.component.html',
  styleUrls: ['./completed-dialog.component.scss'],
})
export class CompletedDialogComponent {
  entryForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  errorMsg: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private router: Router,
    private dialogRef: MatDialogRef<CompletedDialogComponent>,
    private gtmSerivce: GoogleTagManagerService
  ) {}

  submitEntry(): void {
    this.errorMsg = null;
    const url = 'https://formspree.io/f/xlezglrn';

    this.gtmSerivce.pushTag({ event: 'form submit', form: this.entryForm.value });
    const submit = this.http.post(url, this.entryForm.value);
    submit
      .pipe(
        map((res: any) => {
          if (res.ok) {
            this.dialogRef.close();
            return this.router.navigate(['']);
          } else {
            this.gtmSerivce.pushTag({ event: 'form submit failed' });
            this.errorMsg = 'Oops, something went wrong. Please try again.';
          }
        })
      )
      .subscribe();
  }
}
