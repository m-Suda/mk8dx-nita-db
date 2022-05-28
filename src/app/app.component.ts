import { Component, OnInit } from '@angular/core';
import { NitaRecord } from './types/nita-record';
import { NgxSpinnerService } from 'ngx-spinner';
import { RecordService } from './record.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public nitaRecords: NitaRecord[] = [];

    constructor(
        private nitaRecord: RecordService,
        private spinner: NgxSpinnerService,
    ) {
    }

    ngOnInit() {
        this.spinner.show();
        this.nitaRecord.getList().subscribe({
            next: res => {
                this.nitaRecords = res;
            },
            error: (err) => {
                console.error(err);
                this.nitaRecords = [];
                this.spinner.hide();
            },
            complete: () => {
                this.spinner.hide();
            }
        });
    }
}
