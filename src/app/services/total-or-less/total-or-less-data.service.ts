import { Injectable } from '@angular/core';
import { TotalOrLess } from '../../types/total-or-less';
import { NitaRecord } from '../../types/nita-record';

@Injectable({
    providedIn: 'root',
})
export class TotalOrLessDataService {

    private totalOrLess: TotalOrLess = {
        noRecord: 0,
        orLessOutside: 0,
        orLess5: 0,
        orLess4: 0,
        orLess3: 0,
        orLess2: 0,
        orLess1: 0
    };

    constructor() {
    }

    /**
     * 記録からそれぞれの◯落ちの個数をカウントする
     * @param records
     */
    public countOrLess(records: NitaRecord[]): TotalOrLess {
        let noRecord = 0;
        let orLessOutside = 0;
        let orLess5 = 0;
        let orLess4 = 0;
        let orLess3 = 0;
        let orLess2 = 0;
        let orLess1 = 0;

        records.forEach(({ orLess }) => {
            if (!orLess) {
                noRecord++;
                return;
            }
            if (orLess > 5) {
                orLessOutside++;
                return;
            }
            if (orLess === 5) {
                orLess5++;
                return;
            }
            if (orLess === 4) {
                orLess4++;
                return;
            }
            if (orLess === 3) {
                orLess3++;
                return;
            }
            if (orLess === 2) {
                orLess2++;
                return;
            }
            if (orLess === 1) {
                orLess1++;
                return;
            }
        });
        return { noRecord, orLessOutside, orLess5, orLess4, orLess3, orLess2, orLess1 };
    }

    /**
     * データをセットする
     * @param total
     */
    public setTotal(total: TotalOrLess) {
        this.totalOrLess = total;
    }

    /**
     * データを取得する
     */
    public getTotal() {
        return this.totalOrLess;
    }
}
