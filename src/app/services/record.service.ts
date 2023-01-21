import { Injectable } from '@angular/core';
import { NitaRecord } from '../types/nita-record';
import { combineLatest, from, lastValueFrom, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WorldRecord } from '../types/world-record';
import { OrLessFilter } from '../types/or-less-filter';
import { OrLessUtil } from '../classes/or-less-util';
import { OrLessFilterUtil } from '../classes/or-less-filter-util';

@Injectable({
    providedIn: 'root',
})
export class RecordService {

    private _allRecords: NitaRecord[] = [];

    constructor(private http: HttpClient) {
    }

    /**
     * NITAの記録を取得する
     */
    public getList(apiId: string): Promise<NitaRecord[]> {
        if (this._allRecords.length) {
            return Promise.resolve(this._allRecords);
        }
        const request$ = combineLatest<[NitaRecord[], WorldRecord[]]>([
            this.http.get<NitaRecord[]>(`${environment.api.domain}${apiId}`),
            from(fetch('./assets/wr.json').then(res => res.json())),
        ])
            .pipe(
                map(([records, wr]) => {
                    return records.map((record, i) => {
                        const { firstRecord: wr1st, firstRecordUrl: wr1stUrl, rankerRecord: wr10th } = wr[i];

                        const { myRecord } = record;
                        if (!myRecord) {
                            return { ...record, wr1st, wr1stUrl, wr10th, orLess: undefined };
                        }
                        const orLess = OrLessUtil.convertTimeToOrLess(wr1st, myRecord);
                        return { ...record, wr1st, wr1stUrl, wr10th, orLess };
                    });
                }),
                tap(records => {
                    this._allRecords = records;
                }),
            );

        return lastValueFrom(request$);
    }

    /**
     * その記録は何落ちであるか
     * @param diff
     */
    public getOrLessNumber(diff: number): number {
        return Math.ceil(diff / 1000);
    }
}
