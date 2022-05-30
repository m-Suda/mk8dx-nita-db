import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-or-less',
    templateUrl: './or-less.component.html',
    styleUrls: ['./or-less.component.scss'],
})
export class OrLessComponent implements OnInit {

    @Input() orLess: number | undefined;

    constructor() {
    }

    ngOnInit(): void {
    }

}
