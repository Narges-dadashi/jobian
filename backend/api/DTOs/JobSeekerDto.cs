namespace api.DTOs;

public record JobSeekerDto(
    string Email,
    string UserName,
    string FirstName,
    string LastName,
    string PhoneNumber,
    string ResumeFileUrl,
    string Bio,
    List<string> Skills,
    string EducationLevel,
    int ExperienceYears,
    string Location,
    string Province,
    List<Photo> Photos
);