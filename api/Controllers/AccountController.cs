namespace api.Controllers;

public class AccountController(IAccountRepository accountRepository) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<LoggedInDto>> Register(AppUser userInput, CancellationToken cancellationToken)
    {
        if (userInput.Password != userInput.ConfirmPassword)
            return BadRequest("Your Passwords do not match!");

        LoggedInDto? loggedInDto = await accountRepository.RegisterAsync(userInput, cancellationToken);

        if (loggedInDto is null)
            return BadRequest("This email is already taken.");

        return Ok(loggedInDto);
    }

    //  [HttpPost("create")]
    // public ActionResult<AppUser> Register(AppUser userInput)
    // {
    //     if (userInput.Password != userInput.ConfirmPassword)
    //     {
    //         return BadRequest("Passwords do not match");
    //     }

    //     AppUser user = _collection.Find<AppUser>(doc => doc.Email == userInput.Email.Trim().ToLower()).FirstOrDefault();

    //     if (user is null)
    //     {
    //         AppUser appUser = new AppUser(
    //                 Id: null,
    //                 Email: userInput.Email.Trim().ToLower(),
    //                 Name: userInput.Name,
    //                 Age: userInput.Age,
    //                 Password: userInput.Password,
    //                 ConfirmPassword: userInput.ConfirmPassword,
    //                 City: userInput.City,
    //                 Country: userInput.Country
    //                 );

    //         _collection.InsertOne(appUser);

    //         return appUser;
    //     }

    //     return BadRequest("This Email already Exists!");
    // }
}