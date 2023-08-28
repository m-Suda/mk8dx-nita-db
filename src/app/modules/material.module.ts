import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

const materialModules = [
    MatToolbarModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ...materialModules,
    ],
    exports: [
        ...materialModules,
    ],
})
export class MaterialModule {
}
