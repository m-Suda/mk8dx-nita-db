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
    public fetchList(apiId: string): Promise<NitaRecord[]> {
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
                            return { ...record, wr1st, wr1stUrl, wr10th, orLess: null };
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
     * NITAのフィルターをする
     * @param filter
     */
    public filterList(filter: OrLessFilter): NitaRecord[] {
        // 全て有効の場合は
        if (OrLessFilterUtil.isAllDisplay(filter)) {
            return this._allRecords;
        }

        const displayTarget = OrLessFilterUtil.makeDisplayTarget(filter);
        return this._allRecords.filter(({ orLess }) => {
            if (orLess == null) {
                return filter.noRecord;
            }
            // 記録無しまたは6落ち以上の場合は圏外フィルターが設定されてたら表示する
            if (orLess > 5) {
                return filter.outOrLess;
            }
            return displayTarget.includes(orLess);
        });
    }
}
