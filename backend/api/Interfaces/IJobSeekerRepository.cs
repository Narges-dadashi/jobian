namespace api.Interfaces;

public interface IJobSeekerRepository
{
    public Task<JobSeekerDto?> GetByUserNameAsync(string userName, CancellationToken cancellationToken);
}