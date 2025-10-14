import { Component, inject, OnInit } from '@angular/core';
import { LoggedIn } from '../../../models/logged-in.model';
import { environment } from '../../../../environments/environment.development';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { AccountService } from '../../../services/account.service';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { response } from 'express';
import { Photo } from '../../../models/photo.model';
import { take } from 'rxjs';
import { ApiResponse } from '../../../models/helpers/apiResponse.model';
import { MatCardModule } from '@angular/material/card';
// import { NgClass } from "../../../../../node_modules/@angular/common/index";
import { MatIcon } from "@angular/material/icon";
import { MatButton } from "@angular/material/button";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [
    FileUploadModule,
    MatIcon, MatButton, MatCardModule,
    CommonModule
  ],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.scss'
})
export class PhotoEditorComponent implements OnInit {
  loggedInUser: LoggedIn | null | undefined;
  apiUrl: string = environment.apiUrl;
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  private _accountService = inject(AccountService);
  private _userService = inject(UserService);
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loggedInUser = this._accountService.loggedInUserSig();
  }

  fileOverBase(event: boolean): void {
    this.hasBaseDropZoneOver = event;
  }

  initializeUploader(): void {
    if (this.loggedInUser) {
      this.uploader = new FileUploader({
        url: this.apiUrl + 'api/user/add-photo',
        authToken: 'Bearer ' + this.loggedInUser.token,
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 4_000_000
      });

      this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false;
      }

      this.uploader.onSuccessItem = (item, response) => {
        if (response) {
          const photo: Photo = JSON.parse(response);
          //   this.member?.photos.push(photo);

          //   if (this.member?.photos.length === 1)
          //     this.setNavbarProfilePhoto(photo.url_165);
          // }
        }
      }
    }
  }

  setNavbarProfilePhotoUrl(url_165: string): void {
    if (this.loggedInUser) {
      this.loggedInUser.profilePhotoUrl = url_165;

      this._accountService.loggedInUserSig.set(this.loggedInUser);
    }
  }

  setMainPhotoComp(url_165: string): void {
    this._userService.setMainPhoto(url_165)
      .pipe(take(1))
      .subscribe({
        next: (response: ApiResponse) => {
          // if (response && this.member) {

          //   for (const photo of this.member.photos) {
          //     if (photo.isMain === true)
          //       photo.isMain = false;

          //     if (photo.url_165 === url_165In) {
          //       photo.isMain = true;

          //       this.loggedInUser!.profilePhotoUrl = url_165In;
          //       this._accountService.setCurrentUser(this.loggedInUser!);
          //     }
          //   }

          this._snackBar.open(response.message, 'close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 7000
          });
        }
      });
  }

  deletePhotoCopm(url_165: string, index: number): void {
    this._userService.deletePhoto(url_165)
      .pipe(take(1))
      .subscribe({
        next: (response: ApiResponse) => {
          // if (response && this.member) {
          //   this.member.photos.splice(index, 1);

          //   this._snackBar.open(response.message, 'Close', {
          //     horizontalPosition: 'center',
          //     verticalPosition: 'top',
          //     duration: 7000
          //   })
          // }
        }
      });
  }
}