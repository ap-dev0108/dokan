using System.ComponentModel.DataAnnotations;
using dokan.Models.Enum;

namespace dokan.Models.Entities;

public class OrderItem
{
    [Key]
    public Guid OrderItemId { get; set; } = Guid.NewGuid();

    [Required]
    public Guid OrderId { get; set; }

    [Required]
    public Guid ProductId { get; set; }

    [Required]
    public string ProductTitle { get; set; }

    [Required]
    public float UnitPrice { get; set; }

    [Required]
    public int Quantity { get; set; }

    public float TotalPrice => UnitPrice * Quantity;

    public Order Order { get; set; }
}
