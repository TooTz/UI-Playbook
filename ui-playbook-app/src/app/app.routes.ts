import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'components/button',
    loadComponent: () => import('./pages/components/button-demo/button-demo.component').then(m => m.ButtonDemoComponent)
  },
  {
    path: 'components/table',
    loadComponent: () => import('./pages/components/table-demo/table-demo.component').then(m => m.TableDemoComponent)
  },
  {
    path: 'components/form',
    loadComponent: () => import('./pages/components/form-demo/form-demo.component').then(m => m.FormDemoComponent)
  },
  {
    path: 'components/dialog',
    loadComponent: () => import('./pages/components/dialog-demo/dialog-demo.component').then(m => m.DialogDemoComponent)
  },
  {
    path: 'components/chart',
    loadComponent: () => import('./pages/components/chart-demo/chart-demo.component').then(m => m.ChartDemoComponent)
  },
  {
    path: 'components/menu',
    loadComponent: () => import('./pages/components/menu-demo/menu-demo.component').then(m => m.MenuDemoComponent)
  },
  {
    path: 'components/messages',
    loadComponent: () => import('./pages/components/messages-demo/messages-demo.component').then(m => m.MessagesDemoComponent)
  },
  {
    path: 'ag-grid',
    loadComponent: () => import('./pages/ag-grid/ag-grid-demo.component').then(m => m.AgGridDemoComponent)
  },
];

