import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerEditComponent } from './job-seeker-edit.component';

describe('JobSeekerEditComponent', () => {
  let component: JobSeekerEditComponent;
  let fixture: ComponentFixture<JobSeekerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSeekerEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSeekerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
