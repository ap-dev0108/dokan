using System.ComponentModel.DataAnnotations;
using dokan.Models.Enum;

namespace dokan.Models.Entities;

public class Order
{
    [Key]
    public Guid OrderId { get; set; } = Guid.NewGuid();

    public Guid UserId { get; set; }

    [Required]
    public string ShippingAddress { get; set; } = string.Empty;

    [Required]
    public string PaymentMethod { get; set; } = "Cash on Delivery";

    public OrderStatus Status { get; set; } = OrderStatus.Pending;

    public float SubTotal { get; set; }
    public float TotalAmount { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? PaidAt { get; set; }

    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    public Payment? Payment { get; set; }

    // Convenience getter for serialization
    public IEnumerable<OrderItem> Items => OrderItems;
}
