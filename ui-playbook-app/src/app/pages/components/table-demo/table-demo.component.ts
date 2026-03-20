import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule, Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ApiService, Product } from '../../../services/api.service';

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, InputTextModule, CardModule, ButtonModule, IconFieldModule, InputIconModule],
  template: `
    <div class="demo-page">
      <h2 class="page-title">Table Component</h2>
      <p class="page-desc">PrimeNG Table (p-table) with sorting, filtering, and pagination.</p>

      <p-card>
        <div class="table-header">
          <span class="table-title">Products</span>
          <p-iconfield>
            <p-inputicon styleClass="pi pi-search" />
            <input pInputText type="text" (input)="onGlobalFilter($event)" placeholder="Search..." />
          </p-iconfield>
        </div>

        <p-table
          #dt
          [value]="products"
          [rows]="10"
          [paginator]="true"
          [sortMode]="'multiple'"
          [globalFilterFields]="['name','code','category','status']"
          responsiveLayout="scroll"
          [rowsPerPageOptions]="[5, 10, 25]"
          styleClass="p-datatable-striped p-datatable-gridlines">
          <ng-template pTemplate="header">
            <tr>
              <th pSortableColumn="name">Name <p-sortIcon field="name"></p-sortIcon></th>
              <th pSortableColumn="code">Code <p-sortIcon field="code"></p-sortIcon></th>
              <th pSortableColumn="category">Category <p-sortIcon field="category"></p-sortIcon></th>
              <th pSortableColumn="price">Price <p-sortIcon field="price"></p-sortIcon></th>
              <th pSortableColumn="stock">Stock <p-sortIcon field="stock"></p-sortIcon></th>
              <th pSortableColumn="status">Status <p-sortIcon field="status"></p-sortIcon></th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-product>
            <tr>
              <td>{{ product.name }}</td>
              <td><code>{{ product.code }}</code></td>
              <td>{{ product.category }}</td>
              <td>{{ product.price | currency }}</td>
              <td>{{ product.stock }}</td>
              <td>
                <p-tag [value]="product.status" [severity]="getStatusSeverity(product.status)"></p-tag>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage">
            <tr><td colspan="6" style="text-align:center">No products found.</td></tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>
  `,
  styles: [`
    .demo-page { padding: 1rem; }
    .page-title { margin-bottom: 0.5rem; font-size: 1.75rem; font-weight: 600; }
    .page-desc { margin-bottom: 1.5rem; color: var(--p-text-muted-color, #6b7280); }
    .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .table-title { font-size: 1.125rem; font-weight: 600; }
  `]
})
export class TableDemoComponent implements OnInit {
  products: Product[] = [];

  @ViewChild('dt') dt!: Table;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getProducts().subscribe(p => this.products = p);
  }

  onGlobalFilter(event: Event): void {
    this.dt.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getStatusSeverity(status: string): 'success' | 'warn' | 'danger' | 'secondary' {
    const map: Record<string, 'success' | 'warn' | 'danger' | 'secondary'> = {
      'In Stock': 'success', 'Low Stock': 'warn', 'Out of Stock': 'danger'
    };
    return map[status] ?? 'secondary';
  }
}
