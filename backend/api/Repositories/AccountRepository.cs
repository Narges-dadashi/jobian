namespace api.Repositories;

public class AccountRepository : IAccountRepository
{
    #region Mongodb
    private readonly IMongoCollection<AppUser> _collection;
    private readonly ITokenService _tokenService;
    private readonly UserManager<AppUser> _userManager;

    public AccountRepository(IMongoClient client, IMyMongoDbSettings dbSettings, ITokenService tokenService, UserManager<AppUser> userManager)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<AppUser>("users");

        _tokenService = tokenService;
        _userManager = userManager;
    }
    #endregion

    public async Task<OperationResult<LoggedInDto>> RegisterJobSeekerAsync(JobSeekerRegisterDto userInput, CancellationToken cancellationToken)
    {
        AppUser appUser = Mappers.ConvertJobSeekerRegisterDtoToAppUser(userInput);

        IdentityResult userCreationResult = await _userManager.CreateAsync(appUser, userInput.Password);

        if (!userCreationResult.Succeeded)
        {
            return new OperationResult<LoggedInDto>(
                IsSuccess: false,
                Error: new CustomError(
                    Code: ErrorCode.NetIdentityFailed,
                    Message: userCreationResult.Errors.Select(e => e.Description).FirstOrDefault()
                )
            );
        }

        IdentityResult roleResult = await _userManager.AddToRoleAsync(appUser, "jobSeeker");

        if (!roleResult.Succeeded)
        {
            return new OperationResult<LoggedInDto>(
                IsSuccess: false,
                Error: new CustomError(
                    ErrorCode.NetIdentityRoleFailed,
                    Message: roleResult.Errors.Select(e => e.Description).FirstOrDefault()
                )
            );
        }

        string? token = await _tokenService.CreateToken(appUser);

        if (string.IsNullOrEmpty(token))
        {
            return new OperationResult<LoggedInDto>(
                IsSuccess: false,
                Error: new CustomError(
                    Code: ErrorCode.TokenGenerationFaild,
                    Message: "Token generation failed."
                )
            );
        }

        LoggedInDto loggedInDto = Mappers.ConvertAppUserToLoggedInDto(appUser, token);

        return new OperationResult<LoggedInDto>(
            IsSuccess: true,
            Result: loggedInDto,
            Error: null
        );
    }

    public async Task<OperationResult<LoggedInDto>> RegisterEmployerAsync(EmployerRegisterDto userInput, CancellationToken cancellationToken)
    {
        AppUser appUser = Mappers.ConvertEmployerRegisterDtoToAppUser(userInput);

        IdentityResult userCreationResult = await _userManager.CreateAsync(appUser, userInput.Password);

        if (!userCreationResult.Succeeded)
        {
            return new OperationResult<LoggedInDto>(
                IsSuccess: false,
                Error: new CustomError(
                    Code: ErrorCode.NetIdentityFailed,
                    Message: userCreationResult.Errors.Select(e => e.Description).FirstOrDefault()
                )
            );
        }

        IdentityResult roleResult = await _userManager.AddToRoleAsync(appUser, "employer");

        if (!roleResult.Succeeded)
        {
            return new OperationResult<LoggedInDto>(
                IsSuccess: false,
                Error: new CustomError(
                    ErrorCode.NetIdentityRoleFailed,
                    Message: roleResult.Errors.Select(e => e.Description).FirstOrDefault()
                )
            );
        }

        string? token = await _tokenService.CreateToken(appUser);

        if (string.IsNullOrEmpty(token))
        {
            return new OperationResult<LoggedInDto>(
                IsSuccess: false,
                Error: new CustomError(
                    Code: ErrorCode.TokenGenerationFaild,
                    Message: "Token generation failed."
                )
            );
        }

        LoggedInDto loggedInDto = Mappers.ConvertAppUserToLoggedInDto(appUser, token);

        return new OperationResult<LoggedInDto>(
            IsSuccess: true,
            Result: loggedInDto,
            Error: null
        );
    }

    public async Task<OperationResult<LoggedInDto>> LoginAsync(LoginDto userInput, CancellationToken cancellationToken)
    {
        AppUser? appUser = await _userManager.FindByEmailAsync(userInput.Email!);

        if (appUser is null)
        {
            return new OperationResult<LoggedInDto>(
                IsSuccess: false,
                Error: new CustomError(
                    Code: ErrorCode.WrongCreds,
                    Message: "Wrong Creds!"
                )
            );
        }

        bool isPassCorrect = await _userManager.CheckPasswordAsync(appUser, userInput.Password);

        if (!isPassCorrect)
        {
            return new OperationResult<LoggedInDto>(
                IsSuccess: false,
                Error: new CustomError(
                    Code: ErrorCode.WrongCreds,
                    Message: "Wrong Creds!"
                )
            );
        }

        string? token = await _tokenService.CreateToken(appUser);

        if (string.IsNullOrEmpty(token))
        {
            return new OperationResult<LoggedInDto>(
                IsSuccess: false,
                Error: new CustomError(
                    Code: ErrorCode.TokenGenerationFaild,
                    "Token generation faild!"
                )
            );
        }

        LoggedInDto loggedInDto = Mappers.ConvertAppUserToLoggedInDto(appUser, token);

        return new OperationResult<LoggedInDto>(
            IsSuccess: true,
            Result: loggedInDto,
            Error: null
        );
    }

    public async Task<DeleteResult> DeleteByIdAsync(string userId, CancellationToken cancellationToken)
    {
        AppUser appUser = await _collection.Find<AppUser>(doc => doc.Id.ToString() == userId).FirstOrDefaultAsync(cancellationToken);

        if (appUser is null)
        {
            return null;
        }

        return await _collection.DeleteOneAsync<AppUser>(doc => doc.Id.ToString() == userId, cancellationToken);

    }

    public async Task<LoggedInDto> ReloadLoggedInUserAsync(string userId, string token, CancellationToken cancellationToken)
    {
        AppUser? appUser = await _collection.Find<AppUser>(doc => doc.Id.ToString() == userId).FirstOrDefaultAsync(cancellationToken);

        if (appUser is null)
            return null;

        return Mappers.ConvertAppUserToLoggedInDto(appUser, token);
    }
}