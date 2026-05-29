using Backend.Controllers;
using Backend.Data;

using FluentAssertions;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;

namespace Backend.Tests.Controllers;

public class ProductUploadTests
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

    [Fact]
    public async Task AddProduct_NoImage_ReturnsBadRequest()
    {
        var context =
            GetDbContext();

        var controller =
            new ProductsController(
                context
            );

        var dto =
            new ProductsController
            .ProductCreateDto
            {
                Name =
                    "Phone",

                Category =
                    "Electronics",

                Price =
                    100,

                Quantity =
                    5,

                WarehouseId =
                    1,

                Image =
                    null!
            };

        var result =
            await controller
            .AddProduct(
                dto
            );

        result
            .Should()
            .BeOfType<
                BadRequestObjectResult
            >();
    }

    [Fact]
    public async Task AddProductsBulk_MissingJson_ReturnsBadRequest()
    {
        var controller =
            new ProductsController(
                GetDbContext()
            );

        var dto =
            new ProductsController
            .BulkUploadDto
            {
                ProductsFile =
                    null!,

                Images =
                    new()
            };

        var result =
            await controller
            .AddProductsBulk(
                dto
            );

        result
            .Should()
            .BeOfType<
                BadRequestObjectResult
            >();
    }
}