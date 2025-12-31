namespace api.DTOs;

public static class Mappers
{
    public static AppUser ConvertJobSeekerRegisterDtoToAppUser(JobSeekerRegisterDto jobSeekerRegisterDto)
    {
        return new AppUser
        {
            Email = jobSeekerRegisterDto.Email,
            UserName = jobSeekerRegisterDto.UserName,
        };
    }

    public static AppUser ConvertEmployerRegisterDtoToAppUser(EmployerRegisterDto employerRegisterDto)
    {
        return new AppUser
        {
            Email = employerRegisterDto.Email,
            UserName = employerRegisterDto.UserName
        };
    }

    public static LoggedInDto ConvertAppUserToLoggedInDto(AppUser appUser, string tokenValue)
    {
        return new LoggedInDto
        {
            Email = appUser.Email,
            CompanyEmail = appUser.CompanyEmail,
            UserName = appUser.UserName,
            CompanyName = appUser.CompanyName,
            Token = tokenValue,
            ProfilePhotoUrl = appUser.Photos.FirstOrDefault(photo => photo.IsMain)?.Url_165
        };
    }

    public static MemberDto ConvertAppUserToMemberDto(AppUser appUser)
    {
        return new(
            Email: appUser.Email!,
            UserName: appUser.UserName!,
            Photos: appUser.Photos
        );
    }

    public static AdvertisementResponseDto ConvertAdvertisementToAdvertisementResponseDto(Advertisement advertisement, string CompanyName, string CompanyEmail)
    {
        return new(
            Title: advertisement.Title,
            ShortDescription: advertisement.ShortDescription,
            Details: advertisement.Details,
            CreatorUserName: CompanyName,
            CompanyEmail: CompanyEmail,
            Location: advertisement.Location,
            IsRemote: advertisement.IsRemote,
            EmploymentType: advertisement.EmploymentType,
            ExperienceLevel: advertisement.ExperienceLevel,
            EducationLevel: advertisement.EducationLevel!,
            SalaryFrom: advertisement.SalaryFrom,
            SalaryTo: advertisement.SalaryTo,
            Skills: advertisement.Skills,
            Benefits: advertisement.Benefits,
            ExpiryDate: advertisement.ExpiryDate,
            Status: advertisement.Status
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
}