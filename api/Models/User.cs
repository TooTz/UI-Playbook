namespace Api.Models;

public record User(
    int Id,
    string FirstName,
    string LastName,
    string Email,
    string Role,
    string Department,
    string Status,
    DateTime CreatedAt,
    string? AvatarUrl
)
{
    public string FullName => $"{FirstName} {LastName}";
}
