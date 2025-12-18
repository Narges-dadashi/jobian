namespace api.Interfaces;

public interface IAdvertisementRepository
{
    public Task<AdvertisementResponseDto?> CreateAdvertisementAsync(Advertisement advertisement, string userId, CancellationToken cancellationToken);
    // public Task<AdvertisementResponseDto?> GetByAdvertisementNameAsync(String advertisementName, CancellationToken cancellationToken);
    // public Task<AdvertisementResponseDto?> GetAllAdvertisementAsync(CancellationToken cancellationToken);
}