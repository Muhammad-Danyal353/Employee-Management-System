import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainSerivce {
  baseUrl: string = 'https://freeapi.gerasim.in/api/EmployeeApp/';
  constructor(private http: HttpClient) {}
  createEmployee(body: any) {
    return this.http.post(`${this.baseUrl}CreateNewEmployee`, body);
  }
  getEmployeeList() {
    return this.http.get(`${this.baseUrl}GetAllEmployee/`);
  }
  getAllDesignations() {
    return this.http.get(`${this.baseUrl}GetAllDesignation/`);
  } 
  getAllEmpRoles() {
    return this.http.get(`${this.baseUrl}GetAllRoles/`);
  }
  GetEmployeeByEmployeeId(id: number) {
    return this.http.get(`${this.baseUrl}GetEmployeeByEmployeeId?id=` + id);
  }
  UpdateEmployee(body: any) {
    return this.http.put(`${this.baseUrl}UpdateEmployee`, body);
  }
  DeleteEmployeeByEmpId(id: number) {
    return this.http.delete(`${this.baseUrl}DeleteEmployeeByEmpId?empId=` + id);
  }
} 
