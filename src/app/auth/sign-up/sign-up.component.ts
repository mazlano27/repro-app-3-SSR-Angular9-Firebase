import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AppService} from '../../app.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    platform: string;
    signUpForm: FormGroup;

    constructor(@Inject(PLATFORM_ID) private platformId: any,
                private snackbar: MatSnackBar,
                private appService: AppService,
                private afAuth: AngularFireAuth,
                private afs: AngularFirestore,
                private router: Router) {
        this.platform = isPlatformBrowser(platformId) ? 'browser' : 'server';
    }

    ngOnInit() {
        this.signUpForm = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    async submitRegistrationForm() {
        try {
            this.appService.loading.next(true);
            const response = await this.afAuth.createUserWithEmailAndPassword(
                this.signUpForm.getRawValue().email,
                this.signUpForm.getRawValue().password
            );
            await this.afAuth.signInWithEmailAndPassword(
                this.signUpForm.getRawValue().email,
                this.signUpForm.getRawValue().password
            );
            await this.afs.collection('users').doc(response.user.uid).set({
                email: this.signUpForm.getRawValue().email,
                _userId: response.user.uid,

            });
            this.afAuth.signOut();
            await response.user.sendEmailVerification();
            this.appService.loading.next(false);
            this.router.navigateByUrl('/auth/sign-in');
            this.snackbar.open('Please verify your email address', null, {duration: 3000});
        } catch (e) {
            console.log(e);
            this.snackbar.open(
                'Something went wrong. Please try again.',
                null,
                {duration: 3000}
            );
            this.appService.loading.next(false);
        }
    }
}
