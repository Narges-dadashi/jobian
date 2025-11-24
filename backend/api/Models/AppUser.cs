namespace api.Models;

[CollectionName("users")]
public class AppUser : MongoIdentityUser<ObjectId>
{
    // Common
    [StringLength(16, MinimumLength = 8)]
    public string Password { get; init; } = string.Empty;
    public string City { get; init; } = string.Empty;
    public string Province { get; init; } = string.Empty;
    public List<Photo> Photos { get; init; } = [];

    // Job Seeker
    public string FirstName { get; init; } = string.Empty;
    [StringLength(30, MinimumLength = 3)]
    public string LastName { get; init; } = string.Empty;
    public string ResumeFileUrl { get; init; } = string.Empty;
    public string Bio { get; init; } = string.Empty;
    public List<string> Skills { get; init; } = [];
    public string EducationLevel { get; init; } = string.Empty;
    public int ExperienceYears { get; init; } = 0;

    // Employer
    [EmailAddress]
    public string CompanyEmail { get; init; } = string.Empty;
    [StringLength(30, MinimumLength = 3)]
    public string CompanyName { get; init; } = string.Empty;
    public string Industry { get; init; } = string.Empty;
    public string CompanyPhoneNumber { get; init; } = string.Empty;
    public string ContactPhoneNumber { get; init; } = string.Empty;
    public string? About { get; init; } = string.Empty;
    public string? LogoUrl { get; init; } = string.Empty;
    public string? ContactPersonName { get; init; } = string.Empty;
    public string? ContactPersonPosition { get; init; } = string.Empty;
    public DateTime RegisterDate { get; init; }
}

// Common
// public string? Id { get; init; }
// [StringLength(16, MinimumLength = 8)]
//     public string Password { get; init; } = string.Empty;

// JobSeeker
// [EmailAddress]
// public string Email { get; init; } = string.Empty;
// [StringLength(30, MinimumLength = 3)]
// // public string UserName { get; init; } = string.Empty;
// [StringLength(30, MinimumLength = 3)]
// public string PhoneNumber { get; init; } = string.Empty;