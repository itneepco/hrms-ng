import { baseURL } from "src/app/shared/config/baseUrl";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FileUploader } from "ng2-file-upload";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
  selector: "app-upload-data",
  templateUrl: "./upload-data.component.html",
  styleUrls: ["./upload-data.component.scss"]
})
export class UploadDataComponent implements OnInit {
  // training order file upload
  // selectedFile: File = null;
  // progressValue = 0;
  public uploader: FileUploader;

  constructor(
    private locationService: Location,
    private snackbar: MatSnackBar,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const projectId = this.auth.currentUser.project;
    const url =
      baseURL + `api/attendance/project/${projectId}/attendance-data/upload`;
    const token = 'Bearer ' + this.auth.getToken().split('"').join('')

    this.uploader = new FileUploader({
      url: url,
      itemAlias: "dataFile",
      authTokenHeader:  'Authorization',
      authToken: token
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };
  }

  // selectFile(event) {
  //   this.selectedFile = event.target.files[0];
  // }

  // uploadFile() {
  //   if (!this.selectedFile) { return; }

  //   this.trainingService.uploadOrder(this._trainingInfo.id , this.selectedFile)
  //     .subscribe(event => {
  //       if (event.type == HttpEventType.UploadProgress) {
  //         this.progressValue = Math.round((event.loaded / event.total) * 100);
  //       } else if (event.type == HttpEventType.Response) {
  //         this.snackbar.open('Successfully uploaded the training order', 'Dismiss', {
  //           panelClass: ['blue-snackbar'],
  //           duration: 2000
  //         });
  //       }
  //     }, error => {
  //       console.log(error);
  //       this.progressValue = 0;
  //       this.snackbar.open('Error!! Please upload only PDF file', 'Dismiss', { duration: 2000 });
  //     });
  // }

  goBack() {
    this.locationService.back();
  }

  insertToPuchingRec() {}
}
