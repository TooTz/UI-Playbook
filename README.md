# UI Playbook

A developer UI Playbook built with **Angular 19** and **PrimeNG 19**, backed by a **.NET 10 API**.  
The goal is to give developers a consistent reference for how UI components should be used in the system.

## Project Structure

```
UI-Playbook/
├── api/                   # .NET 10 Web API (dummy data endpoints)
│   ├── Models/            # Data models (User, Product, Order)
│   ├── Data/              # DummyDataService
│   └── Program.cs         # API endpoints (users, products, orders, dashboard)
└── ui-playbook-app/       # Angular 19 frontend
    └── src/app/
        ├── pages/
        │   ├── dashboard/          # Dashboard with stats & recent orders
        │   ├── components/
        │   │   ├── button-demo/    # PrimeNG Button showcase
        │   │   ├── table-demo/     # PrimeNG Table with sort/filter/pagination
        │   │   ├── form-demo/      # PrimeNG form inputs showcase
        │   │   ├── dialog-demo/    # PrimeNG Dialog, ConfirmDialog, Toast
        │   │   ├── chart-demo/     # PrimeNG Chart (bar, line, pie, doughnut)
        │   │   ├── menu-demo/      # PrimeNG Menu, TieredMenu, Breadcrumb, Tabs
        │   │   └── messages-demo/  # PrimeNG Messages, Toast
        │   └── ag-grid/            # AG Grid Community showcase
        └── services/
            ├── api.service.ts      # HTTP client for .NET API
            └── theme.service.ts    # Runtime theme switching
```

## Features

- **PrimeNG Components**: Button, DataTable, Form inputs, Dialog, Charts, Menu, Messages
- **AG Grid**: Full-featured grid with sorting, filtering, pagination, and column resizing
- **Theme Switching**: Switch between Aura, Material, and Lara themes at runtime
- **Dummy Data API**: .NET 10 API provides realistic dummy data (users, products, orders)
- **Responsive Layout**: Sidebar navigation + main content area

## Getting Started

### Prerequisites

- Node.js 18+
- .NET 10 SDK
- Angular CLI (`npm install -g @angular/cli`)

### Run the API

```bash
cd api
dotnet run
# API runs on http://localhost:5033
```

### Run the Angular App

```bash
cd ui-playbook-app
npm install
ng serve
# App runs on http://localhost:4200
```

## API Endpoints

| Method | Endpoint                  | Description            |
|--------|---------------------------|------------------------|
| GET    | `/api/users`              | List all users (50)    |
| GET    | `/api/users/{id}`         | Get user by ID         |
| GET    | `/api/products`           | List all products (25) |
| GET    | `/api/products/{id}`      | Get product by ID      |
| GET    | `/api/orders`             | List all orders (100)  |
| GET    | `/api/orders/{id}`        | Get order by ID        |
| GET    | `/api/dashboard/stats`    | Dashboard statistics   |

## Technology Stack

| Layer    | Technology              | Version |
|----------|------------------------|---------|
| Frontend | Angular                | 19      |
| UI       | PrimeNG                | 19      |
| Grid     | AG Grid Community      | 35      |
| Backend  | ASP.NET Core           | .NET 10 |
| Themes   | @primeng/themes (Aura, Material, Lara) | 21 |
