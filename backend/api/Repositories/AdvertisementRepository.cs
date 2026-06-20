namespace api.Repositories;

public class AdvertisementRepository : IAdvertisementRepository
{
    #region Mongodb
    private readonly IMongoCollection<Advertisement> _collection;
    private readonly IEmployerRepository _employerRepository;

    public AdvertisementRepository(IMongoClient client, IMyMongoDbSettings dbSettings, IEmployerRepository employerRepository)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<Advertisement>("advertisements");

        _employerRepository = employerRepository;
    }
    #endregion

    public async Task<AdvertisementResponseDto?> CreateAdvertisementAsync(Advertisement advertisement, string userId, CancellationToken cancellationToken)
    {
        Advertisement advObj = new()
        {
            CreatorId = userId,
            CreatedAt = DateTime.UtcNow,
            CompanyName = advertisement.CompanyName,
            CompanyEmail = advertisement.CompanyEmail,
            JobTitle = advertisement.JobTitle,
            ShortDescription = advertisement.ShortDescription,
            Details = advertisement.Details,
            Location = advertisement.Location,
            IsRemote = advertisement.IsRemote,
            EmploymentType = advertisement.EmploymentType,
            ExperienceLevel = advertisement.ExperienceLevel,
            EducationLevel = advertisement.EducationLevel,
            MaxSalary = advertisement.MaxSalary,
            MinSalary = advertisement.MinSalary,
            Skills = advertisement.Skills,
            Benefits = advertisement.Benefits,
            ExpiryDate = advertisement.ExpiryDate,
            Status = advertisement.Status
        };

        await _collection.InsertOneAsync(advObj, null, cancellationToken);

        EmployerDetailsDto? employerDetailsDto = await _employerRepository.GetEmployerDetailsByIdAsync(advObj.CreatorId!, cancellationToken);

        return Mappers.ConvertAdvertisementToAdvertisementResponseDto(
        advObj,
        employerDetailsDto?.CompanyName ?? string.Empty,
        employerDetailsDto?.CompanyEmail ?? string.Empty
    );
    }

    public async Task<AdvertisementResponseDto?> GetByJobTitleAsync(string jobTitle, CancellationToken cancellationToken)
    {
        Advertisement? advertisement = await _collection.Find
            (doc => doc.JobTitle == jobTitle).FirstOrDefaultAsync(cancellationToken);

        if (advertisement is null)
            return null;

        EmployerDetailsDto? employerDetailsDto = await _employerRepository.GetEmployerDetailsByIdAsync(advertisement.CreatorId!, cancellationToken);

        AdvertisementResponseDto advertisementResponseDto = Mappers.ConvertAdvertisementToAdvertisementResponseDto(
            advertisement,
            employerDetailsDto?.CompanyName ?? string.Empty,
            employerDetailsDto?.CompanyEmail ?? string.Empty
        );

        return advertisementResponseDto;
    }

    public async Task<PagedList<Advertisement>> GetAllAdvertisementsAsync(AdvertisementParams advertisementParams, CancellationToken cancellationToken)
    {
        PagedList<Advertisement> advertisements = await PagedList<Advertisement>.CreatePagedListAsync(
            CreateQuery(advertisementParams), advertisementParams.PageNumber, advertisementParams.PageSize, cancellationToken
        );

        return advertisements;
    }

    public IQueryable<Advertisement> CreateQuery(AdvertisementParams advertisementParams)
    {
        IQueryable<Advertisement> query = _collection.AsQueryable();

        // اینو اول میزاریم که فیلترها فقط روی آگهی‌های تایید شده اعمال بشه
        query = query.Where(ad => ad.Status == JobStatus.Published);

        if (!string.IsNullOrEmpty(advertisementParams.Search))
        {
            advertisementParams.Search = advertisementParams.Search.ToLower();

            query = query.Where(doc =>
                doc.JobTitle.ToLower().Contains(advertisementParams.Search, StringComparison.CurrentCultureIgnoreCase) ||
                doc.CompanyName.ToLower().Contains(advertisementParams.Search, StringComparison.CurrentCultureIgnoreCase) ||
                doc.Location.ToLower().Contains(advertisementParams.Search, StringComparison.CurrentCultureIgnoreCase) ||
                (doc.Skills != null && doc.Skills.Any(s => s.ToLower().Contains(advertisementParams.Search.ToLower())))
            );
        }

        query = advertisementParams.OrderBy?.ToLower() switch
        {
            "jobtitle" => query.OrderBy(ad => ad.JobTitle).ThenBy(ad => ad.Id),
            "salary" or "maxsalary" => query.OrderByDescending(ad => ad.MaxSalary).ThenBy(ad => ad.Id),
            "companyname" => query.OrderBy(ad => ad.CompanyName).ThenBy(ad => ad.Id),
            "location" => query.OrderBy(ad => ad.Location).ThenBy(ad => ad.Id),
            "seniority" => query.OrderBy(ad => ad.ExperienceLevel).ThenBy(ad => ad.Id),
            _ => query.OrderByDescending(ad => ad.CreatedAt).ThenBy(ad => ad.Id)
        };

        return query;
    }
}