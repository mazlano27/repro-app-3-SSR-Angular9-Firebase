import {Inject, Injectable, OnDestroy, PLATFORM_ID} from '@angular/core';
import {forkJoin, Observable, ReplaySubject, Subject} from 'rxjs';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {AuthService} from './auth/auth.service';
import {concatMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnDestroy {

  destroyed$ = new Subject();
  loading = new Subject<boolean>();
  pressAndHold = new Subject<number>();
  platform;

  loadedLibraries: { [url: string]: ReplaySubject<any> } = {}; // To manage async loaded scripts and styles

  constructor(@Inject(PLATFORM_ID) private platformId,
              @Inject(DOCUMENT) private doc: any,
              private authService: AuthService) {
    this.platform = isPlatformBrowser(platformId) ? 'browser' : 'server';
  }

  initApp() {
    this.authService.init();
  }

  asyncLoadScript(url: string): Observable<any> {
    if (this.loadedLibraries[url]) {
      return this.loadedLibraries[url].asObservable();
    }

    this.loadedLibraries[url] = new ReplaySubject();

    const script = this.doc.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    script.onload = () => {
      this.loadedLibraries[url].next();
      this.loadedLibraries[url].complete();
    };

    this.doc.body.appendChild(script);

    return this.loadedLibraries[url].asObservable();
  }

  asyncLoadStyle(url: string): Observable<any> {
    if (this.loadedLibraries[url]) {
      return this.loadedLibraries[url].asObservable();
    }

    this.loadedLibraries[url] = new ReplaySubject();

    const style = this.doc.createElement('link');
    style.type = 'text/css';
    style.href = url;
    style.rel = 'stylesheet';
    style.onload = () => {
      this.loadedLibraries[url].next();
      this.loadedLibraries[url].complete();
    };

    const head = document.getElementsByTagName('head')[0];
    head.appendChild(style);

    return this.loadedLibraries[url].asObservable();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
