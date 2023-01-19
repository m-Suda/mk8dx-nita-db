import { Component, Input } from '@angular/core';

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
    @Input() checked = false;
    @Input() disabled = false;
}
