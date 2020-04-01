import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()

export class AuthGuardService implements CanActivate {

    auth: boolean;

    constructor(private authService: AuthService,
                private snackBar: MatSnackBar,
                private router: Router) {

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.guest) {
            return true;
        } else {
            this.snackBar.open('Please sign in first!', null, {duration: 3000});
            this.router.navigateByUrl('/auth/sign-in');
            return false;
        }
    }
}
