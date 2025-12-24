namespace api.Models;

public enum EmploymentType { FullTime, PartTime, Contract, Internship, Temporary }
public enum ExperienceLevel { Entry, Junior, Mid, Senior, Lead, Manager }
public enum JobStatus { Draft, Published, Closed, Archived }

[CollectionName("advertisements")]
public class Advertisement
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string? CreatorId { get; init; }
    public string CompanyName { get; set; } = string.Empty;
    public string CompanyEmail { get; set; } = string.Empty;
    [Required]
    public string Title { get; set; } = string.Empty;
    public string? ShortDescription { get; set; } = string.Empty;
    [Required]
    public string Details { get; set; } = string.Empty;
    [Required]
    public string Location { get; set; } = string.Empty;
    public string LogoUrl { get; set; } = string.Empty;
    public bool IsRemote { get; set; } = false; //دورکاری
    public EmploymentType EmploymentType { get; set; }
    public ExperienceLevel? ExperienceLevel { get; set; }
    public string? EducationLevel { get; set; } = string.Empty;
    public decimal? SalaryFrom { get; set; }
    public decimal? SalaryTo { get; set; }
    public List<string>? Skills { get; set; }
    public List<string>? Benefits { get; set; } // بیمه و مسافرت و ... 
    public DateTime? ExpiryDate { get; set; } // کی مهلت آگهی تموم بشه
    public JobStatus Status { get; set; } = JobStatus.Draft; // کارفرما وضعیت فعلی آگهی را مشخص می‌کند
}