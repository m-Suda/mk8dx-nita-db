import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TotalOrLessComponent } from './components/total-or-less/total-or-less.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DataComponent } from './pages/data/data.component';
import { ChipComponent } from './components/checkbox-chip/chip.component';
import { FormsModule } from '@angular/forms';
import { ConvertOrLessPipe } from './pipes/convert-or-less.pipe';

@NgModule({
    declarations: [
        AppComponent,
        TotalOrLessComponent,
        PageNotFoundComponent,
        DataComponent,
        ChipComponent,
        ConvertOrLessPipe,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        NgxSpinnerModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
