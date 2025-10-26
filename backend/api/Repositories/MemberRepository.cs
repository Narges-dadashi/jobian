namespace api.Repositories;

public class MemberRepository : IMemberRepository
{
    #region Db and Token Settings
    private readonly IMongoCollection<AppUser> _collection;

    public MemberRepository(IMongoClient client, IMongoDbSettings dbSettings, ITokenService tokenService)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<AppUser>("users");

    }
    #endregion

    public async Task<MemberDto?> GetByUserNameAsync(string userName, CancellationToken cancellationToken)
    {
        AppUser? appUser = await _collection.Find
            (doc => doc.UserName == userName).FirstOrDefaultAsync(cancellationToken);

        if (appUser is null) return null;

        MemberDto memberDto = Mappers.ConvertAppUserToMemberDto(appUser);

        return memberDto;
    }
}