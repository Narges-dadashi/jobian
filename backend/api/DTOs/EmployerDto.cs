namespace api.DTOs;

public record EmployerDto(
    string CompanyName,
    string Industry,
    string CompanyPhoneNumber,
    string ContactPhoneNumber,
    string About,
    string LogoUrl,
    string ContactPersonName,
    string ContactPersonPosition,
    string Location,
    string Province,
    List<Photo> Photos
);