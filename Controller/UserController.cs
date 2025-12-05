using dokan.Database;
using dokan.DTO;
using dokan.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace dokan.Controller;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly ApplicationDB _db;
    public UserController(ApplicationDB db)
    {
        _db = db;
    }

    [HttpGet("/allUsers")]
    public IActionResult GetAllUsers()
    {
        var existingUser = _db.Users.ToList();
        if (existingUser == null) return NotFound();

        return Ok(existingUser);
    }
}