import { Injectable } from '@angular/core';
import { NitaRecord } from '../types/nita-record';
import { combineLatest, from, lastValueFrom, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WorldRecord } from '../types/world-record';

type TaData = {
    mm: number,
    ss: number,
    sss: number
};

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
                        const orLess = this.getOrLessNumber(this.getDiff(wr1st, myRecord));
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

    /**
     * その記録は指定された数値よりタイムが落ちているか
     * @param baseSec
     * @param diff
     */
    public isOrLess(baseSec: number, diff: number): boolean {
        return baseSec * 1000 >= diff;
    }

    /**
     * WRとの差分を取得する
     * @param worldR
     * @param myR
     * @return number
     */
    public getDiff(worldR: string, myR: string): number {
        const wrms = this._convertMilliSecond(this._getDivideTime(worldR));
        const mrms = this._convertMilliSecond(this._getDivideTime(myR));
        // 基本的に自分の記録がWRを超すことは無いため、一旦自分基準の差分で良い。
        return mrms - wrms;
    }

    /**
     * TAのタイムを分、秒、ミリ秒に分割する
     * @param r
     * @private
     */
    private _getDivideTime(r: string): TaData {
        return {
            mm: Number(r.slice(0, 1)),
            ss: Number(r.slice(2, 4)),
            sss: Number(r.slice(5, 8)),
        };
    }

    /**
     * TAのタイムをミリ秒に変換する
     * @param mm
     * @param ss
     * @param sss
     * @private
     */
    private _convertMilliSecond({ mm, ss, sss }: TaData): number {
        return ((mm * 60) + ss) * 1000 + sss;
    }
}
