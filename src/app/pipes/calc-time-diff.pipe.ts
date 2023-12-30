import { Pipe, PipeTransform } from '@angular/core';
import { OrLessUtil } from '../classes/or-less-util';

@Pipe({
    name: 'calcTimeDiff',
})
export class CalcTimeDiffPipe implements PipeTransform {

    transform(myRecord: string, sourceRecord: string): string {
        if (!myRecord) {
            return '記録なし';
        }

        const diff = OrLessUtil.calcTimeDiff(sourceRecord, myRecord);
        return OrLessUtil.convertDiffIntoStr(diff);
    }

}
