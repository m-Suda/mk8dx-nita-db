export class OrLessUtil {
    /**
     * タイムをN落ちに変換する
     * @param worldR
     * @param myR
     */
    public static convertTimeToOrLess(worldR: string, myR: string): number {
        const wrms = OrLessUtil.convertTimeToMilliSecond(worldR);
        const mrms = OrLessUtil.convertTimeToMilliSecond(myR);
        return OrLessUtil.convertDiffToOrLess(mrms - wrms);
    }

    /**
     * 2つの記録の差分を計算する
     * @param sourceR
     * @param myR
     */
    public static calcTimeDiff(sourceR: string, myR: string): number {
        const sourcems = OrLessUtil.convertTimeToMilliSecond(sourceR);
        const mrms = OrLessUtil.convertTimeToMilliSecond(myR);

        return mrms - sourcems;
    }

    /**
     * 差分を00:00.000形式の文字列に変換する
     * @param diff
     */
    public static convertDiffIntoStr(diff: number): string {
        const { mm, ss, sss } = OrLessUtil.makeTimeFromMS(diff);

        const m = String(mm).padStart(1, '0');
        const s = String(ss).padStart(2, '0');

        return `${m}:${s}.${sss.padEnd(3, '0')}`;
    }

    /**
     * 差分ををN落ちに変換する
     * @param diff
     */
    private static convertDiffToOrLess(diff: number): number {
        return Math.ceil(diff / 1000);
    }

    /**
     * 記録をミリ秒に変換する
     * @param time
     */
    private static convertTimeToMilliSecond(time: string): number {
        const { mm, ss, sss } = OrLessUtil.divideTime(time);
        return ((mm * 60) + ss) * 1000 + sss;
    }

    /**
     * 記録を分秒ミリ秒に分割する
     * @param time
     */
    private static divideTime(time: string): {
        mm: number,
        ss: number,
        sss: number
    } {
        return {
            mm: Number(time.slice(0, 1)),
            ss: Number(time.slice(2, 4)),
            sss: Number(time.slice(5, 8)),
        };
    }

    /**
     * ミリ秒から記録を作成する
     * ※ミリ秒が例えば095と950の場合、数値にするとどちらも95となってしまうため文字列にしている
     * @param ms
     * @private
     */
    private static makeTimeFromMS(ms: number): {
        mm: number,
        ss: number,
        sss: string
    } {
        const tmpSss = ms / 1000;
        const sss = String(tmpSss).split('.')[1];

        return {
            mm: Math.floor(ms / 1000 / 60),
            ss: Math.floor(ms / 1000) % 60,
            /**
             * 小数点以下を文字列変換後に「.」で取得するため例えば095の場合は取得できるが、
             * 950のとき末尾の0が取得できないため、padEndで0を末尾に付与する
             */
            sss: sss.padEnd(3, '0')
        };
    }
}