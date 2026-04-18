import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ApiService, DashboardStats, Order } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, TagModule],
  template: `
    <div class="dashboard">
      <h2 class="page-title">Dashboard</h2>

      <div class="stat-cards">
        <p-card styleClass="stat-card">
          <div class="stat-content">
            <span class="stat-icon pi pi-users"></span>
            <div class="stat-info">
              <span class="stat-label">Total Users</span>
              <span class="stat-value">{{ stats?.totalUsers | number }}</span>
            </div>
          </div>
        </p-card>
        <p-card styleClass="stat-card">
          <div class="stat-content">
            <span class="stat-icon pi pi-box"></span>
            <div class="stat-info">
              <span class="stat-label">Total Products</span>
              <span class="stat-value">{{ stats?.totalProducts | number }}</span>
            </div>
          </div>
        </p-card>
        <p-card styleClass="stat-card">
          <div class="stat-content">
            <span class="stat-icon pi pi-shopping-cart"></span>
            <div class="stat-info">
              <span class="stat-label">Total Orders</span>
              <span class="stat-value">{{ stats?.totalOrders | number }}</span>
            </div>
          </div>
        </p-card>
        <p-card styleClass="stat-card">
          <div class="stat-content">
            <span class="stat-icon pi pi-dollar"></span>
            <div class="stat-info">
              <span class="stat-label">Revenue</span>
              <span class="stat-value">{{ stats?.totalRevenue | currency }}</span>
            </div>
          </div>
        </p-card>
      </div>

      <p-card header="Recent Orders" styleClass="mt-4">
        <p-table [value]="orders" [rows]="5" [paginator]="true" responsiveLayout="scroll">
          <ng-template pTemplate="header">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-order>
            <tr>
              <td>#{{ order.id }}</td>
              <td>{{ order.customer }}</td>
              <td>{{ order.product }}</td>
              <td>{{ order.amount | currency }}</td>
              <td>
                <p-tag [value]="order.status" [severity]="getOrderSeverity(order.status)"></p-tag>
              </td>
              <td>{{ order.date }}</td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>
  `,
  styles: [`
    .dashboard { padding: 1rem; }
    .page-title { margin-bottom: 1.5rem; font-size: 1.75rem; font-weight: 600; }
    .stat-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
    .stat-content { display: flex; align-items: center; gap: 1rem; }
    .stat-icon { font-size: 2rem; color: var(--p-primary-color, #6366f1); }
    .stat-info { display: flex; flex-direction: column; }
    .stat-label { font-size: 0.875rem; color: var(--p-text-muted-color, #6b7280); }
    .stat-value { font-size: 1.5rem; font-weight: 700; }
    .mt-4 { margin-top: 1.5rem; }
  `]
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  orders: Order[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getDashboardStats().subscribe(s => this.stats = s);
    this.api.getOrders().subscribe(o => this.orders = o);
  }

  getOrderSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    const map: Record<string, 'success' | 'info' | 'warn' | 'danger' | 'secondary'> = {
      Delivered: 'success', Shipped: 'info', Processing: 'warn', Pending: 'secondary', Cancelled: 'danger'
    };
    return map[status] ?? 'secondary';
  }
}
