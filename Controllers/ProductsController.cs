using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;
using System.Security.Claims;
using ClosedXML.Excel;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly ProductDbContext _context;

        public ProductsController(ProductDbContext context)
        {
            _context = context;
        }

        private async Task LogActivity(
    string action
)
{
    var user =
        User
        ?.FindFirst(
            ClaimTypes.Name
        )
        ?.Value
        ?? "Unknown";

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
                ?? new();
        }
    }

    logs.Add(
        new
        {
            User = user,
            Action = action,
            Timestamp = DateTime.Now
        }
    );

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

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            // var products = await _context.Products.ToListAsync();
            return Ok(await _context.Products.Where(p => !p.IsDeleted).ToListAsync());
        }

        // [HttpPost]
        // public async Task<IActionResult> AddProduct(Product product)
        // {
        //     if(!ModelState.IsValid)
        //     {
        //         return BadRequest(ModelState);
        //     }
        //     product.IsDeleted = false;
        //      _context.Products.Add(product);
        //      await _context.SaveChangesAsync();
        //      return Ok(product);
        // }

        [HttpPost]
public async Task<IActionResult> AddProduct(
    [FromForm] ProductCreateDto dto
)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    if (dto.Image == null || dto.Image.Length == 0)
    {
        return BadRequest("Image is required");
    }

    string cleanProductName =
        Regex.Replace(
            dto.Name.ToLower(),
            @"[^a-z0-9]",
            ""
        );

    string cleanCategory =
        dto.Category
            .ToLower()
            .Replace(" ", "");

    string extension =
        Path.GetExtension(
            dto.Image.FileName
        );

    string fileName =
        cleanProductName + extension;

    string folderPath =
        Path.Combine(
            Directory.GetCurrentDirectory(),
            "wwwroot",
            "images",
            "products",
            cleanCategory
        );

    Directory.CreateDirectory(folderPath);

    string fullImagePath =
        Path.Combine(
            folderPath,
            fileName
        );

    using (
        var stream =
            new FileStream(
                fullImagePath,
                FileMode.Create
            )
    )
    {
        await dto.Image.CopyToAsync(stream);
    }

    string imageUrl =
        $"/images/products/{cleanCategory}/{fileName}";

        int warehouseId =
dto.WarehouseId == 0
? 1
: dto.WarehouseId;



string normalizedName =
Regex.Replace(
dto.Name.ToLower(),
@"[^a-z0-9]",
""
);

string normalizedCategory =
Regex.Replace(
dto.Category.ToLower(),
@"[^a-z0-9]",
""
);

var existingProducts =
await _context
.Products
.Where(
p =>
!p.IsDeleted
&&
p.WarehouseId
==
warehouseId
)
.ToListAsync();

bool duplicate =
existingProducts.Any(
p =>

Regex.Replace(
p.Name.ToLower(),
@"[^a-z0-9]",
""
)
==
normalizedName

&&

Regex.Replace(
p.Category.ToLower(),
@"[^a-z0-9]",
""
)
==
normalizedCategory

);

if (duplicate)
{
return BadRequest(
"Duplicate product not allowed"
);
}

    Product product = new Product
{
    Name = dto.Name,

    Category = dto.Category,

    Price = dto.Price,

    quantity = dto.Quantity,

    // WarehouseId =
    //     dto.WarehouseId == 0
    //     ? 1
    //     : dto.WarehouseId,

    WarehouseId =
warehouseId,


    ImageUrl = imageUrl,

    IsDeleted = false
};

    _context.Products.Add(product);

    await _context.SaveChangesAsync();

    await LogActivity(
        $"Added Product: {product.Name}"
    );

    return Ok(product);
}

public class ProductCreateDto
{
    public string Name { get; set; }

    public string Category { get; set; }

    public decimal Price { get; set; }

    public int Quantity { get; set; }

    public int WarehouseId { get; set; }

    public IFormFile Image { get; set; }
}
public class BulkUploadDto
{
    public IFormFile ProductsFile { get; set; }

