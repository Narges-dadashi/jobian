namespace api.Controllers;

public class EmployerController(IEmployerRepository employerRepository) : BaseApiController
{
    [HttpGet("get-by-username/{userName}")]
    public async Task<ActionResult<EmployerDto?>> GetByUserName(string userName, CancellationToken cancellationToken)
    {
        EmployerDto? employerDto = await employerRepository.GetByUserNameAsync(userName, cancellationToken);

        if (employerDto is null)
            return BadRequest("User not found");

        return employerDto;
    }
}