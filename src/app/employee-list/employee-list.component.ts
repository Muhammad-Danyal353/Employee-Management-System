import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

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
  imports: [MatTableModule],
})
export class EmployeeListComponent implements OnInit {
  baseUrl: string = 'https://freeapi.gerasim.in/api/EmployeeApp/';
  dataSource = new MatTableDataSource<IEmployeeList>();
  displayedColumns = [
    'empName',
    'empDesignation',
    'role',
    'empEmailId',
    'mobile',
  ];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getAllEmp();
  }

  getAllEmp() {
    this.http.get(`${this.baseUrl}GetAllEmployee`).subscribe((res: any) => {
      this.dataSource.data = res.data;
      this.dataSource.sort = this.dataSource.sort;
    });
  }
}
