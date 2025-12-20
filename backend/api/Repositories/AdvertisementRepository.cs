namespace api.Repositories;

public class AdvertisementRepository : IAdvertisementRepository
{
    #region Mongodb
    private readonly IMongoCollection<Advertisement> _collection;

    public AdvertisementRepository(IMongoClient client, IMyMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<Advertisement>("advertisements");
    }
    #endregion

    public async Task<AdvertisementResponseDto?> CreateAdvertisementAsync(Advertisement advertisement, string userId, CancellationToken cancellationToken)
    {
        Advertisement advObj = new()
        {
            CreatorId = userId,
            Title = advertisement.Title,
            ShortDescription = advertisement.ShortDescription,
            Details = advertisement.Details,
            Location = advertisement.Location,
            IsRemote = advertisement.IsRemote,
            EmploymentType = advertisement.EmploymentType,
            ExperienceLevel = advertisement.ExperienceLevel,
            EducationLevel = advertisement.EducationLevel,
            SalaryFrom = advertisement.SalaryFrom,
            SalaryTo = advertisement.SalaryTo,
            Skills = advertisement.Skills,
            Benefits = advertisement.Benefits,
            PublishStart = advertisement.PublishStart,
            ExpiryDate = advertisement.ExpiryDate,
            Status = advertisement.Status
        };

        await _collection.InsertOneAsync(advObj, null, cancellationToken);

        return Mappers.ConvertAdvertisementToAdvertisementResponseDto(advertisement);
    }

    // public async Task<AdvertisementResponseDto?> GetAllAdvertisementsAsync(CancellationToken cancellationToken)
    // {
        
    // }
}