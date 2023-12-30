import { Pipe, PipeTransform } from '@angular/core';
import { NitaRecord } from '../types/nita-record';

@Pipe({
    name: 'convertOrLess',
})
export class ConvertOrLessPipe implements PipeTransform {

    transform(record: NitaRecord): string {
        if (record.orLess == null) {
            return '記録なし';
        }

        if (record.orLess > 5) {
            return '圏外';
        }

        return `${record.orLess}落ち`;
    }
}
