namespace api.Interfaces;

public interface IMemberRepository
{
    public Task<MemberDto?> GetByUserNameAsync(string userName, CancellationToken cancellationToken);
    public Task<EmployerDetailsDto?> GetUserNameByIdAsync(string id, CancellationToken cancellationToken);
}