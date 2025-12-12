using System.ComponentModel.DataAnnotations;

namespace dokan.Models.Entities;

public class UserProfile
{
    [Key] public Guid profileid { get; set; } = Guid.NewGuid();
    [Required] public string phone { get; set; }

    [Required] public DateTime loggedIn { get; set; } = DateTime.Now;
    
    public User user { get; set; }
}