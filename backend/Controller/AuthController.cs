using dokan.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using dokan.DTO;
using dokan.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace dokan.Controller;

[ApiController]
[Route("[controller]")]

public class AuthController : ControllerBase
{
    private readonly ApplicationDB _db;
    private readonly SignInManager<User> _signInManager;
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole> _role;
    private readonly IConfiguration _configuration;
    
    public AuthController(ApplicationDB db, SignInManager<User> signInManager, UserManager<User> userManager,  RoleManager<IdentityRole> role, IConfiguration configuration)
    {
        _db = db;
        _signInManager = signInManager;
        _userManager = userManager;
        _role = role;
        _configuration = configuration;
    }
    
    [HttpPost("/register")]
    public async Task<IActionResult> Register([FromBody] RegisterDTO registerDto)
    {
        var existingUser = await _userManager.FindByEmailAsync(registerDto.email);

        if (existingUser != null)
            return Conflict("User exists");

        var newUser = new User
        {
            Email = registerDto.email,
            UserName = registerDto.username,
            PhoneNumber = registerDto.phoneNum
        };

        var results = await _userManager.CreateAsync(newUser, registerDto.password);

        if (!results.Succeeded) return BadRequest(results.Errors);
        
        await _userManager.AddToRoleAsync(newUser, "User");

        var token = await GenerateJwtToken(newUser);
        return Ok(new { token });
    }

    [HttpPost("/login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
    {
        var checkEmail = await _userManager.FindByEmailAsync(loginDto.usermail);

        if (checkEmail == null) return NotFound("Your email cannot be found");
        
        var checkCredentials = await _signInManager.CheckPasswordSignInAsync(checkEmail, loginDto.password, false);
        if (!checkCredentials.Succeeded) return BadRequest(new { error = "Username or password is incorrect" });
        
        var token = await GenerateJwtToken(checkEmail);
        return Ok(new { token });
    }

    [Authorize]
    [HttpGet("profile")]
    public IActionResult GetProfile()
    {
        string? user = User.Identity?.Name;
        
        return Ok(new
        {
            user,
            authenticated = User.Identity?.IsAuthenticated ?? false
        });
    }

    private async Task<string> GenerateJwtToken(User user)
    {
        var jwtSettings = _configuration.GetSection("Jwt");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"] ?? throw new InvalidOperationException("JWT Key not found in configuration")));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var roles = await _userManager.GetRolesAsync(user);
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.UserName ?? user.Email ?? ""),
            new Claim(ClaimTypes.Email, user.Email ?? ""),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}