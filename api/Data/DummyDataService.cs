using Api.Models;

namespace Api.Data;

public static class DummyDataService
{
    private static readonly string[] FirstNames =
    [
        "Anna", "Ben", "Clara", "David", "Eva", "Felix", "Greta", "Hans",
        "Iris", "Jonas", "Katharina", "Lars", "Maria", "Niklas", "Olivia",
        "Paul", "Quinta", "Robert", "Sara", "Thomas"
    ];

    private static readonly string[] LastNames =
    [
        "Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner",
        "Becker", "Schulz", "Hoffmann", "Schäfer", "Koch", "Bauer", "Richter",
        "Klein", "Wolf", "Schröder", "Neumann", "Schwarz", "Zimmermann"
    ];

    private static readonly string[] Departments =
    [
        "IT", "Finance", "HR", "Marketing", "Sales", "Operations", "R&D", "Legal"
    ];

    private static readonly string[] Roles =
    [
        "Administrator", "Developer", "Analyst", "Manager", "Designer",
        "Consultant", "Support", "Architect"
    ];

    private static readonly string[] UserStatuses = ["Active", "Inactive", "Pending"];

    private static readonly string[] ProductCategories =
    [
        "Electronics", "Software", "Hardware", "Services", "Accessories",
        "Office Supplies", "Networking", "Security"
    ];

    private static readonly string[] OrderStatuses =
    [
        "Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"
    ];

    private static string ToEmailPart(string name) =>
        name.ToLower()
            .Replace("ü", "ue")
            .Replace("ä", "ae")
            .Replace("ö", "oe")
            .Replace("ß", "ss");

    public static List<User> GetUsers()
    {
        var users = new List<User>();
        var rand = new Random(42);

        for (int i = 1; i <= 50; i++)
        {
            var firstName = FirstNames[(i - 1) % FirstNames.Length];
            var lastName = LastNames[(i - 1) % LastNames.Length];
            var email = $"{ToEmailPart(firstName)}.{ToEmailPart(lastName)}@example.com";

            users.Add(new User(
                Id: i,
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Role: Roles[rand.Next(Roles.Length)],
                Department: Departments[rand.Next(Departments.Length)],
                Status: UserStatuses[rand.Next(UserStatuses.Length)],
                CreatedAt: DateTime.Now.AddDays(-rand.Next(1, 1000)),
                AvatarUrl: $"https://i.pravatar.cc/150?img={i}"
            ));
        }

        return users;
    }

    public static List<Product> GetProducts()
    {
        var products = new List<Product>();
        var rand = new Random(42);

        var productNames = new[]
        {
            "Laptop Pro 15", "Wireless Mouse", "Mechanical Keyboard", "4K Monitor",
            "USB-C Hub", "Webcam HD", "Noise-Cancelling Headset", "Standing Desk",
            "Ergonomic Chair", "SSD 1TB", "RAM 32GB", "Graphics Card RTX",
            "Network Switch 24-Port", "Firewall Appliance", "VoIP Phone",
            "Label Printer", "Document Scanner", "UPS 1500VA", "Patch Panel",
            "KVM Switch", "Server Rack", "Docking Station", "Trackpad",
            "Conference Speakerphone", "Digital Whiteboard"
        };

        for (int i = 1; i <= productNames.Length; i++)
        {
            var category = ProductCategories[rand.Next(ProductCategories.Length)];
            var price = Math.Round((decimal)(rand.Next(10, 2000) + rand.NextDouble()), 2);

            products.Add(new Product(
                Id: i,
                Name: productNames[i - 1],
                Code: $"PRD-{i:D4}",
                Category: category,
                Description: $"High-quality {productNames[i - 1]} for professional use.",
                Price: price,
                Stock: rand.Next(0, 500),
                Status: rand.Next(0, 10) > 1 ? "In Stock" : "Out of Stock",
                Rating: Math.Round(3.0 + rand.NextDouble() * 2.0, 1),
                ImageUrl: null,
                LastUpdated: DateTime.Now.AddDays(-rand.Next(0, 180))
            ));
        }

        return products;
    }

    public static List<Order> GetOrders()
    {
        var orders = new List<Order>();
        var users = GetUsers();
        var products = GetProducts();
        var rand = new Random(42);

        for (int i = 1; i <= 100; i++)
        {
            var customer = users[rand.Next(users.Count)];
            var itemCount = rand.Next(1, 5);
            var items = new List<OrderItem>();

            for (int j = 0; j < itemCount; j++)
            {
                var product = products[rand.Next(products.Count)];
                var quantity = rand.Next(1, 10);
                items.Add(new OrderItem(
                    ProductId: product.Id,
                    ProductName: product.Name,
                    Quantity: quantity,
                    UnitPrice: product.Price
                ));
            }

            orders.Add(new Order(
                Id: i,
                OrderNumber: $"ORD-{DateTime.Now.Year}-{i:D5}",
                CustomerId: customer.Id,
                CustomerName: customer.FullName,
                OrderDate: DateTime.Now.AddDays(-rand.Next(0, 365)),
                Status: OrderStatuses[rand.Next(OrderStatuses.Length)],
                TotalAmount: items.Sum(x => x.Total),
                Items: items,
                ShippingAddress: $"{rand.Next(1, 999)} Main Street, City {rand.Next(1, 50)}, Germany"
            ));
        }

        return orders;
    }
}
