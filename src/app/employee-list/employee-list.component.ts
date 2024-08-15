import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  numberAttribute,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MainSerivce } from '../main.service';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

export interface IEmployeeList {
  empName: string;
  empId: number;
  empCode: string;
  empEmailId: string;
  empDesignation: string;
  role: string;
  mobile: number;
}

export interface ISearchList {
  data: IEmployeeList[];
  message: string;
  result: boolean;
}

@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
  imports: [
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatProgressSpinnerModule,
    CommonModule,
    MatMenuModule,
    MatSelectModule,
  ],
})
export class EmployeeListComponent implements OnInit {
  baseUrl: string = 'https://freeapi.gerasim.in/api/EmployeeApp/';
  dataSource = new MatTableDataSource<IEmployeeList>();
  isloading: boolean = false;
  displayedColumns = [
    'empName',
    'empDesignation',
    'role',
    'empEmailId',
    'mobile',
    'actions',
  ];
  form: FormGroup = new FormGroup({ search: new FormControl() });
  @ViewChild('inputSearch', { static: true }) inputfiled!: ElementRef;
  constructor(private http: HttpClient, private service: MainSerivce) {}
  ngOnInit(): void {
    this.getAllEmp();
    this.filterValue();
  }
  filterValue() {
    fromEvent<any>(this.inputfiled.nativeElement, 'input')
      .pipe(
        map((e: any) => e.target.value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe({
        next: (filterValue: string) => {
          this.dataSource.filter = filterValue
        },
      });
  }

  getAllEmp() {
    this.isloading = true;
    this.http.get(`${this.baseUrl}GetAllEmployee`).subscribe((res: any) => {
      this.isloading = false;
      this.dataSource.data = res.data;
      this.dataSource.sort = this.dataSource.sort;
    });
  }
  deleteEmployee(id: number) {
    this.isloading = true;
    this.service.DeleteEmployeeByEmpId(id).subscribe((res: any) => {
      this.isloading = false;
      this.getAllEmp();
    });
  }
}
