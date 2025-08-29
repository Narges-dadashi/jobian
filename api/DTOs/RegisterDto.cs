namespace api.DTOs;

public record RegisterDto(
    string Email,
    DateOnly DateOfBirth,
    string Password,
    string ConfirmPassword
);