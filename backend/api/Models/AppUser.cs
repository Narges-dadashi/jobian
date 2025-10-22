namespace api.Models;

public class AppUser
{
    [BsonId, BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; init; }

    [EmailAddress]
    public required string Email { get; init; }

    [StringLength(30, MinimumLength = 3)]
    public required string UserName { get; init; }

    [StringLength(16, MinimumLength = 8)]
    public required string Password { get; init; }

    [Compare(nameof(Password))]
    public required string ConfirmPassword { get; init; }

    [Range(typeof(DateOnly), "1900-01-01", "2050-01-01",
        ErrorMessage = "Date of birth must be between 1900 and 2050.")]
    public required DateOnly DateOfBirth { get; init; }

    public DateTime LastActive { get; init; }

    public required string Gender { get; init; }

    public required string Role { get; init; }

    public required string City { get; init; }

    public List<Photo> Photos { get; init; } = new();
}





// namespace api.Models;

// public record AppUser(
//     [property: BsonId, BsonRepresentation(BsonType.ObjectId)]
//     string? Id,
//     [EmailAddress] string Email,
//     [Length(3, 30)] string UserName,
//     [Length(8, 16)] string Password,
//     string ConfirmPassword,
//     [Range(typeof(DateOnly), "1900-01-01", "2050-01-01", ErrorMessage = "Date of birth must be between 1900 and 2050.")]
//     DateOnly DateOfBirth,
//     DateTime LastActive,
//     string Gender,
//     string Role,
//     string City,
//     List<Photo> Photos
// );