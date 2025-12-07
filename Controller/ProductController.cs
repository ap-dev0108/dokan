using System.Runtime.InteropServices.JavaScript;
using dokan.Database;
using dokan.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

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
    
    [HttpGet("allProducts")]
    public async Task<IActionResult> GetAllProducts()
    {
        try
        {
            if (!User.Identity?.IsAuthenticated ?? true)
            {
                return Unauthorized(new { error = "Token not recognized", claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList() });
            }

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

}