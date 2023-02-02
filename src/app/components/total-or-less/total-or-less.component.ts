import { Component, Input, OnInit } from '@angular/core';
import { NitaRecord } from '../../types/nita-record';
import { OrLessFilter, OrLessKey } from '../../types/or-less-filter';
import { OrLessFilterNotifyService } from '../../services/or-less-filter-notify.service';

@Component({
    selector: 'app-total-or-less',
    templateUrl: './total-or-less.component.html',
    styleUrls: ['./total-or-less.component.scss'],
})
export class TotalOrLessComponent implements OnInit {

    @Input() nitaRecords: NitaRecord[] = [];
    public defaultOrLessFilter: OrLessFilter = {
        noRecord: true,
        outOrLess: true,
        orLess5: true,
        orLess4: true,
        orLess3: true,
        orLess2: true,
        orLess1: true
    };

    public noRecord: number = 0;
    public totalOrLessOutside: number = 0;
    public totalOrLess5: number = 0;
    public totalOrLess4: number = 0;
    public totalOrLess3: number = 0;
    public totalOrLess2: number = 0;
    public totalOrLess1: number = 0;

    constructor(
        private orLessFilterNotify: OrLessFilterNotifyService
    ) {
    }

    ngOnInit(): void {
        const orLessList = this.nitaRecords.map(({ orLess }) => orLess);
        this.noRecord = orLessList.filter((orLess) => !orLess).length;
        this.totalOrLessOutside = orLessList.filter((orLess) => orLess && orLess > 5).length;
        this.totalOrLess5 = orLessList.filter((orLess) => orLess === 5).length;
        this.totalOrLess4 = orLessList.filter((orLess) => orLess === 4).length;
        this.totalOrLess3 = orLessList.filter((orLess) => orLess === 3).length;
        this.totalOrLess2 = orLessList.filter((orLess) => orLess === 2).length;
        this.totalOrLess1 = orLessList.filter((orLess) => orLess === 1).length;
    }

    public onFilterChange(event: { key: OrLessKey, checked: boolean }) {
        this.orLessFilterNotify.notifyChangeFilter(event);
    }
}
