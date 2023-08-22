import { Injectable } from '@angular/core';
import { NitaRecord } from '../../types/nita-record';
import { combineLatest, from, lastValueFrom, map, tap } from 'rxjs';
import { WorldRecord } from '../../types/world-record';
import { environment } from '../../../environments/environment';
import { OrLessUtil } from '../../classes/or-less-util';
import { HttpClient } from '@angular/common/http';
import { RecordDataService } from './record-data.service';
import { RecordNotifyService } from './record-notify.service';
import { TotalOrLessDataService } from '../total-or-less/total-or-less-data.service';
import { TotalOrLessNotifyService } from '../total-or-less/total-or-less-notify.service';

@Injectable({
    providedIn: 'root',
})
export class RecordApiService {

    constructor(
        private http: HttpClient,
        private recordDataService: RecordDataService,
        private recordNotifyService: RecordNotifyService,
        private totalOrLessDataService: TotalOrLessDataService,
        private totalOrLessNotifyService: TotalOrLessNotifyService
    ) {
    }

    /**
     * NITAの記録を取得する
     */
    public async loadList(apiId: string): Promise<void> {
        const request$ = combineLatest<[NitaRecord[], WorldRecord[]]>([
            this.http.get<NitaRecord[]>(`${environment.api.domain}${apiId}`),
            from(fetch('./assets/wr.json').then(res => res.json())),
        ])
            .pipe(
                map(([records, wr]) => {
                    return records.map((record, i) => {
                        const { trackJp, firstRecord: wr1st, firstRecordUrl: wr1stUrl, rankerRecord: wr10th } = wr[i];

                        const { myRecord } = record;
                        if (!myRecord) {
                            return { ...record, track: trackJp, wr1st, wr1stUrl, wr10th, orLess: null };
                        }
                        const orLess = OrLessUtil.convertTimeToOrLess(wr1st, myRecord);
                        return { ...record, track: trackJp, wr1st, wr1stUrl, wr10th, orLess };
                    });
                }),
            );

        const records = await lastValueFrom(request$);
        this.recordDataService.setList(records);
        this.recordNotifyService.notify();

        const totalOrLess = this.totalOrLessDataService.countOrLess(records);
        this.totalOrLessDataService.setTotal(totalOrLess);
        this.totalOrLessNotifyService.notify();
    }
}
