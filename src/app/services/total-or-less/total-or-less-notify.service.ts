import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TotalOrLessNotifyService {

    private totalOrLess$ = new Subject<void>();

    constructor() {
    }

    public subscribeNotify(subscribeFunc: () => void): Subscription {
        return this.totalOrLess$.subscribe({
            next: () => subscribeFunc(),
        });
    }

    public notify() {
        this.totalOrLess$.next();
    }
}