    public List<IFormFile> Images { get; set; }
}
[HttpPost("bulk")]
public async Task<IActionResult> AddProductsBulk(
    [FromForm]
    BulkUploadDto request
)
{
    try
    {
        if (
            request.ProductsFile ==
            null
        )
        {
            return BadRequest(
                "products.json required"
            );
        }

        using var reader =
            new StreamReader(
                request
                .ProductsFile
                .OpenReadStream()
            );

        string json =
            await reader
            .ReadToEndAsync();

        var products =
            System.Text.Json
            .JsonSerializer
            .Deserialize<
                List<ProductCreateBulkDto>
            >(
                json,
                new System.Text.Json
                .JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive =
                        true
                }
            );

        if (
            products == null
        )
        {
            return BadRequest(
                "Invalid JSON"
            );
        }

        List<Product> inserted =
            new();

        foreach (
            var dto
            in products
        )
        {
            string cleanName =
                Regex.Replace(
                    dto.Name
                    .ToLower(),

                    @"[^a-z0-9]",

                    ""
                );

            string category =
                dto.Category
                .ToLower()
                .Replace(
                    " ",
                    ""
                );

                int warehouseId =
dto.WarehouseId == 0
? 1
: dto.WarehouseId;

var existingProducts =
await _context
.Products
.Where(
p =>
!p.IsDeleted
&&
p.WarehouseId
==
warehouseId
)
.ToListAsync();

bool duplicate =
existingProducts.Any(
p =>

Regex.Replace(
p.Name.ToLower(),
@"[^a-z0-9]",
""
)

==

cleanName

&&

Regex.Replace(
p.Category.ToLower(),
@"[^a-z0-9]",
""
)

==

category
);

if (duplicate)
{
return BadRequest(
$"Duplicate product detected for {dto.Name}. Entire import cancelled."
);
}

            var image =
                request
                .Images
                .FirstOrDefault(
                    img =>
                        Regex.Replace(
                            Path
                            .GetFileNameWithoutExtension(
                                img.FileName
                            )
                            .ToLower(),

                            @"[^a-z0-9]",

                            ""
                        )
                        ==
                        cleanName
                );

            if (
                image == null
            )
            {
                continue;
            }

            string extension =
                Path.GetExtension(
                    image.FileName
                );

            string fileName =
                cleanName +
                extension;

            string folder =
                Path.Combine(
                    Directory
                    .GetCurrentDirectory(),

                    "wwwroot",

                    "images",

                    "products",

                    category
                );

            Directory
            .CreateDirectory(
                folder
            );

            string fullPath =
                Path.Combine(
                    folder,
                    fileName
                );

            using (
                var stream =
                    new FileStream(
                        fullPath,
                        FileMode.Create
                    )
            )
            {
                await image
                .CopyToAsync(
                    stream
                );
            }

            Product p =
new Product
{
    Name = dto.Name,

    Category = dto.Category,

    Price = dto.Price,

    quantity = dto.Quantity,

    WarehouseId =
        warehouseId,

    ImageUrl =
$"/images/products/{category}/{fileName}",

    IsDeleted = false
};

            inserted
            .Add(
                p
            );

            _context
            .Products
            .Add(
                p
            );
        }

        await _context
        .SaveChangesAsync();

        await LogActivity(
            $"Bulk Uploaded {inserted.Count} Products"
        );

        return Ok(
            inserted
        );
    }

    catch (
        Exception ex
    )
    {
        return BadRequest(
            ex.ToString()
        );
    }
}

public class ProductCreateBulkDto
{
    public string Name { get; set; }

    public string Category { get; set; }

    public decimal Price { get; set; }

    public int Quantity { get; set; }

    public int WarehouseId { get; set; }
}

        [HttpPut("{id}")]
public async Task<IActionResult> UpdateProduct(int id, Product updatedProduct)
{
    if (id != updatedProduct.Id)
        return BadRequest();

    _context.Entry(updatedProduct).State = EntityState.Modified;

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        return Conflict("Product was modified by another user");
    }

    return Ok(updatedProduct);
}

