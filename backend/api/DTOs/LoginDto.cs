using System.Runtime.InteropServices;

namespace api.DTOs;

public record LoginDto(
    [EmailAddress, Optional]
    string? Email,
    [EmailAddress, Optional]
    string? CompanyEmail,
    string Password
);