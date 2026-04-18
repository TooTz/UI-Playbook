namespace Api.Models;

public record Product(
    int Id,
    string Name,
    string Code,
    string Category,
    string Description,
    decimal Price,
    int Stock,
    string Status,
    double Rating,
    string? ImageUrl,
    DateTime LastUpdated
);
