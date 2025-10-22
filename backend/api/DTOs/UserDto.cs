namespace api.DTOs;

public record UserDto(
    string Email,
    string UserName,
    int Age,
    DateTime LastActive,
    string Gender,
    List<Photo> Photos
);