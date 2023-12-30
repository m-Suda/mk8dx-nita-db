import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NitaRecord } from '../../types/nita-record';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.scss']
})
export class RecordDetailComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: NitaRecord) {
    }
}
