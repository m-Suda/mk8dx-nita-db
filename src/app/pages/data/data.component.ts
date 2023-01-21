import { Component, OnDestroy, OnInit } from '@angular/core';
import { NitaRecord } from '../../types/nita-record';
import { ActivatedRoute } from '@angular/router';
import { UserSettingService } from '../../services/user-setting.service';
import { RecordService } from '../../services/record.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserSettingNotFoundError } from '../../classes/errors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrLessFilterNotifyService } from '../../services/or-less-filter-notify.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit, OnDestroy {
    public nitaRecords: NitaRecord[] = [];
    public userName: string = '';
    public isShow = false;

    private subscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private userSetting: UserSettingService,
        private nitaRecord: RecordService,
        private spinner: NgxSpinnerService,
        private snackBar: MatSnackBar,
        private orLessFilterNotify: OrLessFilterNotifyService
    ) {
        this.subscription = this.orLessFilterNotify.subscribeNotify((filter) => {
            this.nitaRecords = this.nitaRecord.filterList(filter);
        });
    }

    async ngOnInit() {
        await this.spinner.show();
        try {
            const userId = this.route.snapshot.params['userId'];
            const { apiId } = await this.userSetting.getSetting(userId);
            this.nitaRecords = await this.nitaRecord.fetchList(apiId);
        } catch (e) {
            console.error(e);
            if (e instanceof UserSettingNotFoundError) {
                this._displaySnackBar('URLに誤りがあるか、ユーザーが登録されていません。');
            } else {
                this._displaySnackBar('データの取得中に何らかのエラーが発生しました。');
            }
            this.nitaRecords = [];
        } finally {
            this.isShow = true;
            await this.spinner.hide();
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
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
