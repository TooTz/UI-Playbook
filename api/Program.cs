using Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "http://localhost:4201")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowAngular");

// Users endpoints
app.MapGet("/api/users", () => DummyDataService.GetUsers())
   .WithName("GetUsers")
   .WithTags("Users");

app.MapGet("/api/users/{id}", (int id) =>
{
    var user = DummyDataService.GetUsers().FirstOrDefault(u => u.Id == id);
    return user is not null ? Results.Ok(user) : Results.NotFound();
})
.WithName("GetUser")
.WithTags("Users");

// Products endpoints
app.MapGet("/api/products", () => DummyDataService.GetProducts())
   .WithName("GetProducts")
   .WithTags("Products");

app.MapGet("/api/products/{id}", (int id) =>
{
    var product = DummyDataService.GetProducts().FirstOrDefault(p => p.Id == id);
    return product is not null ? Results.Ok(product) : Results.NotFound();
})
.WithName("GetProduct")
.WithTags("Products");

// Orders endpoints
app.MapGet("/api/orders", () => DummyDataService.GetOrders())
   .WithName("GetOrders")
   .WithTags("Orders");

app.MapGet("/api/orders/{id}", (int id) =>
{
    var order = DummyDataService.GetOrders().FirstOrDefault(o => o.Id == id);
    return order is not null ? Results.Ok(order) : Results.NotFound();
})
.WithName("GetOrder")
.WithTags("Orders");

// Dashboard stats endpoint
app.MapGet("/api/dashboard/stats", () =>
{
    var users = DummyDataService.GetUsers();
    var products = DummyDataService.GetProducts();
    var orders = DummyDataService.GetOrders();

    return Results.Ok(new
    {
        TotalUsers = users.Count,
        ActiveUsers = users.Count(u => u.Status == "Active"),
        TotalProducts = products.Count,
        InStockProducts = products.Count(p => p.Status == "In Stock"),
        TotalOrders = orders.Count,
        PendingOrders = orders.Count(o => o.Status == "Pending"),
        TotalRevenue = orders.Sum(o => o.TotalAmount),
        RecentOrders = orders.OrderByDescending(o => o.OrderDate).Take(5).ToList()
    });
})
.WithName("GetDashboardStats")
.WithTags("Dashboard");

app.Run();
