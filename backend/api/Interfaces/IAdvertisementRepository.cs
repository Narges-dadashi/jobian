using api.Helpers;

namespace api.Interfaces;

public interface IAdvertisementRepository
{
    public Task<AdvertisementResponseDto?> CreateAdvertisementAsync(Advertisement advertisement, string userId, CancellationToken cancellationToken);
    public Task<PagedList<Advertisement>> GetAllAdvertisementsAsync(PaginationParams paginationParams, CancellationToken cancellationToken);
}