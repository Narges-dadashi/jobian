using System.Runtime.InteropServices;

namespace api.DTOs;

public class LoggedInDto
{
    public string? Email { get; init; }
    public string? CompanyEmail { get; init; }
    public string? UserName { get; init; }
    public string? CompanyName { get; init; }
    public string? ProfilePhotoUrl { get; init; }
    public string? Token { get; init; }
}