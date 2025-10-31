namespace api.Interfaces;

public interface IAccountRepository
{
    public Task<LoggedInDto?> RegisterJobSeekerAsync(JobSeekerRegisterDto userInput, CancellationToken cancellationToken);
    public Task<LoggedInDto?> RegisterEmployerAsync(EmployerRegisterDto userInput, CancellationToken cancellationToken);
    public Task<LoggedInDto?> LoginAsync(LoginDto userInput, CancellationToken cancellationToken);
    public Task<DeleteResult?> DeleteByIdAsync(string userId, CancellationToken cancellationToken);
    public Task<LoggedInDto?> ReloadLoggedInUserAsync(string userId, string token, CancellationToken cancellationToken);
}