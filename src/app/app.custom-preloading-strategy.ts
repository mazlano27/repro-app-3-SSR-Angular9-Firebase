import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, of, timer} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})

export class CustomPreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, load): Observable<any> {
        const loadRoute = (delay) => delay ? timer(5000).pipe(flatMap(() => load())) : load();
        return route.data && route.data.preload ? loadRoute(route.data.delay) : of(null);
    }
}
