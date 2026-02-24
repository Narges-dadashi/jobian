namespace api.DTOs;

public record EmployerRegisterDto(
    string Email,
    string UserName,
    string Gender,
    string Password,
    string ConfirmPassword
);