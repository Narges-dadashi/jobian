namespace api.DTOs;

public record MemberDto(
    string Email,
    string UserName,
    List<Photo> Photos
);