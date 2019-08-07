import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from 'src/app/auth/services/auth.service';
import { baseURL } from 'src/app/shared/config/baseUrl';

@Component({
  selector: "app-upload-data",
  templateUrl: "./upload-data.component.html",
  styleUrls: ["./upload-data.component.scss"]
})
export class UploadDataComponent implements OnInit {
  public uploader: FileUploader;

  constructor(
    private locationService: Location,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const projectId = this.auth.currentUser.project;
    const url =
      baseURL + `api/attendance/project/${projectId}/attendance-data/upload`;
    const token =
      "Bearer " +
      this.auth
        .getToken()
        .split('"')
        .join("");

    this.uploader = new FileUploader({
      url: url,
      itemAlias: "dataFile",
      authTokenHeader: "Authorization",
      authToken: token
    });

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      console.log("File upload status", item, status, response);
    };
  }

  goBack() {
    this.locationService.back();
  }
}
