import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ChartsModule } from "ng2-charts";
import { FileUploadModule } from "ng2-file-upload";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { AppMaterialModule } from "../app-material/app-material.module";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { SubheaderComponent } from "./components/subheader/subheader.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule,
    ChartsModule,
    FileUploadModule,
    NgxMaterialTimepickerModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    SubheaderComponent,
    NgxMaterialTimepickerModule,
    ChartsModule,
    FileUploadModule
  ],
  declarations: [SubheaderComponent, ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule {}
