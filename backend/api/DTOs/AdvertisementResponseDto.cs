namespace api.DTOs;

public record AdvertisementResponseDto(
    string Title,
    string? ShortDescription,
    string Details,
    string Location,
    bool IsRemote,
    EmploymentType EmploymentType,
    ExperienceLevel? ExperienceLevel,
    string EducationLevel,
    decimal? SalaryFrom,
    decimal? SalaryTo,
    List<string>? Skills,
    List<string>? Benefits,
    DateTime? PublishStart,
    DateTime? ExpiryDate,
    JobStatus Status
);