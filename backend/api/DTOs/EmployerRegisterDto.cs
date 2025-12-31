namespace api.DTOs;

public record EmployerRegisterDto(
    string Email,
    string UserName,
    string Password,
    string ConfirmPassword
);