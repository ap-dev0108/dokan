using dokan.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using dokan.DTO;
using dokan.Models.Entities;
using Microsoft.AspNetCore.Authorization;

namespace dokan.Controller;

[ApiController]
[Route("[controller]")]

public class AuthController : ControllerBase
{
    private readonly ApplicationDB _db;
    private readonly SignInManager<User> _signInManager;
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole> _role;
    
    public AuthController(ApplicationDB db, SignInManager<User> signInManager, UserManager<User> userManager,  RoleManager<IdentityRole> role)
    {
        _db = db;
        _signInManager = signInManager;
        _userManager = userManager;
        _role = role;
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

        var token = GenerateJwtToken(newUser.Email);
        return Ok(new { token });
    }

    [HttpPost("/login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
    {
        var checkEmail = await _userManager.FindByEmailAsync(loginDto.usermail);

        if (checkEmail == null) return NotFound("Your email cannot be found");
        
        var checkCredentials = await _signInManager.CheckPasswordSignInAsync(checkEmail, loginDto.password, false);
        if (!checkCredentials.Succeeded) return BadRequest(new { error = "Username or password is incorrect" });
        
        var token = GenerateJwtToken(checkEmail.Email);
        return Ok(new { token });
    }

    [Authorize]
    [HttpGet("profile")]
    public IActionResult GetProfile()
    {
        string user = User.Identity.Name;
        
        return Ok(new
        {
            user,
            authenticated = User.Identity.IsAuthenticated
        });
    }

    private string GenerateJwtToken(string email)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("d74c3b2e07e5ec0f12f96abce0cbe2e53a51a4deb1838fd9fe9bfa38498dfddb"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: "localhost:7258/swagger/index.html",
            audience: "https://api.yourdomain.com",
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}