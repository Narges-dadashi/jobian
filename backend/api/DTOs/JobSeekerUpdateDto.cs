namespace api.DTOs;

public record JobSeekerUpdateDto(
    string FirstName,
    string LastName,
    string PhoneNumber,
    string ResumeFileUrl,
    string Bio,
    List<string> Skills,
    string EducationLevel,
    int ExperienceYears,
    string Location,
    string Province
);