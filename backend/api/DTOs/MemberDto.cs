namespace api.DTOs;

public record MemberDto(
    string Email,
    string UserName,
    int Age,
    DateTime LastActive,
    string Gender,
    List<Photo> Photos
);