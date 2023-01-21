import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { OrLessFilter, OrLessKey } from '../types/or-less-filter';

@Injectable({
    providedIn: 'root',
})
export class OrLessFilterNotifyService {

    private orLessFilter$ = new BehaviorSubject<OrLessFilter>({
        outOrLess: true,
        orLess5: true,
        orLess4: true,
        orLess3: true,
        orLess2: true,
        orLess1: true,
    });

    constructor() {
    }
    
    public subscribeNotify(subscribeFunc: (value: OrLessFilter) => void): Subscription {
        return this.orLessFilter$.subscribe({
            next: value => subscribeFunc(value)
        });
    }

    public notifyChangeFilter({ key, checked }: { key: OrLessKey, checked: boolean }) {
        const currentValue = this.orLessFilter$.value;
        currentValue[key] = checked;
        this.orLessFilter$.next(currentValue);
    }
}
