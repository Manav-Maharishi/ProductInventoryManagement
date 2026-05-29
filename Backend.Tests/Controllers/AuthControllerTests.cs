using Backend.Controllers;
using Backend.Data;
using Backend.DTOs;
using Backend.Models;

using FluentAssertions;

using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;

using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Backend.Tests.Controllers;

public class AuthControllerTests
{
    private ProductDbContext GetDbContext()
    {
        var options =
            new DbContextOptionsBuilder<ProductDbContext>()
            .UseInMemoryDatabase(
                Guid.NewGuid().ToString()
            )
            .Options;

        return new ProductDbContext(
            options
        );
    }

    private IConfiguration GetConfiguration()
    {
        return new ConfigurationBuilder()

            .AddInMemoryCollection(
                new Dictionary<string,string?>
                {
                    {
                        "Jwt:Key",
                        "ThisIsMyVeryLongSecretKeyForTesting123"
                    },

                    {
                        "Jwt:Issuer",
                        "TestIssuer"
                    },

                    {
                        "Jwt:Audience",
                        "TestAudience"
                    }
                }
            )

            .Build();
    }

    [Fact]
    public async Task Login_InvalidCredentials_ReturnsUnauthorized()
    {
        var context =
            GetDbContext();

        var controller =
            new AuthController(
                context,
                GetConfiguration()
            );

        var request =
            new AuthRequest
            {
                Username =
                    "wrong",

                Password =
                    "wrong"
            };

        var result =
            await controller.Login(
                request
            );

        result
            .Should()
            .BeOfType<
                UnauthorizedObjectResult
            >();
    }

    [Fact]
public async Task Register_DuplicateUsername_ReturnsBadRequest()
{
    var context =
        GetDbContext();

    context.Admins.Add(
        new Admin
        {
            Username =
                "manav",

            PasswordHash =
                "abc"
        }
    );

    await context.SaveChangesAsync();

    var controller =
        new AuthController(
            context,
            GetConfiguration()
        );

    var request =
        new AuthRequest
        {
            Username =
                "manav",

            Password =
                "123"
        };

    var result =
        await controller.Register(
            request
        );

    result
        .Should()
        .BeOfType<
            BadRequestObjectResult
        >();
}
 
 [Fact]
public async Task Register_NewUser_ReturnsOk()
{
    var context =
        GetDbContext();

    var controller =
        new AuthController(
            context,
            GetConfiguration()
        );

    var request =
        new AuthRequest
        {
            Username =
                "newadmin",

            Password =
                "password123"
        };

    var result =
        await controller.Register(
            request
        );

    result
        .Should()
        .BeOfType<
            OkObjectResult
        >();

    context.Admins.Count()
        .Should()
        .Be(1);

    context.Admins
        .First()
        .Username
        .Should()
        .Be(
            "newadmin"
        );
}

   [Fact]
public async Task Login_ValidCredentials_ReturnsToken()
{
    var context =
        GetDbContext();

    context.Admins.Add(
        new Admin
        {
            Username =
                "admin",

            PasswordHash =
                BCrypt.Net.BCrypt.HashPassword(
                    "pass123"
                )
        }
    );

    await context.SaveChangesAsync();

    var controller =
        new AuthController(
            context,
            GetConfiguration()
        );

    var request =
        new AuthRequest
        {
            Username =
                "admin",

            Password =
                "pass123"
        };

    var result =
        await controller.Login(
            request
        );

    result
        .Should()
        .BeOfType<
            OkObjectResult
        >();

    var ok =
        result
        as OkObjectResult;

    ok!.Value
        .Should()
        .NotBeNull();
}
  [Fact]
public async Task GetActivity_FileMissing_ReturnsEmpty()
{
    var path =
        Path.Combine(
            Directory.GetCurrentDirectory(),
            "activitylogs.json"
        );

    if (
        File.Exists(
            path
        )
    )
    {
        File.Delete(
            path
        );
    }

    var controller =
        new AuthController(
            GetDbContext(),
            GetConfiguration()
        );

    var result =
        await controller
            .GetActivity();

    result
        .Should()
        .BeOfType<
            OkObjectResult
        >();
}
  [Fact]
public async Task Logout_ReturnsOk()
{
    var controller =
        new AuthController(
            GetDbContext(),
            GetConfiguration()
        );

    controller.ControllerContext =
        new ControllerContext
        {
            HttpContext =
                new DefaultHttpContext()
        };

    controller
        .ControllerContext
        .HttpContext
        .User =
            new ClaimsPrincipal(
                new ClaimsIdentity(
                    new[]
                    {
                        new Claim(
                            ClaimTypes.Name,
                            "admin"
                        )
                    }
                )
            );

    var result =
        await controller
            .Logout();

    result
        .Should()
        .BeOfType<
            OkResult
        >();
}
}