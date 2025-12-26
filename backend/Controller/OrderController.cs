using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using dokan.Models.Entities;
using dokan.Database;
using dokan.DTO;
using dokan.Models.Enum;

namespace dokan.Controller;

[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class OrderController : ControllerBase
{
    private readonly ApplicationDB _db;
    private readonly UserManager<User> _userManager;

    public OrderController(ApplicationDB db, UserManager<User> userManager)
    {
        _db = db;
        _userManager = userManager;
    }

    [Authorize(Roles = "Admin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet("allOrders")]
    public async Task<IActionResult> GetAllOrders()
    {
        var orders = await _db.Orders
            .Include(o => o.OrderItems)
            .ToListAsync();

        return Ok(new
        {
            orders = orders.Select(MapOrderToResponse)
        });
    }

    [HttpGet("myOrders")]
    public async Task<IActionResult> MyOrders()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var orders = await _db.Orders
            .Where(o => o.UserId == Guid.Parse(user.Id))
            .Include(o => o.OrderItems)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();

        return Ok(new
        {
            orders = orders.Select(MapOrderToResponse)
        });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetOrderById(Guid id)
    {
        var order = await _db.Orders
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(o => o.OrderId == id);

        if (order == null)
            return NotFound(new { error = "Order not found" });

        // allow owner or admin
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var isAdmin = await _userManager.IsInRoleAsync(user, "Admin");
        if (!Guid.TryParse(user.Id, out var userGuid))
            return Unauthorized();

        if (!isAdmin && userGuid != order.UserId)
            return Forbid();

        return Ok(MapOrderToResponse(order));
    }

    [HttpPost("checkout")]
    public async Task<IActionResult> Checkout([FromBody] dokan.DTO.CreateOrderDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var productIds = dto.Items.Select(i => i.ProductId).ToList();
        var products = await _db.Products
            .Include(p => p.productDetails)
            .Include(p => p.productMeta)
            .Where(p => productIds.Contains(p.ProductID))
            .ToListAsync();

        if (products.Count() != productIds.Count)
            return BadRequest(new { error = "One or more products not found" });

        var orderItems = new List<OrderItem>();
        foreach (var item in dto.Items)
        {
            var product = products.First(p => p.ProductID == item.ProductId);
            var price = product.productMeta?.SalePrice ?? product.productDetails?.MarkedPrice ?? item.UnitPrice;

            orderItems.Add(new OrderItem
            {
                OrderItemId = Guid.NewGuid(),
                ProductId = product.ProductID,
                ProductTitle = product.productDetails?.productTitle ?? item.ProductTitle,
                UnitPrice = price,
                Quantity = item.Quantity
            });
        }

        var total = orderItems.Sum(i => i.UnitPrice * i.Quantity);

        var order = new Order
        {
            OrderId = Guid.NewGuid(),
            UserId = Guid.Parse(user.Id),
            Status = OrderStatus.Pending,
            ShippingAddress = dto.ShippingAddress,
            PaymentMethod = dto.PaymentMethod,
            SubTotal = total,
            TotalAmount = total,
            OrderItems = orderItems,
            CreatedAt = DateTime.UtcNow
        };

        await _db.Orders.AddAsync(order);
        await _db.SaveChangesAsync();

        return Ok(MapOrderToResponse(order));
    }

    private static object MapOrderToResponse(Order order) => new
    {
        id = order.OrderId,
        userId = order.UserId,
        status = order.Status.ToString().ToLower(),
        shippingAddress = order.ShippingAddress,
        paymentMethod = order.PaymentMethod,
        orderDate = order.CreatedAt,
        totalAmount = order.TotalAmount,
        items = order.OrderItems.Select(i => new
        {
            name = i.ProductTitle,
            price = i.UnitPrice,
            quantity = i.Quantity
        })
    };
}