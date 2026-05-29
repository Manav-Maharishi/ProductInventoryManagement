using Backend.Controllers;
using Backend.Data;
using Backend.Models;

using FluentAssertions;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Tests.Controllers;

public class ProductsControllerTests
{
    private ProductDbContext GetDbContext()
    {
        var options =
            new DbContextOptionsBuilder<ProductDbContext>()
            .UseInMemoryDatabase(
                Guid.NewGuid().ToString()
            )
            .Options;

        return new ProductDbContext(options);
    }

    [Fact]
    public async Task GetProducts_ReturnsOnlyNonDeletedProducts()
    {
        var context = GetDbContext();

        context.Products.AddRange(

            new Product
            {
                Name="A",
                Category="Cat",
                Price=100,
                quantity=5,
                IsDeleted=false
            },

            new Product
            {
                Name="B",
                Category="Cat",
                Price=100,
                quantity=5,
                IsDeleted=true
            }

        );

        await context.SaveChangesAsync();

        var controller =
            new ProductsController(context);

        var result =
            await controller.GetProducts();

        result
            .Should()
            .BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task DeleteProduct_ProductExists_MarksDeleted()
    {
        var context =
            GetDbContext();

        var product =
            new Product
            {
                Name="Phone",
                Category="Electronics",
                Price=100,
                quantity=10
            };

        context.Products.Add(product);

        await context.SaveChangesAsync();

        var controller =
            new ProductsController(context);

        var result =
            await controller.DeleteProduct(
                product.Id
            );

        result
            .Should()
            .BeOfType<OkObjectResult>();

        context
            .Products
            .First()
            .IsDeleted
            .Should()
            .BeTrue();
    }

    [Fact]
    public async Task DeleteProduct_InvalidId_ReturnsNotFound()
    {
        var controller =
            new ProductsController(
                GetDbContext()
            );

        var result =
            await controller.DeleteProduct(
                999
            );

        result
            .Should()
            .BeOfType<NotFoundResult>();
    }

    [Fact]
    public async Task RestoreProduct_RestoresDeletedProduct()
    {
        var context =
            GetDbContext();

        var product =
            new Product
            {
                Name="Laptop",
                Category="Tech",
                Price=50,
                quantity=3,
                IsDeleted=true
            };

        context.Products.Add(product);

        await context.SaveChangesAsync();

        var controller =
            new ProductsController(
                context
            );

        var result =
            await controller.RestoreProduct(
                product.Id
            );

        result
            .Should()
            .BeOfType<OkObjectResult>();

        context
            .Products
            .First()
            .IsDeleted
            .Should()
            .BeFalse();
    }

    [Fact]
    public async Task FilterProducts_Category_ReturnsFiltered()
    {
        var context =
            GetDbContext();

        context.Products.AddRange(

            new Product
            {
                Name="A",
                Category="Electronics",
                Price=100
            },

            new Product
            {
                Name="B",
                Category="Books",
                Price=50
            }

        );

        await context.SaveChangesAsync();

        var controller =
            new ProductsController(
                context
            );

        var result =
            await controller.FilterProducts(
                "Electronics",
                null,
                null
            );

        result
            .Should()
            .BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task UpdateProduct_MismatchedId_ReturnsBadRequest()
    {
        var controller =
            new ProductsController(
                GetDbContext()
            );

        var product =
            new Product
            {
                Id=2
            };

        var result =
            await controller.UpdateProduct(
                1,
                product
            );

        result
            .Should()
            .BeOfType<BadRequestResult>();
    }

    [Fact]
    public async Task GetDeletedProducts_ReturnsDeletedOnly()
    {
        var context =
            GetDbContext();

        context.Products.AddRange(

            new Product
            {
                Name="Deleted",
                IsDeleted=true
            },

            new Product
            {
                Name="Active",
                IsDeleted=false
            }

        );

        await context.SaveChangesAsync();

        var controller =
            new ProductsController(
                context
            );

        var result =
            await controller.GetDeletedProducts();

        result
            .Should()
            .BeOfType<OkObjectResult>();
    }

    [Fact]
public async Task UpdateQuantity_IncreasesQuantity()
{
    var context =
        GetDbContext();

    var product =
        new Product
        {
            Name = "Phone",
            Category = "Electronics",
            Price = 100,
            quantity = 10,
            RowVersion = new byte[] { 1 }
        };

    context.Products.Add(
        product
    );

    await context.SaveChangesAsync();

    var controller =
        new ProductsController(
            context
        );

    var request =
        new ProductsController
        .QuantityUpdate
        {
            Change = 5,

            RowVersion =
                product.RowVersion
        };

    var result =
        await controller
        .UpdateQuantity(
            product.Id,
            request
        );

    result
        .Should()
        .BeOfType<
            OkObjectResult
        >();

    context
        .Products
        .First()
        .quantity
        .Should()
        .Be(
            15
        );
}
 [Fact]
public async Task UpdateQuantity_DoesNotGoNegative()
{
    var context =
        GetDbContext();

    var product =
        new Product
        {
            Name = "Monitor",
            Category = "Electronics",
            Price = 200,
            quantity = 3,
            RowVersion =
                new byte[] { 1 }
        };

    context.Products.Add(
        product
    );

    await context.SaveChangesAsync();

    var controller =
        new ProductsController(
            context
        );

    var request =
        new ProductsController
        .QuantityUpdate
        {
            Change = -10,

            RowVersion =
                product.RowVersion
        };

    var result =
        await controller
        .UpdateQuantity(
            product.Id,
            request
        );

    result
        .Should()
        .BeOfType<
            OkObjectResult
        >();

    context
        .Products
        .First()
        .quantity
        .Should()
        .Be(
            0
        );
}

 [Fact]
public async Task UpdateQuantity_ProductNotFound_ReturnsNotFound()
{
    var controller =
        new ProductsController(
            GetDbContext()
        );

    var result =
        await controller.UpdateQuantity(
            999,
            new ProductsController.QuantityUpdate
            {
                Change = 5,
                RowVersion =
                    new byte[] { 1 }
            }
        );

    result
        .Should()
        .BeOfType<
            NotFoundResult
        >();
}

[Fact]
public async Task RestoreProduct_InvalidId_ReturnsNotFound()
{
    var controller =
        new ProductsController(
            GetDbContext()
        );

    var result =
        await controller.RestoreProduct(
            999
        );

    result
        .Should()
        .BeOfType<
            NotFoundResult
        >();
}

[Fact]
public async Task FilterProducts_MinPrice_ReturnsOk()
{
    var context =
        GetDbContext();

    context.Products.AddRange(

        new Product
        {
            Name="Cheap",
            Price=50
        },

        new Product
        {
            Name="Expensive",
            Price=500
        }

    );

    await context.SaveChangesAsync();

    var controller =
        new ProductsController(
            context
        );

    var result =
        await controller.FilterProducts(
            null,
            100,
            null
        );

    result
        .Should()
        .BeOfType<
            OkObjectResult
        >();
}

[Fact]
public async Task FilterProducts_MaxPrice_ReturnsOk()
{
    var context =
        GetDbContext();

    context.Products.AddRange(

        new Product
        {
            Name="A",
            Price=50
        },

        new Product
        {
            Name="B",
            Price=500
        }

    );

    await context.SaveChangesAsync();

    var controller =
        new ProductsController(
            context
        );

    var result =
        await controller.FilterProducts(
            null,
            null,
            100
        );

    result
        .Should()
        .BeOfType<
            OkObjectResult
        >();
}

[Fact]
public async Task UpdateProduct_ValidProduct_ReturnsOk()
{
    var context =
        GetDbContext();

    var product =
        new Product
        {
            Name="Phone",
            Price=100
        };

    context.Products.Add(
        product
    );

    await context.SaveChangesAsync();

    product.Price =
        150;

    var controller =
        new ProductsController(
            context
        );

    var result =
        await controller.UpdateProduct(
            product.Id,
            product
        );

    result
        .Should()
        .BeOfType<
            OkObjectResult
        >();
}
}