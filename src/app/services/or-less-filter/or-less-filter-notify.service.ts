import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OrLessFilterNotifyService {

    private orLessFilter$ = new Subject<void>();

    constructor() {
    }
    
    public subscribeNotify(subscribeFunc: () => void): Subscription {
        return this.orLessFilter$.subscribe({
            next: () => subscribeFunc()
        });
    }

    public notify() {
        this.orLessFilter$.next();
    }
}
