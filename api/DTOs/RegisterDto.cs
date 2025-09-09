namespace api.DTOs;

public record RegisterDto(
    string Email,
    string UserName,
    DateOnly DateOfBirth,
    string Password,
    string ConfirmPassword
);