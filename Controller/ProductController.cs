using System.Runtime.InteropServices.JavaScript;
using dokan.Database;
using dokan.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace dokan.Controller;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ApplicationDB _db;
    private readonly UserManager<User> _userManager;
    
    public ProductController(ApplicationDB db, UserManager<User> userManager)
    {
        _db = db;
        _userManager = userManager;
    }
    
    
    [Authorize]
    [HttpGet("allProducts")]
    public async Task<IActionResult> GetAllProducts()
    {
        try
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
                return Unauthorized(new { error = "Invalid or missing token" });

            var roles = await _userManager.GetRolesAsync(user);

            if (!roles.Contains("Admin"))
                return Forbid("Admin access required");

            var allProducts = await _db.Products.ToListAsync();

            if (!allProducts.Any())
                return NotFound("No products found");

            return Ok(new { productData = allProducts });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

}