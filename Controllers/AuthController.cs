using Backend.Data;
using Backend.DTOs;
using Backend.Models;

using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;

using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;

using System.Security.Claims;

using System.Text;

using System.Text.Json;
using System.IO;

using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
    [ApiController]

    [Route("api/[controller]")]

    public class AuthController : ControllerBase
    {
        private readonly ProductDbContext _context;

        private readonly IConfiguration _configuration;

        public AuthController(
            ProductDbContext context,
            IConfiguration configuration
        )
        {
            _context = context;

            _configuration = configuration;
        }

        private async Task LogActivity(
    string user,
    string action
)
{
    var path =
        Path.Combine(
            Directory.GetCurrentDirectory(),
            "activitylogs.json"
        );

    var logs =
        new List<object>();

    if (System.IO.File.Exists(path))
    {
        var existing =
            await System.IO.File.ReadAllTextAsync(path);

        if (!string.IsNullOrWhiteSpace(existing))
        {
            logs =
                JsonSerializer.Deserialize<List<object>>(existing)
                ?? new List<object>();
        }
    }

    logs.Add(new
    {
        User = user,
        Action = action,
        Timestamp = DateTime.Now
    });

    await System.IO.File.WriteAllTextAsync(
        path,
        JsonSerializer.Serialize(
            logs,
            new JsonSerializerOptions
            {
                WriteIndented = true
            }
        )
    );
}

        [HttpPost("register")]
        public async Task<IActionResult> Register(
            AuthRequest request
        )
        {
            var existingAdmin =
                await _context.Admins
                    .FirstOrDefaultAsync(a =>
                        a.Username == request.Username
                    );

            if (existingAdmin != null)
            {
                return BadRequest(
                    "Username already exists"
                );
            }

            var admin = new Admin
            {
                Username = request.Username,

                PasswordHash =
                    BCrypt.Net.BCrypt.HashPassword(
                        request.Password
                    )
            };

            _context.Admins.Add(admin);

            await _context.SaveChangesAsync();

            await LogActivity(
                admin.Username,
                "Registered"
            );

            return Ok("Admin registered");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(
            AuthRequest request
        )
        {
            var admin =
                await _context.Admins
                    .FirstOrDefaultAsync(a =>
                        a.Username == request.Username
                    );

            if (
                admin == null ||
                !BCrypt.Net.BCrypt.Verify(
                    request.Password,
                    admin.PasswordHash
                )
            )
            {
                return Unauthorized(
                    "Invalid credentials"
                );
            }

            var claims = new[]
            {
                new Claim(
                    ClaimTypes.Name,
                    admin.Username
                )
            };

            var key =
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(
                        _configuration["Jwt:Key"]!
                    )
                );

            var creds =
                new SigningCredentials(
                    key,
                    SecurityAlgorithms.HmacSha256
                );

                await LogActivity(
    admin.Username,
    "Logged In"
);

            var token =
                new JwtSecurityToken(
                    issuer:
                        _configuration["Jwt:Issuer"],

                    audience:
                        _configuration["Jwt:Audience"],

                    claims: claims,

                    expires:
                        DateTime.Now.AddHours(2),

                    signingCredentials: creds
                );

            return Ok(new
            {
                token =
                    new JwtSecurityTokenHandler()
                        .WriteToken(token)
            });
        }

        [Authorize]
[HttpPost("logout")]
public async Task<IActionResult> Logout()
{
    var username =
        User.Identity?.Name
        ?? "Unknown";

    await LogActivity(
        username,
        "Logged Out"
    );

    return Ok();
}

[Authorize]
[HttpGet("activity")]
public async Task<IActionResult> GetActivity()
{
    var path =
        Path.Combine(
            Directory.GetCurrentDirectory(),
            "activitylogs.json"
        );

    if (!System.IO.File.Exists(path))
    {
        return Ok(new List<object>());
    }

    var json =
        await System.IO.File
        .ReadAllTextAsync(path);

    return Content(
        json,
        "application/json"
    );
}

    }
}