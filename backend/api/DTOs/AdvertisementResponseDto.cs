namespace api.DTOs;

public record AdvertisementResponseDto(
    string CreatorUserName,
    string CompanyEmail,
    string JobTitle,
    string? ShortDescription,
    string Details,
    string Category,
    Gender Gender,
    MilitaryStatus MilitaryServiceRequired,
    bool IsUrgent,
    string Location,
    string LogoUrl,
    bool IsRemote,
    EmploymentType EmploymentType,
    ExperienceLevel? ExperienceLevel,
    EducationLevel EducationLevel,
    decimal? MinSalary,
    decimal? MaxSalary,
    List<string>? Skills,
    List<string>? Benefits,
    DateTime? ExpiryDate,
    DateTime CreatedAt,
    JobStatus Status
);