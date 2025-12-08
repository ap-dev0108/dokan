using System.ComponentModel.DataAnnotations;

namespace dokan.Models.Entities;

public class UserAddress
{
    [Key] public Guid addressId { get; set; } = Guid.NewGuid();
    [Required] public string address { get; set; }
    [Required] public string city { get; set; }
    [Required] public string nearestLandmark { get; set; }
    
    public User user { get; set; }
}