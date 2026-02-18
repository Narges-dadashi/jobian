import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployerService } from '../../../services/employer.service';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../../environments/environment.development';
import { Employer } from '../../../models/employer.model';
import { EmployerUpdate } from '../../../models/employer-update.model';
import { take } from 'rxjs';
import { ApiResponse } from '../../../models/helpers/apiResponse.model';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LoggedIn } from '../../../models/logged-in.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';

@Component({
  selector: 'app-employer-edit',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatCardModule, MatTabsModule, MatButtonModule,
    MatFormFieldModule, MatInputModule,
    PhotoEditorComponent
  ],
  templateUrl: './employer-edit.component.html',
  styleUrl: './employer-edit.component.scss'
})
export class EmployerEditComponent implements OnInit {
  private _platformId = inject(PLATFORM_ID);
  private _employerService = inject(EmployerService);
  private _userService = inject(UserService);
  private _fB = inject(FormBuilder);
  private _snackbar = inject(MatSnackBar);

  readonly maxTextAreaChars: number = 1000;
  readonly minInputChars: number = 2;
  readonly maxInputChars: number = 30;

  apiUrl = environment.apiUrl;
  employer: Employer | undefined;

  // dorost beshe validator ha
  employerEditFg = this._fB.group({
    industryCtrl: [''],
    companyPhoneNumberCtrl: [''],
    contactPhoneNumberCtrl: [''],
    aboutCtrl: [''],
    logoUrlCtrl: [''],
    contactPersonNameCtrl: [''],
    contactPersonPositionCtrl: [''],
    locationCtrl: ['', [Validators.minLength(this.minInputChars), Validators.maxLength(this.maxInputChars)]],
    provinceCtrl: ['', [Validators.minLength(this.minInputChars), Validators.maxLength(this.maxInputChars)]]
  })

  ngOnInit(): void {
    this.getMember();
  }

  getMember(): void {
    if (isPlatformBrowser(this._platformId)) {
      const loggedInUserStr: string | null = localStorage.getItem('loggedInUser');

      if (loggedInUserStr) {
        const loggedInUser: LoggedIn = JSON.parse(loggedInUserStr);

        this._employerService.getByUserName(loggedInUser.userName!).pipe(take(1)).subscribe({
          next: (res) => {
            this.employer = res;

            this.initialControllerValues(res!);
          }
        })
      }
    }
  }

  get IndustryCtrl(): FormControl {
    return this.employerEditFg.get('industryCtrl') as FormControl;
  }

  get CompanyPhoneNumberCtrl(): FormControl {
    return this.employerEditFg.get('companyPhoneNumberCtrl') as FormControl;
  }

  get ContactPhoneNumberCtrl(): FormControl {
    return this.employerEditFg.get('contactPhoneNumberCtrl') as FormControl;
  }

  get AboutCtrl(): FormControl {
    return this.employerEditFg.get('aboutCtrl') as FormControl;
  }

  get LogoUrlCtrl(): FormControl {
    return this.employerEditFg.get('logoUrlCtrl') as FormControl;
  }

  get ContactPersonNameCtrl(): FormControl {
    return this.employerEditFg.get('contactPersonNameCtrl') as FormControl;
  }

  get ContactPersonPositionCtrl(): FormControl {
    return this.employerEditFg.get('contactPersonPositionCtrl') as FormControl;
  }

  get LocationCtrl(): FormControl {
    return this.employerEditFg.get('locationCtrl') as FormControl;
  }

  get ProvinceCtrl(): FormControl {
    return this.employerEditFg.get('provinceCtrl') as FormControl;
  }

  initialControllerValues(employer: Employer) {
    this.IndustryCtrl.setValue(employer.industry);
    this.CompanyPhoneNumberCtrl.setValue(employer.companyPhoneNumber);
    this.ContactPhoneNumberCtrl.setValue(employer.contactPhoneNumber);
    this.AboutCtrl.setValue(employer.about);
    this.LogoUrlCtrl.setValue(employer.logoUrl);
    this.ContactPersonNameCtrl.setValue(employer.contactPersonName);
    this.ContactPersonPositionCtrl.setValue(employer.contactPersonPosition);
    this.LocationCtrl.setValue(employer.location.toUpperCase());
    this.ProvinceCtrl.setValue(employer.province.toUpperCase());
  }

  updateEmployer(): void {
    if (this.employer) {
      let updateEmployer: EmployerUpdate = {
        industry: this.IndustryCtrl.value,
        companyPhoneNumber: this.CompanyPhoneNumberCtrl.value,
        contactPhoneNumber: this.ContactPhoneNumberCtrl.value,
        about: this.AboutCtrl.value,
        logoUrl: this.LogoUrlCtrl.value,
        contactPersonName: this.ContactPersonNameCtrl.value,
        contactPersonPosition: this.ContactPersonPositionCtrl.value,
        location: this.LocationCtrl.value,
        province: this.ProvinceCtrl.value
      }

      this._userService.updateEmployer(updateEmployer).pipe(take(1))
        .subscribe({
          next: (res: ApiResponse) => {
            if (res.message) {
              this._snackbar.open(res.message, 'Close', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 7000
              })
            }

            this.employerEditFg.markAsPristine();
          }
        })
    }
  }
}