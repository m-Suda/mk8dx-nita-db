import { Component, OnInit } from '@angular/core';
import { NitaRecord } from '../../types/nita-record';
import { ActivatedRoute } from '@angular/router';
import { UserSettingService } from '../../services/user-setting.service';
import { RecordService } from '../../services/record.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserSettingNotFoundError } from '../../classes/errors';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
    public nitaRecords: NitaRecord[] = [];
    public userName: string = '';

    constructor(
        private route: ActivatedRoute,
        private userSetting: UserSettingService,
        private nitaRecord: RecordService,
        private spinner: NgxSpinnerService,
        private snackBar: MatSnackBar
    ) {
    }

    async ngOnInit() {
        await this.spinner.show();
        try {
            const userId = this.route.snapshot.params['userId'];
            const { apiId } = await this.userSetting.getSetting(userId);
            this.nitaRecords = await this.nitaRecord.getList(apiId);
        } catch (e) {
            console.error(e);
            if (e instanceof UserSettingNotFoundError) {
                this._displaySnackBar('URLに誤りがあるか、ユーザーが登録されていません。');
            } else {
                this._displaySnackBar('データの取得中に何らかのエラーが発生しました。');
            }
            this.nitaRecords = [];
        } finally {
            await this.spinner.hide();
        }
    }

    /**
     * スナックバーを表示させる。
     * @param message
     * @private
     */
    private _displaySnackBar(message: string) {
        this.snackBar.open(
            message,
            '閉じる',
            {
                verticalPosition: 'top',
                horizontalPosition: 'center'
            }
        );
    }
}
