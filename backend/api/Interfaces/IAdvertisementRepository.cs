namespace api.Interfaces;

public interface IAdvertisementRepository
{
    public Task<AdvertisementResponseDto?> CreateAdvertisement(Advertisement advertisement, CancellationToken cancellationToken);
    public Task<AdvertisementResponseDto?> GetAllAdvertisement(CancellationToken cancellationToken);
}