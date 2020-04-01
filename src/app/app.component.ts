import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SwUpdate} from '@angular/service-worker';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {AppService} from './app.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    destroyed$ = new Subject();
    platform: string;
    loading;
    pressAndHold;

    constructor(@Inject(PLATFORM_ID) private platformId: any,
                private swUpdate: SwUpdate,
                private snackbar: MatSnackBar,
                private router: Router,
                private appService: AppService) {
        this.platform = isPlatformBrowser(platformId) ? 'browser' : 'server';
    }

    ngOnInit(): void {
        // App loading indicator
        this.appService.loading
            .pipe(takeUntil(this.destroyed$))
            .subscribe(loading => {
                this.loading = loading;
            });

        // App press & hold indicator
        this.appService.pressAndHold
            .pipe(takeUntil(this.destroyed$))
            .subscribe(pressAndHold => {
                this.pressAndHold = pressAndHold;
            });

        // Init auth
        if (this.platform === 'browser') {
            this.appService.initApp();
        }

        // Navigation loading indicator
        this.router.events
            .pipe(takeUntil(this.destroyed$))
            .subscribe((routerEvent: RouterEvent) => {
                if (routerEvent instanceof NavigationStart) {
                    this.loading = true;
                }
                if (routerEvent instanceof NavigationEnd ||
                    routerEvent instanceof NavigationCancel ||
                    routerEvent instanceof NavigationError) {
                    this.loading = false;
                }
            });

        // Service Worker Update
        this.swUpdate.available.subscribe(evt => {
            const appUpdateSnack = this.snackbar.open('Update Available', 'Reload');
            appUpdateSnack.onAction()
                .subscribe(() => {
                    window.location.reload();
                });
        });
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
