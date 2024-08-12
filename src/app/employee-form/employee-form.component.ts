import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class EmployeeFormComponent implements OnInit {
  EmpFormGroup!: FormGroup;
  EmpSkillFormGroup!: FormGroup;
  EmpExperienceFormGroup!: FormGroup;

  isLinear = false;
  constructor(private _formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.EmpFormGroup = this._formBuilder.group({
      empName: [''],
      empEmailId: [''],
      empDesignationId: [''],
      empContactNo: [''],
      empAltContactNo: [''],
      empPersonalEmailId: [''],
      empExpTotalYear: [''],
      empExpTotalMonth: [''],
      empCity: [''],
      empState: [''],
      empPinCode: [''],
      empAddress: [''],
      empPerCity: [''],
      empPerState: [''],
      empPerPinCode: [''],
      empPerAddress: [''],
    });
    this.EmpSkillFormGroup = this._formBuilder.group({
      empId: ['', Validators.required],
      skill: ['', Validators.required],
      totalYearExp: ['', Validators.required],
      lastVersionUsed: ['', Validators.required],
    });
    this.EmpExperienceFormGroup = this._formBuilder.group({
      empId: ['', Validators.required],
      companyName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      designation: ['', Validators.required],
      projectsWorkedOn: ['', Validators.required],
    });
  }
}
