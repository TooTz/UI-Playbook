import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-chart-demo',
  standalone: true,
  imports: [CommonModule, CardModule, ChartModule, DividerModule],
  template: `
    <div class="demo-page">
      <h2 class="page-title">Chart Component</h2>
      <p class="page-desc">PrimeNG Chart component powered by Chart.js — bar, line, pie charts.</p>

      <div class="chart-grid">
        <p-card header="Orders by Status (Bar Chart)">
          <p-chart type="bar" [data]="barData" [options]="barOptions" height="300px"></p-chart>
        </p-card>

        <p-card header="Revenue Over Months (Line Chart)">
          <p-chart type="line" [data]="lineData" [options]="lineOptions" height="300px"></p-chart>
        </p-card>

        <p-card header="Orders by Category (Pie Chart)">
          <p-chart type="pie" [data]="pieData" [options]="pieOptions" height="300px"></p-chart>
        </p-card>

        <p-card header="Monthly Sales (Doughnut)">
          <p-chart type="doughnut" [data]="doughnutData" [options]="doughnutOptions" height="300px"></p-chart>
        </p-card>
      </div>
    </div>
  `,
  styles: [`
    .demo-page { padding: 1rem; }
    .page-title { margin-bottom: 0.5rem; font-size: 1.75rem; font-weight: 600; }
    .page-desc { margin-bottom: 1.5rem; color: var(--p-text-muted-color, #6b7280); }
    .chart-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1rem; }
    :host ::ng-deep .p-card { margin-bottom: 0; }
  `]
})
export class ChartDemoComponent {
  barData = {
    labels: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    datasets: [{
      label: 'Orders',
      data: [42, 78, 120, 450, 25],
      backgroundColor: ['#f59e0b', '#3b82f6', '#8b5cf6', '#10b981', '#ef4444'],
      borderColor: ['#d97706', '#2563eb', '#7c3aed', '#059669', '#dc2626'],
      borderWidth: 1
    }]
  };

  barOptions = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } }
  };

  lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue 2024',
        data: [6500, 7200, 8100, 7800, 9200, 10500, 11200, 9800, 10100, 11500, 12000, 13500],
        fill: false,
        borderColor: '#6366f1',
        backgroundColor: '#6366f180',
        tension: 0.4
      },
      {
        label: 'Revenue 2023',
        data: [5000, 5800, 6200, 6800, 7500, 8200, 8900, 8100, 8500, 9200, 9800, 10500],
        fill: false,
        borderColor: '#10b981',
        backgroundColor: '#10b98180',
        tension: 0.4
      }
    ]
  };

  lineOptions = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } }
  };

  pieData = {
    labels: ['Electronics', 'Accessories', 'Office', 'Furniture'],
    datasets: [{
      data: [35, 28, 18, 19],
      backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ef4444'],
    }]
  };

  pieOptions = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } }
  };

  doughnutData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      data: [21800, 27500, 31100, 37000],
      backgroundColor: ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981'],
    }]
  };

  doughnutOptions = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } }
  };
}
