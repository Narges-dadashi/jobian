namespace api.DTOs;

public record JobSeekerRegisterDto(
    string Email,
    string UserName,
    string Gender,
    string Password,
    string ConfirmPassword
);