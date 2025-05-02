namespace api.Controllers;

public class AccountController(IAccountRepository accountRepository) : BaseApiController
{
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