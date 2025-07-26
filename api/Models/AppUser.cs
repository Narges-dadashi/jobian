namespace api.Models;

public record AppUser (
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)]
    string? Id,
    [EmailAddress] string Email,
    [Length(3, 30)] string UserName,
    [Length(8, 16)] string Password,
    string ConfirmPassword,
    DateOnly DateOfBirth,
    string Gender,
    string Role
);