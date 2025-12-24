namespace api.DTOs;

public record EmployerDetailsDto(
    string CompanyName,
    string CompanyEmail,
    string CompanyPhoneNumber,
    string LogoUrl,
    string Location
);