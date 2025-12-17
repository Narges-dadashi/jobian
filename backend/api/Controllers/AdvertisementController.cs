namespace api.Controllers;

public class AdvertisementController(IAdvertisementRepository advertisementRepository) : BaseApiController
{
    [HttpPost("create-advertisement")]
    public async Task<ActionResult<AdvertisementResponseDto>> CreateAdvertisement(Advertisement advertisement, CancellationToken cancellationToken)
    {
        string? userId = User.GetUserId();

        AdvertisementResponseDto? advertisementResponseDto = await advertisementRepository.CreateAdvertisementAsync(advertisement, userId!, cancellationToken);

        return Ok(advertisementResponseDto);
    }
}