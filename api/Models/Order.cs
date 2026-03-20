namespace Api.Models;

public record Order(
    int Id,
    string OrderNumber,
    int CustomerId,
    string CustomerName,
    DateTime OrderDate,
    string Status,
    decimal TotalAmount,
    List<OrderItem> Items,
    string ShippingAddress
);

public record OrderItem(
    int ProductId,
    string ProductName,
    int Quantity,
    decimal UnitPrice
)
{
    public decimal Total => Quantity * UnitPrice;
}
