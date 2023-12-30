import { Component, OnDestroy, OnInit } from '@angular/core';
import { NitaRecord } from '../../types/nita-record';
import { ActivatedRoute } from '@angular/router';
import { UserSettingService } from '../../services/user-setting.service';
import { RecordDataService } from '../../services/record/record-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserSettingNotFoundError } from '../../classes/errors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrLessFilterNotifyService } from '../../services/or-less-filter/or-less-filter-notify.service';
import { Subscription } from 'rxjs';
import { OrLessFilterDataService } from '../../services/or-less-filter/or-less-filter-data.service';
import { RecordApiService } from '../../services/record/record-api.service';
import { RecordNotifyService } from '../../services/record/record-notify.service';
import { OrLessFilterUtil } from '../../classes/or-less-filter-util';
import { MatDialog } from '@angular/material/dialog';
import { RecordDetailComponent } from '../../components/record-detail/record-detail.component';

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit, OnDestroy {
    public nitaRecords: NitaRecord[] = [];
    public userName: string = '';
    public isShow = false;

    private subscriptions: Subscription[] = [];
    private apiId = '';

    constructor(
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private userSettingService: UserSettingService,
        private recordApiService: RecordApiService,
        private recordDataService: RecordDataService,
        private recordNotifyService: RecordNotifyService,
        private spinner: NgxSpinnerService,
        private snackBar: MatSnackBar,
        private orLessFilterDataService: OrLessFilterDataService,
        private orLessFilterNotifyService: OrLessFilterNotifyService
    ) {
    }

    async ngOnInit() {
        this.subscriptions = [
            this.recordNotifyService.subscribeNotify(() => {
                // フィルター中の場合は表示上はその状態を保つ
                const filter = this.orLessFilterDataService.getFilter();
                if (OrLessFilterUtil.isAllDisplay(filter)) {
                    this.nitaRecords = this.recordDataService.getList();
                    return;
                }
                this.nitaRecords = this.recordDataService.filterList(filter);
            }),
            this.orLessFilterNotifyService.subscribeNotify(() => {
                this.nitaRecords = this.recordDataService.filterList(
                    this.orLessFilterDataService.getFilter()
                );
            })
        ];

        await this.spinner.show();
        try {
            const userId = this.route.snapshot.params['userId'];
            const { apiId } = await this.userSettingService.getSetting(userId);
            this.apiId = apiId;
            await this.recordApiService.loadList(apiId);
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
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }

    /**
     * 記録を再読込する
     */
    public async reload() {
        await this.spinner.show();
        try {
            await this.recordApiService.loadList(this.apiId);
        } catch (e) {
            console.error(e);
            this._displaySnackBar('データの取得中に何らかのエラーが発生しました。');
            this.nitaRecords = [];
        } finally {
            this.isShow = true;
            await this.spinner.hide();
        }
    }

    /**
     * 詳細を表示
     * @param record
     */
    public openDetail(record: NitaRecord) {
        this.dialog.open(
            RecordDetailComponent,
            {
                data: record,
            }
        );
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
