using System.Runtime.InteropServices.JavaScript;
using dokan.Database;
using dokan.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace dokan.Controller;

[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly ApplicationDB _db;
    private readonly UserManager<User> _userManager;
    
    public ProductController(ApplicationDB db, UserManager<User> userManager)
    {
        _db = db;
        _userManager = userManager;
    }
    
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet("allProducts")]
    public async Task<IActionResult> GetAllProducts()
    {
        try
        {
            if (!User.IsInRole("Admin"))
                return Forbid();

            var allProducts = await _db.Products.ToListAsync();

            if (!allProducts.Any())
                return NotFound(new { error = "Product not found" });

            return Ok(new { productData = allProducts });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }


    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPost("addProduct")]
    public async Task<IActionResult> AddProduct([FromBody] Products products) {
        try {
            var checkExistingProduct = await _db.Products.FirstOrDefaultAsync(p => p.productId == products.productId);
            if (checkExistingProduct != null) return Conflict(new { error = "Product already exists" });

            var newProduct = new Products {
                productId = products.productId,
                productTitle = products.productTitle,
                productDescription = products.productDescription,
                price = products.price
            };

            await _db.Products.AddAsync(newProduct);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAllProducts), new { id = newProduct.productId }, newProduct);
            
        } catch (Exception ex) {
            return BadRequest(new { error = ex.Message });
        }
    }
}