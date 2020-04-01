import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../app.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    platform: string;
    signInForm: FormGroup;

    constructor(@Inject(PLATFORM_ID) private platformId: any,
                private appService: AppService,
                private afAuth: AngularFireAuth,
                private snackbar: MatSnackBar,
                private router: Router) {
        this.platform = isPlatformBrowser(platformId) ? 'browser' : 'server';
    }

    ngOnInit() {
        this.signInForm = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    async submitSignInForm() {
        try {
            this.appService.loading.next(true);
            const response = await this.afAuth.signInWithEmailAndPassword(
                this.signInForm.getRawValue().email,
                this.signInForm.getRawValue().password
            );
            if (response.user.emailVerified) {
                this.appService.loading.next(false);
                this.snackbar.open('Welcome back!', null, {duration: 3000});
                this.router.navigateByUrl('/');
            } else {
                this.appService.loading.next(false);
                this.afAuth.signOut();
                this.snackbar.open(
                    'Please verify your email before logging in.',
                    null,
                    {duration: 3000, verticalPosition: 'top'});
            }
        } catch (e) {
            this.snackbar.open(
                e.message,
                null,
                {duration: 3000});
            this.appService.loading.next(false);
        }
    }
}
