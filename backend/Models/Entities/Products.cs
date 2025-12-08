using System.ComponentModel.DataAnnotations;

namespace dokan.Models.Entities;

public class Products
{
    [Key] public Guid productId { get; set; } =  Guid.NewGuid();
    [Required] public string productTitle { get; set; }
    [Required] public string productDescription { get; set; }
    [Required] public float price { get; set; }
    public string? imageUrl { get; set; }
}