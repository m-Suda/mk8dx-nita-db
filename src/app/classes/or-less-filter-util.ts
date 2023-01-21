import { OrLessFilter } from '../types/or-less-filter';

export class OrLessFilterUtil {
    /**
     * 記録を全て表示するか
     * @param filter
     */
    public static isAllDisplay(filter: OrLessFilter): boolean {
        return Object.values(filter).every(isShow => isShow);
    }

    /**
     * フィルター状態から表示するN落ちの範囲を作成する
     * @param filter
     */
    public static makeDisplayTarget(filter: OrLessFilter): number[] {
        const targetOrLess = [];

        if (filter.orLess5) {
            targetOrLess.push(5);
        }
        if (filter.orLess4) {
            targetOrLess.push(4);
        }
        if (filter.orLess3) {
            targetOrLess.push(3);
        }
        if (filter.orLess2) {
            targetOrLess.push(2);
        }
        if (filter.orLess1) {
            targetOrLess.push(1);
        }
        return targetOrLess;
    }
}