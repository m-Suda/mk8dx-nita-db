import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrLessKey } from '../../types/or-less-filter';

@Component({
    selector: 'app-chip',
    templateUrl: './chip.component.html',
    styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
    /**
     * SCSSを参照
     * ※親からカラーコードを渡して子の:checkedに適用する方法がわからなかった。
     * ※カラーが決まっているのでこの実装にした。
     */
    @Input() colorClass: string = 'out-or-less';
    @Input() key: OrLessKey = 'outOrLess';
    @Input() checked = false;
    @Input() disabled = false;

    @Output() change = new EventEmitter<{ key: OrLessKey, checked: boolean }>();

    public onChange() {
        this.change.emit({ key: this.key, checked: this.checked });
    }
}
