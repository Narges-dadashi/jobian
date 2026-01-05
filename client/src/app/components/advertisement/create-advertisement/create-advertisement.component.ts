import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdvertisementService } from '../../../services/advertisement.service';
import { Advertisement } from '../../../models/advertisement.model';

@Component({
  selector: 'app-create-advertisement',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule
  ],
  templateUrl: './create-advertisement.component.html',
  styleUrl: './create-advertisement.component.scss'
})
export class CreateAdvertisementComponent implements OnInit, OnDestroy {
  fB = inject(FormBuilder);
  adService = inject(AdvertisementService);
  router = inject(Router);
  subscribedCreateAd: Subscription | undefined;
  errors: string[] | undefined;

  ngOnInit(): void {
    this.addSkill();
  }

  ngOnDestroy(): void {
    this.subscribedCreateAd?.unsubscribe();
  }

  adForm = this.fB.group({
    titleCtrl: ['', [Validators.required, Validators.minLength(5)]],
    detailsCtrl: ['', [Validators.required]],
    locationCtrl: ['', [Validators.required]],
    companyNameCtrl: [''],
    companyEmailCtrl: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    shortDescriptionCtrl: [''],
    logoUrlCtrl: [''],
    isRemoteCtrl: [false],
    employmentTypeCtrl: [0],
    experienceLevelCtrl: [0],
    educationLevelCtrl: [0],
    salaryFromCtrl: [0],
    salaryToCtrl: [0],
    skillsCtrl: this.fB.array([]),
    benefitsCtrl: [''],
    expiryDateCtrl: [null],
    statusCtrl: [1]
  });

  get CompanyNameCtrl(): FormControl {
    return this.adForm.get('companyNameCtrl') as FormControl;
  }

  get CompanyEmailCtrl(): FormControl {
    return this.adForm.get('companyEmailCtrl') as FormControl;
  }

  get TitleCtrl(): FormControl {
    return this.adForm.get('titleCtrl') as FormControl;
  }

  get ShortDescriptionCtrl(): FormControl {
    return this.adForm.get('shortDescriptionCtrl') as FormControl;
  }

  get DetailsCtrl(): FormControl {
    return this.adForm.get('detailsCtrl') as FormControl;
  }

  get LocationCtrl(): FormControl {
    return this.adForm.get('locationCtrl') as FormControl;
  }

  get LogoUrlCtrl(): FormControl {
    return this.adForm.get('logoUrlCtrl') as FormControl;
  }

  get IsRemoteCtrl(): FormControl {
    return this.adForm.get('isRemoteCtrl') as FormControl;
  }

  get EmploymentTypeCtrl(): FormControl {
    return this.adForm.get('employmentTypeCtrl') as FormControl;
  }

  get ExperienceLevelCtrl(): FormControl {
    return this.adForm.get('experienceLevelCtrl') as FormControl;
  }

  get EducationLevelCtrl(): FormControl {
    return this.adForm.get('educationLevelCtrl') as FormControl;
  }

  get SalaryFromCtrl(): FormControl {
    return this.adForm.get('salaryFromCtrl') as FormControl;
  }

  get SalaryToCtrl(): FormControl {
    return this.adForm.get('salaryToCtrl') as FormControl;
  }

  get SkillsCtrl(): FormArray {
    return this.adForm.get('skillsCtrl') as FormArray;
  }

  get BenefitsCtrl(): FormControl {
    return this.adForm.get('benefitsCtrl') as FormControl;
  }

  get ExpiryDateCtrl(): FormControl {
    return this.adForm.get('expiryDateCtrl') as FormControl;
  }

  get StatusCtrl(): FormControl {
    return this.adForm.get('statusCtrl') as FormControl;
  }

  addSkill(): void {
    this.SkillsCtrl.push(this.fB.control('', Validators.required));
  }

  removeSkill(index: number): void {
    this.SkillsCtrl.removeAt(index);
  }

  createAdvertisement(): void {
    if (this.adForm.valid) {
      let advertisement: Advertisement = {
        companyName: this.CompanyNameCtrl.value,
        companyEmail: this.CompanyEmailCtrl.value,
        title: this.TitleCtrl.value,
        shortDescription: this.ShortDescriptionCtrl.value,
        details: this.DetailsCtrl.value,
        location: this.LocationCtrl.value,
        logoUrl: this.LogoUrlCtrl.value,
        isRemote: this.IsRemoteCtrl.value,
        employmentType: this.EmploymentTypeCtrl.value,
        experienceLevel: this.ExperienceLevelCtrl.value,
        educationLevel: this.EducationLevelCtrl.value,
        salaryFrom: this.SalaryFromCtrl.value,
        salaryTo: this.SalaryToCtrl.value,
        skills: this.SkillsCtrl.value,
        benefits: this.BenefitsCtrl.value,
        expiryDate: this.ExpiryDateCtrl.value,
        status: this.StatusCtrl.value
      }

      this.subscribedCreateAd = this.adService.createAdvertisement(advertisement).subscribe({
        next: (res) => {
          console.log('Success:', res);
          this.router.navigate(['/advertisements']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.errors) {
            this.errors = err.error.errors
          }
        }
      })
    }
  }
}