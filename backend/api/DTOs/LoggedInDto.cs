using System.Runtime.InteropServices;

namespace api.DTOs;

public record LoggedInDto(
    string Email,
    string UserName,
    string Token,
    [Optional] string? ProfilePhotoUrl
);