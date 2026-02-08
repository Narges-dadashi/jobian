namespace api.Controllers;

public class JobSeekerController(IJobSeekerRepository jobSeekerRepository) : BaseApiController
{
    [HttpGet("get-by-username/{userName}")]
    public async Task<ActionResult<JobSeekerDto?>> GetByUserName(string userName, CancellationToken cancellationToken)
    {
        JobSeekerDto? jobSeekerDto = await jobSeekerRepository.GetByUserNameAsync(userName, cancellationToken);

        if (jobSeekerDto is null)
            return BadRequest("User not found");

        return jobSeekerDto;
    }
}