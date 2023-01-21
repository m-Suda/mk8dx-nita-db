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

}