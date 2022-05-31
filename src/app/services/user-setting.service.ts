import { Injectable } from '@angular/core';
import { UserSetting } from '../types/user-setting';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserSettingNotFoundError } from '../classes/errors';

@Injectable({
    providedIn: 'root',
})
export class UserSettingService {

    constructor(private http: HttpClient) {
    }

    /**
     * ユーザーの設定を取得する
     * @param userId
     */
    public async getSetting(userId: string): Promise<UserSetting> {
        const url = `${environment.api.userSettingUrl}?filter__userId__exact=${userId}`;
        const [userSetting] = await lastValueFrom(this.http.get<UserSetting[]>(url));
        if (!userSetting) {
            throw new UserSettingNotFoundError();
        }
        return userSetting
    }
}
