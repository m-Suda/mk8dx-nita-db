import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { NitaRecord } from './types/nita-record';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    constructor(private http: HttpClient) {
    }

    /**
     * NITAのデータを取得する。
     */
    public fetchNitaData(): Observable<NitaRecord[]> {
        return this.http.get<NitaRecord[]>(environment.api.url);
    }
}
