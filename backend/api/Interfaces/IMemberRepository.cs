namespace api.Interfaces;

public interface IMemberRepository
{
    public Task<MemberDto?> GetByUserNameAsync(string userName, CancellationToken cancellationToken);
    public Task<EmployerDetailsDto?> GetEmployerDetailsByIdAsync(string id, CancellationToken cancellationToken);
}