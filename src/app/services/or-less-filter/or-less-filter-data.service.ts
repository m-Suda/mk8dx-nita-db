import { Injectable } from '@angular/core';
import { OrLessFilter, OrLessKey } from '../../types/or-less-filter';

@Injectable({
    providedIn: 'root',
})
export class OrLessFilterDataService {

    private orLessFilter: OrLessFilter = {
        noRecord: true,
        outOrLess: true,
        orLess5: true,
        orLess4: true,
        orLess3: true,
        orLess2: true,
        orLess1: true,
    }

    constructor() {
    }

    /**
     * フィルター条件を更新する
     * @param key
     * @param checked
     */
    public update({ key, checked }: { key: OrLessKey, checked: boolean }) {
        this.orLessFilter = { ...this.orLessFilter, [key]: checked };
    }

    /**
     * フィルター条件を取得する
     */
    public getFilter(): OrLessFilter {
        return this.orLessFilter;
    }
}
