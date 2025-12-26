using System.ComponentModel.DataAnnotations;

namespace dokan.DTO;

public class CreateOrderDto
{
    [Required]
    public string ShippingAddress { get; set; }

    [Required]
    public string PaymentMethod { get; set; }

    [MinLength(1)]
    [Required]
    public List<OrderItemDTO> Items { get; set; }
}


public class OrderItemDTO
{
    [Required]
    public Guid ProductId { get; set; }

    [Required]
    public string ProductTitle { get; set; }

    [Range(0.01, double.MaxValue)]
    public float UnitPrice { get; set; }

    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }
}