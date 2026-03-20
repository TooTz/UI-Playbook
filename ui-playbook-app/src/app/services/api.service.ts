import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  department: string;
  status: string;
  createdAt: string;
}

export interface Product {
  id: number;
  name: string;
  code: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

export interface Order {
  id: number;
  customer: string;
  product: string;
  amount: number;
  status: string;
  date: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

const MOCK_USERS: User[] = [
  { id: 1, fullName: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', department: 'Engineering', status: 'Active', createdAt: '2024-01-15' },
  { id: 2, fullName: 'Bob Smith', email: 'bob@example.com', role: 'Developer', department: 'Engineering', status: 'Active', createdAt: '2024-02-01' },
  { id: 3, fullName: 'Carol White', email: 'carol@example.com', role: 'Designer', department: 'Design', status: 'Active', createdAt: '2024-02-14' },
  { id: 4, fullName: 'David Brown', email: 'david@example.com', role: 'Manager', department: 'Operations', status: 'Inactive', createdAt: '2024-03-01' },
  { id: 5, fullName: 'Eve Davis', email: 'eve@example.com', role: 'Developer', department: 'Engineering', status: 'Active', createdAt: '2024-03-10' },
  { id: 6, fullName: 'Frank Miller', email: 'frank@example.com', role: 'QA', department: 'Quality', status: 'Active', createdAt: '2024-03-20' },
  { id: 7, fullName: 'Grace Wilson', email: 'grace@example.com', role: 'DevOps', department: 'Infrastructure', status: 'Active', createdAt: '2024-04-05' },
  { id: 8, fullName: 'Henry Moore', email: 'henry@example.com', role: 'Developer', department: 'Engineering', status: 'Inactive', createdAt: '2024-04-15' },
];

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Laptop Pro', code: 'LP-001', category: 'Electronics', price: 1299.99, stock: 45, status: 'In Stock' },
  { id: 2, name: 'Wireless Mouse', code: 'WM-002', category: 'Accessories', price: 29.99, stock: 120, status: 'In Stock' },
  { id: 3, name: 'USB-C Hub', code: 'UH-003', category: 'Accessories', price: 49.99, stock: 0, status: 'Out of Stock' },
  { id: 4, name: 'Monitor 4K', code: 'MN-004', category: 'Electronics', price: 599.99, stock: 18, status: 'In Stock' },
  { id: 5, name: 'Keyboard Mech', code: 'KB-005', category: 'Accessories', price: 89.99, stock: 3, status: 'Low Stock' },
  { id: 6, name: 'Webcam HD', code: 'WC-006', category: 'Electronics', price: 79.99, stock: 62, status: 'In Stock' },
  { id: 7, name: 'Desk Lamp', code: 'DL-007', category: 'Office', price: 39.99, stock: 0, status: 'Out of Stock' },
  { id: 8, name: 'Chair Ergonomic', code: 'CE-008', category: 'Furniture', price: 349.99, stock: 12, status: 'In Stock' },
];

const MOCK_ORDERS: Order[] = [
  { id: 1001, customer: 'Alice Johnson', product: 'Laptop Pro', amount: 1299.99, status: 'Delivered', date: '2024-04-01' },
  { id: 1002, customer: 'Bob Smith', product: 'Wireless Mouse', amount: 29.99, status: 'Processing', date: '2024-04-05' },
  { id: 1003, customer: 'Carol White', product: 'Monitor 4K', amount: 599.99, status: 'Shipped', date: '2024-04-08' },
  { id: 1004, customer: 'David Brown', product: 'Keyboard Mech', amount: 89.99, status: 'Pending', date: '2024-04-10' },
  { id: 1005, customer: 'Eve Davis', product: 'Webcam HD', amount: 79.99, status: 'Delivered', date: '2024-04-12' },
];

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = 'http://localhost:5033/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
      catchError(() => of(MOCK_USERS))
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`).pipe(
      catchError(() => of(MOCK_PRODUCTS))
    );
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders`).pipe(
      catchError(() => of(MOCK_ORDERS))
    );
  }

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.baseUrl}/dashboard/stats`).pipe(
      catchError(() => of({ totalUsers: 128, totalProducts: 340, totalOrders: 1024, totalRevenue: 84320 }))
    );
  }
}
