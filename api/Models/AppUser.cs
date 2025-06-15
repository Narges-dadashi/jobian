namespace api.Models;

public record AppUser (
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)]
    string? Id,
    [EmailAddress] string Email,
    [Length(3, 30)] string Name,
    [Length(8, 16)] string Password,
    string ConfirmPassword,
    [Range(18, 50)] int Age,
    [Length(3, 30)] string City,
    [Length(3, 30)] string Country
);