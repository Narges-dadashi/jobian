namespace api.Controllers;

[Authorize]
public class UserController(IUserRepository userRepository) : BaseApiController
{
    [HttpPut("update")]
    public async Task<ActionResult<LoggedInDto>> UpdateById(AppUser userInput, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();

        if (userId is null)
            return Unauthorized("You are not logged. Please log in again.");

        LoggedInDto? loggedInDto = await userRepository.UpdateByIdAsync(userId, userInput, cancellationToken);

        if (loggedInDto is null)
            return BadRequest("Operation failed");

        return loggedInDto;
    }

    [HttpPut("add-photo")]
    public async Task<ActionResult<Photo>> AddPhoto(
        [AllowedFileExtensions, FileSize(250_000, 4_000_000)]
        IFormFile file, CancellationToken cancellationToken
    )
    {
        if (file is null) return BadRequest("No file selected with this request");

        string? userId = User.GetUserId();

        Console.WriteLine(userId);

        if (userId is null)
        {
            return Unauthorized("You are not logged in. please login again");
        }

        Photo? photo = await userRepository.UploadPhotoAsync(file, userId, cancellationToken);

        return photo is null ? BadRequest("Add photo failed. See logger") : photo;
    }
}