// namespace api.Repositories;

// public class AdvertisementRepository : IAdvertisementRepository
// {
//     #region Mongodb
//     private readonly IMongoCollection<Advertisement> _collection;
//     private readonly IMemberRepository _memberRepository;

//     public AdvertisementRepository(IMongoClient client, IMyMongoDbSettings dbSettings, IMemberRepository memberRepository)
//     {
//         var dbName = client.GetDatabase(dbSettings.DatabaseName);
//         _collection = dbName.GetCollection<Advertisement>("advertisements");

//         _memberRepository = memberRepository;
//     }
//     #endregion

//     public async Task<AdvertisementResponseDto?> CreateAdvertisementAsync(Advertisement advertisement, string userId, CancellationToken cancellationToken)
//     {
//         Advertisement advObj = new()
//         {
//             CreatorId = userId,
//             Title = advertisement.Title,
//             ShortDescription = advertisement.ShortDescription,
//             Details = advertisement.Details,
//             Location = advertisement.Location,
//             IsRemote = advertisement.IsRemote,
//             EmploymentType = advertisement.EmploymentType,
//             ExperienceLevel = advertisement.ExperienceLevel,
//             EducationLevel = advertisement.EducationLevel,
//             SalaryFrom = advertisement.SalaryFrom,
//             SalaryTo = advertisement.SalaryTo,
//             Skills = advertisement.Skills,
//             Benefits = advertisement.Benefits,
//             PublishStart = advertisement.PublishStart,
//             ExpiryDate = advertisement.ExpiryDate,
//             Status = advertisement.Status
//         };

//         await _collection.InsertOneAsync(advObj, null, cancellationToken);

//         string? userName = await _memberRepository.GetUserNameByIdAsync(advObj.CreatorId!, cancellationToken);

//         return Mappers.ConvertAdvertisementToAdvertisementResponseDto(advObj, userName!);
//     }

//     public async Task<PagedList<Advertisement>> GetAllAdvertisementsAsync(PaginationParams paginationParams, CancellationToken cancellationToken)
//     {
//         IQueryable<Advertisement> query = _collection.AsQueryable();

//         PagedList<Advertisement> advertisements = await PagedList<Advertisement>.CreatePagedListAsync(
//             query, paginationParams.PageNumber, paginationParams.PageSize, cancellationToken
//         );

//         return advertisements;
//     }
// }