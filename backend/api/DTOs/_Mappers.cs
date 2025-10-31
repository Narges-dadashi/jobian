namespace api.DTOs;

public static class Mappers
{
    public static AppUser ConvertJobSeekerRegisterDtoToAppUser(JobSeekerRegisterDto jobSeekerRegisterDto)
    {
        return new AppUser
        {
            Email = jobSeekerRegisterDto.Email.Trim().ToLower(),
            UserName = jobSeekerRegisterDto.UserName.Trim().ToLower(),
            Password = jobSeekerRegisterDto.Password
        };
    }

    public static AppUser ConvertEmployserRegisterDtoToAppUser(EmployerRegisterDto employerRegisterDto)
    {
        return new AppUser
        {
            Email = employerRegisterDto.Email.Trim().ToLower(),
            CompanyName = employerRegisterDto.CompanyName.Trim().ToLower(),
            Password = employerRegisterDto.Password
        };
    }

    public static LoggedInDto ConvertAppUserToLoggedInDto(AppUser appUser, string tokenValue)
    {
        return new(
            Email: appUser.Email,
            UserName: appUser.UserName,
            Age: Extensions.DateTimeExtensions.CalculateAge(appUser.DateOfBirth),
            Token: tokenValue,
            ProfilePhotoUrl: appUser.Photos.FirstOrDefault(photo => photo.IsMain)?.Url_165
        );
    }

    public static Photo ConvertPhotoUrlsToPhoto(string[] photoUrls, bool isMain)
    {
        return new Photo(
            Url_165: photoUrls[0],
            Url_256: photoUrls[1],
            Url_enlarged: photoUrls[2],
            IsMain: isMain
        );
    }

    public static MemberDto ConvertAppUserToMemberDto(AppUser appUser)
    {
        return new(
            UserName: appUser.UserName,
            Age: Extensions.DateTimeExtensions.CalculateAge(appUser.DateOfBirth),
            Photos: appUser.Photos
        );
    }
}