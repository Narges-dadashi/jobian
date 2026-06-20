namespace api.Interfaces;

public interface IAdvertisementRepository
{
    public Task<AdvertisementResponseDto?> CreateAdvertisementAsync(Advertisement advertisement, string userId, CancellationToken cancellationToken);
    public Task<AdvertisementResponseDto?> GetByJobTitleAsync(string jobTitle, CancellationToken cancellationToken);
    public Task<PagedList<Advertisement>> GetAllAdvertisementsAsync(AdvertisementParams advertisementParams, CancellationToken cancellationToken);
}