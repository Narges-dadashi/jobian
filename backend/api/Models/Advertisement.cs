namespace api.Models;

public enum Gender { Male, Female, DoesNotMatter }
public enum MilitaryStatus { NotRequired, ServedOrExempted, EducationalExemption }
public enum EmploymentType { FullTime, PartTime, Contract, Internship, Temporary }
public enum ExperienceLevel { Entry, Junior, Mid, Senior, Lead, Manager }
public enum EducationLevel { NotRequired, Diploma, Associate, Bachelor, Master, Doctorate } // to client ba index gozine aval namayesh dade nashe
public enum JobStatus { Draft, Published, Closed, Archived }
// public enum JobCategory { SoftwareDevelopment, MarketingAndSales, AccountingAndFinance, DesignAndCreative, CustomerSupport, HumanResources, ConstructionAndEngineering, AdministrativeAndOffice }

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
    public string JobTitle { get; set; } = string.Empty;
    public string? ShortDescription { get; set; } = string.Empty;
    [Required]
    public string Details { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public Gender Gender { get; set; }
    public MilitaryStatus MilitaryServiceRequired { get; set; }
    public bool IsUrgent { get; set; } = false;
    [Required]
    public string Location { get; set; } = string.Empty;
    public string LogoUrl { get; set; } = string.Empty;
    public bool IsRemote { get; set; } = false; //دورکاری
    public EmploymentType EmploymentType { get; set; }
    public ExperienceLevel? ExperienceLevel { get; set; }
    public EducationLevel EducationLevel { get; set; }
    public decimal? MinSalary { get; set; }
    public decimal? MaxSalary { get; set; }
    public List<string>? Skills { get; set; }
    public List<string>? Benefits { get; set; } // بیمه و مسافرت و ... 
    public DateTime? ExpiryDate { get; set; } // کی مهلت آگهی تموم بشه
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public JobStatus Status { get; set; } = JobStatus.Draft; // کارفرما وضعیت فعلی آگهی را مشخص می‌کند
}