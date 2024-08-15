import { Component, model, OnInit } from '@angular/core';
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
import { MainSerivce } from '../main.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
  ],
})
export class EmployeeFormComponent implements OnInit {
  EmpFormGroup!: FormGroup;
  EmpSkillFormGroup!: FormGroup;
  EmpExperienceFormGroup!: FormGroup;
  designations: any;
  roles: any;
  isLinear = false;
  empId!: number;
  constructor(
    private _formBuilder: FormBuilder,
    private service: MainSerivce,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.createForm();
    this.getAllDesignations();
    this.getAllRoles();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.empId = Number(params.get('id'));
      if (this.empId) {
        this.service.GetEmployeeByEmployeeId(this.empId).subscribe({
          next: (res: any) => {
            this.EmpFormGroup.patchValue(res.data);
            this.EmpSkillFormGroup.patchValue(res.data.ErpEmployeeSkills);
            this.EmpExperienceFormGroup.patchValue(res.data.ErmEmpExperiences);
          },
        });
      }
    });
  }
  patchValues() {
    this.EmpFormGroup.patchValue({
      empPerCity: this.EmpFormGroup.value.empCity,
      empPerState: this.EmpFormGroup.value.empState,
      empPerPinCode: this.EmpFormGroup.value.empPinCode,
      empPerAddress: this.EmpFormGroup.value.empAddress,
    });
  }
  getAllDesignations() {
    this.service.getAllDesignations().subscribe({
      next: (res: any) => {
        this.designations = res.data;
      },
      error: (err) => console.log(err),
    });
  }
  getAllRoles() {
    this.service.getAllEmpRoles().subscribe((res: any) => {
      this.roles = res.data;
    });
  }
  createForm() {
    this.EmpFormGroup = this._formBuilder.group({
      empId: [0],
      roleId: [''],
      empName: [''],
      empEmailId: [''],
      empDesignationId: [''],
      empContactNo: [''],
      empAltContactNo: [''],
      empPersonalEmailId: [''],
      empExpTotalYear: [''],
      empExpTotalMonth: [''],
      empCity: [''],
      userName: [''],
      password: [''],
      empState: [''],
      empPinCode: [''],
      empAddress: [''],
      empPerCity: [''],
      empPerState: [''],
      empPerPinCode: [''],
      empPerAddress: [''],
      ErpEmployeeSkills: [null],
      ErmEmpExperiences: [null],
    });
    this.EmpSkillFormGroup = this._formBuilder.group({
      empId: [''],
      skill: [''],
      totalYearExp: [''],
      lastVersionUsed: [''],
    });
    this.EmpExperienceFormGroup = this._formBuilder.group({
      empId: [''],
      companyName: [''],
      startDate: [''],
      endDate: [''],
      designation: [''],
      projectsWorkedOn: [''],
    });
  }
  createEmployee() {
    // const forValues = [...this.EmpFormGroup.value];
    if (this.empId) {
      this.EmpFormGroup.controls['empId'].setValue(this.empId);
      debugger;
      this.service.UpdateEmployee(this.EmpFormGroup.value).subscribe({
        next: (res: any) => {
          alert("Employee Updated Successfully");
        },
        error: (err) => {
          alert(err.message);
        },
      });
    } else {
      this.service.createEmployee(this.EmpFormGroup.value).subscribe({
        next: (res: any) => {
          alert("Employee Updated Successfully");
        },
        error: (err) => {
          alert(err.message);
        },
      });
    }
  }
}
