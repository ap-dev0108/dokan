using Microsoft.AspNetCore.Identity;

namespace dokan.Models.Entities;

public class User : IdentityUser
{
    public ICollection<UserProfile> UserProfiles { get; set; }
    public ICollection<UserAddress> UserAddresses { get; set; }
}