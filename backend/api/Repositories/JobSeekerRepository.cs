namespace api.Repositories;

public class JobSeekerRepository : IJobSeekerRepository
{
    #region Db and Token Settings
    private readonly IMongoCollection<AppUser> _collection;

    public JobSeekerRepository(IMongoClient client, IMyMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<AppUser>("users");

    }
    #endregion

    public async Task<JobSeekerDto?> GetByUserNameAsync(string userName, CancellationToken cancellationToken)
    {
        AppUser? appUser = await _collection.Find
            (doc => doc.UserName == userName).FirstOrDefaultAsync(cancellationToken);

        if (appUser is null) return null;

        JobSeekerDto jobSeekerDto = Mappers.ConvertAppUserToJobSeekerDto(appUser);

        return jobSeekerDto;
    }
}