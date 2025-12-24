using System.ComponentModel;
using dokan.Models.Enum;

namespace dokan.DTO;

public class ProductDTO
{
    public string productTitle {get; set;}
    public string productDescription {get; set;}
    public float MarkedPrice {get; set;}
    public IFormFile? File {get; set;}
    public bool isSale {get; set;}
    public float? SalePrice {get; set;}
    public bool? isNew {get; set;}
    public int stock {get; set;}
    public Category category { get; set; }
}
