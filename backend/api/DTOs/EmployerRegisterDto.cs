namespace api.DTOs;

public record EmployerRegisterDto(
    string CompanyEmail,
    string CompanyName,
    string Gender,
    string Password,
    string ConfirmPassword
);