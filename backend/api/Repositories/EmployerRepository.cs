namespace api.Repositories;

public class EmployerRepository : IEmployerRepository
{
    #region Db and Token Settings
    private readonly IMongoCollection<AppUser> _collection;

    public EmployerRepository(IMongoClient client, IMyMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<AppUser>("users");

    }
    #endregion

    public async Task<EmployerDto?> GetByUserNameAsync(string userName, CancellationToken cancellationToken)
    {
        AppUser? appUser = await _collection.Find
            (doc => doc.UserName == userName).FirstOrDefaultAsync(cancellationToken);

        if (appUser is null) return null;

        EmployerDto employerDto = Mappers.ConvertAppUserToEmployerDto(appUser);

        return employerDto;
    }
}