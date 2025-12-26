namespace dokan.Models.Enum;

public enum Category
{
    Jackets = 1,
    Tops = 2,
    Bottoms = 3,
    Clothing = 4,      // keep ONLY if you want a generic fallback
    Bags = 5,
    Accessories = 6,
    Footwear = 7,
    Watches = 8
}

public enum OrderStatus
{
    Pending = 1,
    Shipped = 2,
    Delivered = 3,
    Cancelled = 4
}

public enum PaymentStatus
{
    Pending = 1,
    Success = 2,
    Failed = 3
}
