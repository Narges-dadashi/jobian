namespace api.Controllers;

public class AdvertisementController(IAdvertisementRepository advertisementRepository, IEmployerRepository employerRepository) : BaseApiController
{
    // [Authorize(Roles = "Employer")]
    [HttpPost("create-advertisement")]
    public async Task<ActionResult<AdvertisementResponseDto>> CreateAdvertisement(Advertisement advertisement, CancellationToken cancellationToken)
    {
        string? userId = User.GetUserId();

        // if (!User.IsInRole("Employer"))
        // {
        //     return Forbid();
        // }

        AdvertisementResponseDto? advertisementResponseDto = await advertisementRepository.CreateAdvertisementAsync(advertisement, userId!, cancellationToken);

        return Ok(advertisementResponseDto);
    }

    [HttpGet("get-by-job-title/{jobTitle}")]
    public async Task<ActionResult<AdvertisementResponseDto?>> GetByJobTitle(string jobTitle, CancellationToken cancellationToken)
    {
        AdvertisementResponseDto? advertisementResponseDto = await advertisementRepository.GetByJobTitleAsync(jobTitle, cancellationToken);

        if (advertisementResponseDto is null)
            return BadRequest("JobTitle not found");

        return advertisementResponseDto;
    }

    [AllowAnonymous]
    [HttpGet("get-all")]
    public async Task<ActionResult<IEnumerable<AdvertisementResponseDto>>> GetAllAdvertisements([FromQuery] AdvertisementParams advertisementParams, CancellationToken cancellationToken)
    {
        // var userId = User.GetUserId();

        // if (userId is null)
        //     return Unauthorized("You are not login. Please login again");

        PagedList<Advertisement> pagedAdvertisements = await advertisementRepository.GetAllAdvertisementsAsync(advertisementParams, cancellationToken);

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
            EmployerDetailsDto? employerDetailsDto = await employerRepository.GetEmployerDetailsByIdAsync(advertisement.CreatorId!, cancellationToken);

            AdvertisementResponseDto advertisementResponseDto = Mappers.ConvertAdvertisementToAdvertisementResponseDto(advertisement, employerDetailsDto!.CompanyName, employerDetailsDto.CompanyEmail);

            advertisementResponseDtos.Add(advertisementResponseDto);
        }

        return advertisementResponseDtos;
    }
}