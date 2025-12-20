namespace api.Interfaces;

public interface IAdvertisementRepository
{
    public Task<AdvertisementResponseDto?> CreateAdvertisementAsync(Advertisement advertisement, string userId, CancellationToken cancellationToken);
    // public Task<AdvertisementResponseDto?> GetAllAdvertisementsAsync(CancellationToken cancellationToken);
}