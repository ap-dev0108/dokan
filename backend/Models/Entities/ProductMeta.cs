using dokan.Models.Enum;
using System.Text.Json.Serialization;

namespace dokan.Models.Entities;

public class ProductMeta
{
    public bool isSale {get; set;}
    public float? SalePrice {get; set;}
    public bool? isNew {get; set;}
    public int stock {get; set;}

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public Category category { get; set; }
}