using System.Text.Json;
using Backend.Data;
using Backend.Models;

namespace Backend.Services
{
    public class ProductSeeder
    {
        private readonly ProductDbContext _context;

        public ProductSeeder(ProductDbContext context)
        {
            _context = context;
        }

        public async Task SeedProductsAsync()
        {
            if (_context.Products.Any())
                return;

            var jsonPath = Path.Combine(
                Directory.GetCurrentDirectory(),
                "SeedData",
                "products.json");

            var jsonData = await File.ReadAllTextAsync(jsonPath);

            var options = new JsonSerializerOptions
{
    PropertyNameCaseInsensitive = true
};

var products = JsonSerializer.Deserialize<List<Product>>(jsonData, options);


            if (products != null)
            {
                await _context.Products.AddRangeAsync(products);
                await _context.SaveChangesAsync();
            }
        }
    }
}
