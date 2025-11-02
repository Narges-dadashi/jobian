namespace api.DTOs;

public record MemberDto(
    string Email,
    string UserName,
    int Age,
    List<Photo> Photos
);