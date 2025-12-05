using dokan.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dokan.Controller;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ApplicationDB _db;
    
    public ProductController(ApplicationDB db)
    {
        _db = db;
    }

    [HttpGet("allProducts")]
    public async Task<IActionResult> GetAllProducts()
    {
        try
        {
            var allProducts = await _db.Products.ToListAsync();
            if (!allProducts.Any()) return NotFound("No products found");
        
            return Ok(new { productData = allProducts });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}