import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  ClientSideRowModelModule,
  ModuleRegistry,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  ColumnAutoSizeModule,
  ValidationModule,
  themeQuartz
} from 'ag-grid-community';
import { ApiService, User } from '../../services/api.service';
import { CardModule } from 'primeng/card';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  ColumnAutoSizeModule,
  ValidationModule
]);

@Component({
  selector: 'app-ag-grid-demo',
  standalone: true,
  imports: [CommonModule, AgGridAngular, CardModule],
  template: `
    <div class="demo-page">
      <h2 class="page-title">AG Grid</h2>
      <p class="page-desc">AG Grid Community with sorting, filtering, pagination and column resizing.</p>

      <p-card>
        <ag-grid-angular
          [rowData]="users"
          [columnDefs]="columnDefs"
          [defaultColDef]="defaultColDef"
          [pagination]="true"
          [paginationPageSize]="10"
          [paginationPageSizeSelector]="[5, 10, 25, 50]"
          [theme]="theme"
          style="width: 100%; height: 500px;">
        </ag-grid-angular>
      </p-card>
    </div>
  `,
  styles: [`
    .demo-page { padding: 1rem; }
    .page-title { margin-bottom: 0.5rem; font-size: 1.75rem; font-weight: 600; }
    .page-desc { margin-bottom: 1.5rem; color: var(--p-text-muted-color, #6b7280); }
  `]
})
export class AgGridDemoComponent implements OnInit {
  users: User[] = [];
  theme = themeQuartz;

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', width: 80, filter: 'agNumberColumnFilter', sortable: true, resizable: true },
    { field: 'fullName', headerName: 'Full Name', flex: 1, filter: 'agTextColumnFilter', sortable: true, resizable: true },
    { field: 'email', headerName: 'Email', flex: 1, filter: 'agTextColumnFilter', sortable: true, resizable: true },
    { field: 'role', headerName: 'Role', width: 130, filter: 'agTextColumnFilter', sortable: true, resizable: true },
    { field: 'department', headerName: 'Department', flex: 1, filter: 'agTextColumnFilter', sortable: true, resizable: true },
    {
      field: 'status', headerName: 'Status', width: 120, sortable: true, resizable: true,
      cellStyle: (params) => ({
        color: params.value === 'Active' ? '#10b981' : '#ef4444',
        fontWeight: '600'
      })
    },
    { field: 'createdAt', headerName: 'Created At', width: 140, filter: 'agDateColumnFilter', sortable: true, resizable: true },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getUsers().subscribe(u => this.users = u);
  }
}
