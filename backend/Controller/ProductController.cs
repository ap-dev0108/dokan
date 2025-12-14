using System.Runtime.InteropServices.JavaScript;
using dokan.Database;
using dokan.DTO;
using dokan.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace dokan.Controller;

[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class ProductController : ControllerBase
{
    private readonly ApplicationDB _db;
    private readonly UserManager<User> _userManager;
    
    public ProductController(ApplicationDB db, UserManager<User> userManager)
    {
        _db = db;
        _userManager = userManager;
    }
    [AllowAnonymous]
    [HttpGet("allProducts")]
    public async Task<IActionResult> GetAllProducts()
    {
        try
        {
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
    public async Task<IActionResult> AddProduct([FromForm] ProductDTO products) {
        try {
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(products.File.FileName)}";
            var path = Path.Combine("wwwroot/images/products", fileName);

            using var stream = new FileStream(path, FileMode.Create);
            await products.File.CopyToAsync(stream);

            var newProduct = new Products
            {
                productId = Guid.NewGuid(),
                productTitle = products.productTitle,
                productDescription = products.productDescription,
                price = products.price,
                imageUrl = $"/images/products/{fileName}"
            };

            await _db.Products.AddAsync(newProduct);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAllProducts), new { id = newProduct.productId }, newProduct);
        } catch (Exception ex) {
            return BadRequest(new { error = ex.Message });
        }
    }
    
    [HttpDelete("deleteProduct")]
    public async Task<IActionResult> DeleteProduct([FromBody] Guid id)
    {
        var existingProducts = await _db.Products.FirstOrDefaultAsync(f =>f.productId == id);

        if (existingProducts == null) return BadRequest(new { error = "Product with the ID does not exist" });

        _db.Products.Remove(existingProducts);
        await _db.SaveChangesAsync();
        return Ok($"Product {id} has been deleted");
    }
    
    // Replace the image later
    [HttpPost("{id}/image")]
    public async Task<IActionResult> UploadImage(Guid id, IFormFile file)
    {
        var product = await _db.Products.FindAsync(id);
        if (product == null) return NotFound();

        var fileName = $"{id}{Path.GetExtension(file.FileName)}";
        var path = Path.Combine("wwwroot/images/products", fileName);

        using var stream = new FileStream(path, FileMode.Create);
        await file.CopyToAsync(stream);

        product.imageUrl = $"/images/products/{fileName}";
        await _db.SaveChangesAsync();

        return Ok(new { product.imageUrl });
    }

}