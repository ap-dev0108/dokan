namespace dokan.DTO;

public class ProductDTO
{
    public string productTitle { get; set; }
    public string productDescription { get; set; }
    public float price { get; set; }
    public IFormFile File { get; set; }
}