[HttpPut("{id}/quantity")]
public async Task<IActionResult> UpdateQuantity(
    int id,
    [FromBody] QuantityUpdate request
)
{
    var product =
        await _context.Products
        .FirstOrDefaultAsync(
            p => p.Id == id
        );

    if (product == null)
    {
        return NotFound();
    }

    _context
        .Entry(product)
        .Property(
            p => p.RowVersion
        )
        .OriginalValue =
            request.RowVersion;

            int oldQuantity = product.quantity;

    product.quantity +=
        request.Change;

    if (product.quantity < 0)
    {
        product.quantity = 0;
    }

    try
    {
        await _context
            .SaveChangesAsync();
        
        await LogActivity(
            request.Change > 0
            ? $"Increased Quantity: {product.Name} ({oldQuantity} -> {product.quantity})"
            : $"Decreased Quantity: {product.Name} ({oldQuantity} -> {product.quantity})"

        );
    }

    catch (
        DbUpdateConcurrencyException
    )
    {
        return Conflict(
            new
            {
                message =
                    "Product modified by another admin"
            }
        );
    }

    return Ok(product);
}

public class QuantityUpdate
{
    public int Change { get; set; }
    public byte[]? RowVersion { get; set; }
}

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
             var product = await _context.Products.FindAsync(id);
             if(product == null)
             {
                return NotFound();
             }
             product.IsDeleted = true;
            //  _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            await LogActivity(
                $"Removed Product: {product.Name}"

            );
             return Ok("product deleted successfully");
        }
        [HttpGet("deleted")]
        public async Task<IActionResult> GetDeletedProducts()
        {
            return Ok(await _context.Products.Where(p => p.IsDeleted).ToListAsync());
        }
        [HttpPut("restore/{id}")]
        public async Task<IActionResult> RestoreProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if(product == null)
            {
                return NotFound();
                
            }
            product.IsDeleted = false;
                await _context.SaveChangesAsync();

                await LogActivity(
                   $"Restored Product: {product.Name}"
                );
                return Ok("Restored");
        }
        [HttpGet("filter")]
        public async Task<IActionResult> FilterProducts(
        string? category,
        decimal? minPrice,
        decimal? maxPrice)
        {
          var query = _context.Products.AsQueryable();

          if (!string.IsNullOrEmpty(category))
    {
        query = query.Where(p => p.Category == category);
    }

    if (minPrice.HasValue)
    {
        query = query.Where(p => p.Price >= minPrice.Value);
    }

    if (maxPrice.HasValue)
    {
        query = query.Where(p => p.Price <= maxPrice.Value);
    }

    var result = await query.ToListAsync();

    return Ok(result);
}


   [HttpGet("export")]
public async Task<IActionResult> ExportInventory()
{
    var products =
        await _context
        .Products
        .Where(
            p => !p.IsDeleted
        )
        .ToListAsync();

    using var workbook =
        new XLWorkbook();

    var sheet =
        workbook
        .Worksheets
        .Add(
            "Inventory"
        );

    sheet.Cell(1, 1).Value =
        "Name";

    sheet.Cell(1, 2).Value =
        "Category";

    sheet.Cell(1, 3).Value =
        "Quantity";

    sheet.Cell(1, 4).Value =
        "Price";

    sheet.Cell(1, 5).Value =
        "Warehouse";

    for (
        int i = 0;
        i < products.Count;
        i++
    )
    {
        var p =
            products[i];

        sheet.Cell(
            i + 2,
            1
        ).Value =
            p.Name;

        sheet.Cell(
            i + 2,
            2
        ).Value =
            p.Category;

        sheet.Cell(
            i + 2,
            3
        ).Value =
            p.quantity;

        sheet.Cell(
            i + 2,
            4
        ).Value =
            p.Price;

        sheet.Cell(
            i + 2,
            5
        ).Value =
            p.WarehouseId;
    }

    sheet.Columns()
        .AdjustToContents();

    using var stream =
        new MemoryStream();

    workbook.SaveAs(
        stream
    );

    stream.Position =
        0;

    return File(
        stream.ToArray(),

        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

        "inventory_snapshot.xlsx"
    );
}




  
    }
}

