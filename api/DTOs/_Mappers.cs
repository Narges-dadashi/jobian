namespace api.DTOs;

public static class Mappers
{
    public static LoggedInDto ConvertAppUserToLoggedInDto(AppUser appUser)
    {
        return new(
            Email: appUser.Email,
            Name: appUser.Name
        );
    }
}