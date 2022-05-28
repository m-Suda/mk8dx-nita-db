import { Injectable } from '@angular/core';
import { Subject, Subscription, throttleTime } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TrackSearchService {

    private _enterSearch$ = new Subject<string>();

    constructor() {
    }

    public subscribeEnterSearch(
        next: (searchTet: string) => void,
        error: (err: any) => void
    ): Subscription {
        return this._enterSearch$
            .pipe(throttleTime(2000))
            .subscribe({
                next: searchText => next(searchText),
                error: err => error(err),
            });
    }

    public emitSearch(searchText: string) {
        this._enterSearch$.next(searchText);
    }
}
