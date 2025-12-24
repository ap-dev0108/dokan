using System.ComponentModel.DataAnnotations;
using dokan.Models.Enum;

namespace dokan.Models.Entities;

public class Products
{
    [Key] public Guid ProductID { get; set; } =  Guid.NewGuid();

    public ProductDetails productDetails { get; set; }
    public ProductMeta productMeta { get; set; }
}