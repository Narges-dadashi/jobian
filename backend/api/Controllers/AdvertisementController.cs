namespace api.Controllers;

[Authorize]
public class AdvertisementController(IAdvertisementRepository advertisementRepository, IMemberRepository memberRepository) : BaseApiController
{
    [HttpPost("create-advertisement")]
    public async Task<ActionResult<AdvertisementResponseDto>> CreateAdvertisement(Advertisement advertisement, CancellationToken cancellationToken)
    {
        string? userId = User.GetUserId();

        Console.WriteLine(userId);

        AdvertisementResponseDto? advertisementResponseDto = await advertisementRepository.CreateAdvertisementAsync(advertisement, userId!, cancellationToken);

        return Ok(advertisementResponseDto);
    }

    [HttpGet("get-all")]
    public async Task<ActionResult<IEnumerable<AdvertisementResponseDto>>> GetAllAdvertisements([FromQuery] PaginationParams paginationParams, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();

        if (userId is null)
            return Unauthorized("You are not login. Please login again");

        PagedList<Advertisement> pagedAdvertisements = await advertisementRepository.GetAllAdvertisementsAsync(paginationParams, cancellationToken);

        if (pagedAdvertisements.Count == 0)
            return NoContent();

        PaginationHeader paginationHeader = new(
        CurrentPage: pagedAdvertisements.CurrentPage,
        ItemsPerPage: pagedAdvertisements.PageSize,
        TotalItems: pagedAdvertisements.TotalItems,
        TotalPages: pagedAdvertisements.TotalPages
    );

        Response.AddPaginationHeader(paginationHeader);

        List<AdvertisementResponseDto> advertisementResponseDtos = [];

        foreach (Advertisement advertisement in pagedAdvertisements)
        {
            EmployerDetailsDto? employerDetailsDto = await memberRepository.GetEmployerDetailsByIdAsync(advertisement.CreatorId!, cancellationToken);

            AdvertisementResponseDto advertisementResponseDto = Mappers.ConvertAdvertisementToAdvertisementResponseDto(advertisement, employerDetailsDto!.CompanyName, employerDetailsDto.CompanyEmail);

            advertisementResponseDtos.Add(advertisementResponseDto);
        }

        return advertisementResponseDtos;
    }
}