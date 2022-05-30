import { Component, Input, OnInit } from '@angular/core';
import { NitaRecord } from '../../types/nita-record';

@Component({
    selector: 'app-total-or-less',
    templateUrl: './total-or-less.component.html',
    styleUrls: ['./total-or-less.component.scss'],
})
export class TotalOrLessComponent implements OnInit {

    @Input() nitaRecords: NitaRecord[] = [];

    public totalOrLessOutside: number = 0;
    public totalOrLess5: number = 0;
    public totalOrLess4: number = 0;
    public totalOrLess3: number = 0;
    public totalOrLess2: number = 0;
    public totalOrLess1: number = 0;

    constructor() {
    }

    ngOnInit(): void {
        const orLessList = this.nitaRecords.map(({ orLess }) => orLess);
        this.totalOrLessOutside = orLessList.filter((orLess) => !orLess || orLess > 5).length;
        this.totalOrLess5 = orLessList.filter((orLess) => orLess === 5).length;
        this.totalOrLess4 = orLessList.filter((orLess) => orLess === 4).length;
        this.totalOrLess3 = orLessList.filter((orLess) => orLess === 3).length;
        this.totalOrLess2 = orLessList.filter((orLess) => orLess === 2).length;
        this.totalOrLess1 = orLessList.filter((orLess) => orLess === 1).length;
    }

}
