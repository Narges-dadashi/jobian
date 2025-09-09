namespace api.Interfaces;

public interface IUserRepository
{
    public Task<AppUser?> GetByIdAsync(string userId, CancellationToken cancellationToken);
    public Task<UpdateDto?> UpdateByIdAsync(string userId, RegisterDto userInput, CancellationToken cancellationToken);
    public Task<Photo?> UploadPhotoAsync(IFormFile file, string userId, CancellationToken cancellationToken);
    
}