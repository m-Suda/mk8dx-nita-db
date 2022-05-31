import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OrLessComponent } from './components/or-less/or-less.component';
import { TotalOrLessComponent } from './components/total-or-less/total-or-less.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DataComponent } from './pages/data/data.component';

@NgModule({
    declarations: [
        AppComponent,
        OrLessComponent,
        TotalOrLessComponent,
        PageNotFoundComponent,
        DataComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        NgxSpinnerModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
