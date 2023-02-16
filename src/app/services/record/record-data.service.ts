import { Injectable } from '@angular/core';
import { NitaRecord } from '../../types/nita-record';
import { OrLessFilter } from '../../types/or-less-filter';
import { OrLessFilterUtil } from '../../classes/or-less-filter-util';

@Injectable({
    providedIn: 'root',
})
export class RecordDataService {

    private allRecords: NitaRecord[] = [];

    constructor() {
    }

    /**
     * データをセットする
     * @param records
     */
    public setList(records: NitaRecord[]): void {
        this.allRecords = records;
    }

    /**
     * データを取得する
     */
    public getList(): NitaRecord[] {
        return this.allRecords;
    }

    /**
     * NITAのフィルターをする
     * @param filter
     */
    public filterList(filter: OrLessFilter): NitaRecord[] {
        // 全て有効の場合は
        if (OrLessFilterUtil.isAllDisplay(filter)) {
            return this.allRecords;
        }

        const displayTarget = OrLessFilterUtil.makeDisplayTarget(filter);
        return this.allRecords.filter(({ orLess }) => {
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
