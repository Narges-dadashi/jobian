namespace api.DTOs;

public record EmployerUpdateDto(
    string Industry,
    string CompanyPhoneNumber,
    string ContactPhoneNumber,
    string About,
    string LogoUrl,
    string ContactPersonName,
    string ContactPersonPosition,
    string City,
    string Province
    // DateTime RegisterDate
);