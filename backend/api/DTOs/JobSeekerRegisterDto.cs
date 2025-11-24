namespace api.DTOs;

public record JobSeekerRegisterDto(
    string Email,
    string UserName,
    string Password,
    string ConfirmPassword
);