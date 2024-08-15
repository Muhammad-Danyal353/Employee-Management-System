import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

export const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
  },
  {
    path: 'form',
    component: EmployeeFormComponent,
  },
  {
    path: 'form/:id',
    component: EmployeeFormComponent,
  },
];
