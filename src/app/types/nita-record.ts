export type NitaRecord = {
    /* コース名 */
    track: string;
    /* WRの1st */
    wr1st: string;
    /* WRの10th */
    wr10th: string;
    /* 自分の記録 */
    myRecord: string;
    /* 1周目の記録 */
    firstRap: string;
    /* 2周目の記録 */
    secondRap: string;
    /* 3週目の記録 */
    thirdRap: string;
    /* URL */
    url: string | null;
    /* WRの1stのリンク */
    wr1stUrl?: string;
    /* 検索用の文言 */
    searchTrack: string[];
    /* WRから何落ちか */
    orLess?: number;
};