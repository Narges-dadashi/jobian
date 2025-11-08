using System.Runtime.InteropServices;

namespace api.DTOs;

public record LoggedInDto(
    [Optional]
    string Email,
    [Optional]
    string CompanyEmail,
    [Optional]
    string UserName,
    [Optional]
    string CompanyName,
    string Token,
    [Optional] string? ProfilePhotoUrl
);