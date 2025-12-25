namespace api.DTOs;

public record AdvertisementResponseDto(
    string Title,
    string? ShortDescription,
    string Details,
    string CreatorUserName,
    string CompanyEmail,
    string Location,
    bool IsRemote,
    EmploymentType EmploymentType,
    ExperienceLevel? ExperienceLevel,
    string EducationLevel,
    decimal? SalaryFrom,
    decimal? SalaryTo,
    List<string>? Skills,
    List<string>? Benefits,
    DateTime? ExpiryDate,
    JobStatus Status
);