using System.Runtime.InteropServices;

namespace api.DTOs;

public record MemberDto(
    [Optional]
    string Email,
    [Optional]
    string CompanyEmail,
    [Optional]
    string UserName,
    [Optional]
    string CompanyName,
    List<Photo> Photos
);