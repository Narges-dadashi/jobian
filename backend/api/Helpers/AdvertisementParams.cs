namespace api.Helpers;

public class AdvertisementParams : PaginationParams
{
    [MaxLength(30)]
    public string? OrderBy { get; set; } = "created"; // skills, companyName, location, created at
    [MaxLength(100)]
    public string Search { get; set; } = string.Empty;
}