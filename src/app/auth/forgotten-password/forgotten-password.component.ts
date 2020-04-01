import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {isPlatformBrowser} from '@angular/common';
import {AppService} from '../../app.service';
import {AngularFireAuth} from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {
  platform: string;
  resetPasswordForm: FormGroup;

  constructor(@Inject(PLATFORM_ID) private platformId: any,
              private appService: AppService,
              private afAuth: AngularFireAuth,
              private snackbar: MatSnackBar,
              private router: Router) {
    this.platform = isPlatformBrowser(platformId) ? 'browser' : 'server';
  }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl('', Validators.required)
    });
  }

  async submitResetPasswordForm() {
    try {
      this.appService.loading.next(true);
      await this.afAuth.sendPasswordResetEmail(this.resetPasswordForm.getRawValue().email);
      this.snackbar.open(
        'A password reset email has been sent to your email address.',
        null,
        {duration: 3000}
      );
      this.router.navigateByUrl('/auth/sign-in');
    } catch (e) {
      console.log(e);
    }
  }
}
