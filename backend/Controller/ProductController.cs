using System.Runtime.InteropServices.JavaScript;
using dokan.Database;
using dokan.DTO;
using dokan.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.ComponentModel;
using System.Security.Cryptography.X509Certificates;

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


    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductsById(Guid id)
    {
        try
        {
            var product = await _db.Products.FirstOrDefaultAsync(p => p.ProductID == id);

            if (product == null)
                return NotFound(new { error = "Product not found" });

            return Ok(new { productData = product });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPost("addProduct")]
    public async Task<IActionResult> AddProduct([FromForm] ProductDTO details) {
        try {
            var fileName = details.File != null ? $"{Guid.NewGuid()}{Path.GetExtension(details.File.FileName)}" : "default.jpg";
            var imagePath = $"/uploads/products/{fileName}";
            
            if (details.File != null)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "products");
                Directory.CreateDirectory(uploadsFolder);
                
                var path = Path.Combine(uploadsFolder, fileName);
                using var stream = new FileStream(path, FileMode.Create);
                await details.File.CopyToAsync(stream);
            }
            
            var newProduct = new Products
            {
                ProductID = Guid.NewGuid(),
                productDetails = new ProductDetails
                {
                    productTitle = details.productTitle,
                    productDescription = details.productDescription,
                    MarkedPrice = details.MarkedPrice,
                    imageUrl = imagePath
                },
                productMeta = new ProductMeta
                {
                    isSale = details.isSale,
                    SalePrice = details.SalePrice,
                    isNew = details.isNew,
                    stock = details.stock,
                    category = details.category,
                }
            };

            await _db.Products.AddAsync(newProduct);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAllProducts), new { id = newProduct.ProductID }, newProduct);
        } catch (Exception ex) {
            return BadRequest(new { error = ex.Message });
        }
    }
    
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpDelete("deleteProduct")]
    public async Task<IActionResult> DeleteProduct([FromBody] Guid id)
    {
        var existingProducts = await _db.Products.FirstOrDefaultAsync(f => f.ProductID == id);

        if (existingProducts == null) return BadRequest(new { error = "Product with the ID does not exist" });

        _db.Products.Remove(existingProducts);
        await _db.SaveChangesAsync();
        return Ok($"Product {id} has been deleted");
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [AllowAnonymous]
    [HttpGet("filterProducts/{category}")]
    public async Task<IActionResult> GetProducts(string category)
    {
        try
        {
            var filteredProducts = await _db.Products.Where(p => p.productMeta.category.ToString() == category).ToListAsync();
            return Ok(new { productData = filteredProducts });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [AllowAnonymous]
    [HttpGet("saleProducts")]
    public async Task<IActionResult> GetSaleProducts() {
        try {
            var saleProducts = await _db.Products.Where(p => p.productMeta.isSale).ToListAsync();
            return Ok(new { productData = saleProducts });
        } catch (Exception ex) {
            return BadRequest(new { error = ex.Message });
        }
    }
    
}