namespace api.DTOs;

public record EmployerDetailsDto(
    string CompanyPhoneNumber,
    string LogoUrl,
    string City,
    string UserName
);