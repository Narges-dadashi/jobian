namespace api.DTOs;

public record MemberDto(
    string UserName,
    int Age,
    List<Photo> Photos
);