using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class ProductDbContext : DbContext
    {
        public ProductDbContext(
            DbContextOptions<ProductDbContext> options
        ) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        public DbSet<Warehouse> Warhouses { get; set; }

        public DbSet<Admin> Admins { get; set; }

        protected override void OnModelCreating(
            ModelBuilder modelBuilder
        )
        {
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);
        }
    }
}