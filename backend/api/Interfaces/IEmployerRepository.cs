namespace api.Interfaces;

public interface IEmployerRepository
{
    public Task<EmployerDto?> GetByUserNameAsync(string userName, CancellationToken cancellationToken);
    public Task<EmployerDetailsDto?> GetEmployerDetailsByIdAsync(string id, CancellationToken cancellationToken);
}