import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobSeekerService } from '../../../services/job-seeker.service';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../../environments/environment.development';
import { JobSeeker } from '../../../models/job-seeker.model';
import { JobSeekerUpdate } from '../../../models/job-seeker-update.model';
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
  selector: 'app-job-seeker-edit',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatCardModule, MatTabsModule, PhotoEditorComponent, MatButtonModule,
    MatFormFieldModule, MatInputModule
  ],
  templateUrl: './job-seeker-edit.component.html',
  styleUrl: './job-seeker-edit.component.scss'
})
export class JobSeekerEditComponent implements OnInit {
  private _platformId = inject(PLATFORM_ID);
  private _jobSeekerService = inject(JobSeekerService);
  private _userService = inject(UserService);
  private _fB = inject(FormBuilder);
  private _snackbar = inject(MatSnackBar);

  readonly maxTextAreaChars: number = 1000;
  readonly minInputChars: number = 2;
  readonly maxInputChars: number = 30;

  apiUrl = environment.apiUrl;
  jobSeeker: JobSeeker | undefined;

  jobSeekerEditFg = this._fB.group({
    firstNameCtrl: ['', [Validators.minLength(3), Validators.maxLength(50)]],
    lastNameCtrl: ['', [Validators.minLength(3), Validators.maxLength(50)]],
    phoneNumberCtrl: [''],
    resumeFileUrlCtrl: [''],
    bioCtrl: ['', [Validators.maxLength(this.maxTextAreaChars)]],
    skillsCtrl: [''],
    educationLevelCtrl: [''],
    experienceYearsCtrl: [''],
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

        this._jobSeekerService.getByUserName(loggedInUser.userName!).pipe(take(1)).subscribe({
          next: (res) => {
            this.jobSeeker = res;

            this.initialControllerValues(res!);
          }
        })
      }
    }
  }

  get FirstNameCtrl(): FormControl {
    return this.jobSeekerEditFg.get('firstNameCtrl') as FormControl;
  }

  get LastNameCtrl(): FormControl {
    return this.jobSeekerEditFg.get('lastNameCtrl') as FormControl;
  }

  get PhoneNumberCtrl(): FormControl {
    return this.jobSeekerEditFg.get('phoneNumberCtrl') as FormControl;
  }

  get ResumeFileUrlCtrl(): FormControl {
    return this.jobSeekerEditFg.get('resumeFileUrlCtrl') as FormControl;
  }

  get BioCtrl(): FormControl {
    return this.jobSeekerEditFg.get('bioCtrl') as FormControl;
  }

  get SkillsCtrl(): FormControl {
    return this.jobSeekerEditFg.get('skillsCtrl') as FormControl;
  }

  get EducationLevelCtrl(): FormControl {
    return this.jobSeekerEditFg.get('educationLevelCtrl') as FormControl;
  }

  get ExperienceYearsCtrl(): FormControl {
    return this.jobSeekerEditFg.get('experienceYearsCtrl') as FormControl;
  }

  get LocationCtrl(): FormControl {
    return this.jobSeekerEditFg.get('locationCtrl') as FormControl;
  }

  get ProvinceCtrl(): FormControl {
    return this.jobSeekerEditFg.get('provinceCtrl') as FormControl;
  }

  initialControllerValues(jobSeeker: JobSeeker) {
    this.FirstNameCtrl.setValue(jobSeeker.firstName);
    this.LastNameCtrl.setValue(jobSeeker.lastName);
    this.PhoneNumberCtrl.setValue(jobSeeker.phoneNumber);
    this.ResumeFileUrlCtrl.setValue(jobSeeker.resumeFileUrl);
    this.BioCtrl.setValue(jobSeeker.bio);
    this.SkillsCtrl.setValue(jobSeeker.skills);
    this.EducationLevelCtrl.setValue(jobSeeker.educationLevel);
    this.ExperienceYearsCtrl.setValue(jobSeeker.experienceYears);
    this.LocationCtrl.setValue(jobSeeker.location.toUpperCase());
    this.ProvinceCtrl.setValue(jobSeeker.province.toUpperCase());
  }

  updateJobSeeker(): void {
    if (this.jobSeeker) {
      let updateJobSeeker: JobSeekerUpdate = {
        firstName: this.FirstNameCtrl.value,
        lastName: this.LastNameCtrl.value,
        phoneNumber: this.PhoneNumberCtrl.value,
        resumeFileUrl: this.ResumeFileUrlCtrl.value,
        bio: this.BioCtrl.value,
        skills: this.SkillsCtrl.value,
        educationLevel: this.EducationLevelCtrl.value,
        experienceYears: this.ExperienceYearsCtrl.value,
        location: this.LocationCtrl.value,
        province: this.ProvinceCtrl.value
      }

      this._userService.updateJobSeeker(updateJobSeeker).pipe(take(1))
        .subscribe({
          next: (res: ApiResponse) => {
            if (res.message) {
              this._snackbar.open(res.message, 'Close', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 7000
              })
            }

            this.jobSeekerEditFg.markAsPristine();
          }
        })
    }
  }
}