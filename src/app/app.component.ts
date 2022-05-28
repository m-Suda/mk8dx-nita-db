import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { NitaRecord } from './types/nita-record';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public nitaRecords: NitaRecord[] = [];

    constructor(
        private api: ApiService,
        private spinner: NgxSpinnerService,
    ) {
    }

    ngOnInit() {
        this.spinner.show();
        this.api.fetchNitaData().subscribe({
            next: res => {
                this.nitaRecords = res;
            },
            error: () => {
                this.nitaRecords = [];
                this.spinner.hide();
            },
            complete: () => {
                this.spinner.hide();
            }
        });
    }

    public onSearch() {
        console.log('enter押された');
    }

    private _search() {
    }
}
