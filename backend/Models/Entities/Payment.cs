using System.ComponentModel.DataAnnotations;
using dokan.Models.Enum;

namespace dokan.Models.Entities;

public class Payment
{
    [Key]
    public Guid PaymentId { get; set; } = Guid.NewGuid();

    [Required]
    public Guid OrderId { get; set; }

    public string PaymentMethod { get; set; } // eSewa, Khalti, COD, etc.
    public string? TransactionReference { get; set; }

    public float Amount { get; set; }

    public PaymentStatus Status { get; set; } = PaymentStatus.Pending;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Order Order { get; set; }
}
