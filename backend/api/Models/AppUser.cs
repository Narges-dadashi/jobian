namespace api.Models;

public class AppUser
{
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; init; }
    [EmailAddress]
    public string Email { get; init; } = string.Empty;
    [StringLength(30, MinimumLength = 3)]
    public string UserName { get; init; } = string.Empty;
    [StringLength(16, MinimumLength = 8)]
    public string Password { get; init; } = string.Empty;
    [Range(typeof(DateOnly), "1900-01-01", "2050-01-01",
        ErrorMessage = "Date of birth must be between 1900 and 2050.")]
    public DateOnly DateOfBirth { get; init; }
    public string City { get; init; } = string.Empty;
    // ?
    public string CompanyName { get; init; } = string.Empty;
    [StringLength(30, MinimumLength = 8)]

    public List<Photo> Photos { get; init; } = [];
}