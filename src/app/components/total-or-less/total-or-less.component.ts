import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrLessFilter, OrLessKey } from '../../types/or-less-filter';
import { OrLessFilterNotifyService } from '../../services/or-less-filter/or-less-filter-notify.service';
import { TotalOrLess } from '../../types/total-or-less';
import { Subscription } from 'rxjs';
import { TotalOrLessNotifyService } from '../../services/total-or-less/total-or-less-notify.service';
import { TotalOrLessDataService } from '../../services/total-or-less/total-or-less-data.service';
import { OrLessFilterDataService } from '../../services/or-less-filter/or-less-filter-data.service';

@Component({
    selector: 'app-total-or-less',
    templateUrl: './total-or-less.component.html',
    styleUrls: ['./total-or-less.component.scss'],
})
export class TotalOrLessComponent implements OnInit, OnDestroy {

    public orLessFilter: OrLessFilter = {
        noRecord: true,
        outOrLess: true,
        orLess5: true,
        orLess4: true,
        orLess3: true,
        orLess2: true,
        orLess1: true,
    };
    public totalOrLess: TotalOrLess = {
        noRecord: 0,
        orLessOutside: 0,
        orLess5: 0,
        orLess4: 0,
        orLess3: 0,
        orLess2: 0,
        orLess1: 0,
    };

    private subscriptions: Subscription[] = [];

    constructor(
        private orLessFilterDataService: OrLessFilterDataService,
        private orLessFilterNotifyService: OrLessFilterNotifyService,
        private totalOrLessDataService: TotalOrLessDataService,
        private totalOrLessNotifyService: TotalOrLessNotifyService
    ) {
    }

    ngOnInit() {
        this.subscriptions = [
            this.orLessFilterNotifyService.subscribeNotify(() => {
                this.orLessFilter = this.orLessFilterDataService.getFilter();
            }),
            this.totalOrLessNotifyService.subscribeNotify(() => {
                this.totalOrLess = this.totalOrLessDataService.getTotal();
            })
        ];
        this.totalOrLess = this.totalOrLessDataService.getTotal();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }

    public onFilterChange(event: { key: OrLessKey, checked: boolean }) {
        this.orLessFilterDataService.update(event);
        this.orLessFilterNotifyService.notify();
    }
}
