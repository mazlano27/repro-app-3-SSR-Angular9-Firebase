import {Directive, HostListener, EventEmitter, Output} from '@angular/core';
import {interval, Observable, Subject} from 'rxjs';
import {filter, takeUntil, tap} from 'rxjs/operators';

@Directive({
    selector: '[appPressAndHold]'
})
export class PressAndHoldDirective {

    @Output() holdTime: EventEmitter<number> = new EventEmitter();

    state: Subject<string> = new Subject();
    cancel: Observable<string>;

    constructor() {
        this.cancel = this.state.pipe(
            filter(v => v === 'cancel'),
            tap(v => {
                this.holdTime.emit(0);
            })
        );
    }

    @HostListener('mouseup', ['$event'])
    @HostListener('mouseleave', ['$event'])
    onMouseExit() {
        this.state.next('cancel');
    }

    @HostListener('mousedown', ['$event'])
    onMouseHold() {
        const n = 100;
        interval(n)
            .pipe(
                takeUntil(this.cancel),
                tap(v => {
                    this.holdTime.emit(v * n);
                })
            )
            .subscribe();
    }

    @HostListener('touchend', ['$event'])
    @HostListener('touchmove', ['$event'])
    onTouchExit() {
        this.state.next('cancel');
    }

    @HostListener('touchstart', ['$event'])
    onTouchHold() {
        const n = 100;
        interval(n)
            .pipe(
                takeUntil(this.cancel),
                tap(v => {
                    this.holdTime.emit(v * n);
                })
            )
            .subscribe();
    }
}
