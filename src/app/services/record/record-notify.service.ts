import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RecordNotifyService {

    private notify$ = new Subject<void>();

    constructor() {
    }

    public subscribeNotify(subscribeFunc: () => void): Subscription {
        return this.notify$.subscribe({
            next: () => subscribeFunc()
        });
    }

    public notify() {
        this.notify$.next();
    }
}
