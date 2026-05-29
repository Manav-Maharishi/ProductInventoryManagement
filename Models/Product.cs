using System.ComponentModel.DataAnnotations;
using System;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Backend.Models;


namespace Backend.Models
{
    public class Product
{
    [Key]

    public int Id { get; set; }

    [Required(ErrorMessage = "Name is required")]
    [StringLength(100, ErrorMessage = "Name too long")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Category is required")]
    public string Category { get; set; } = string.Empty;

    [Range(1, 1000000, ErrorMessage = "Price must be greater than 0")]
    public decimal Price { get; set; }
    
    [JsonIgnore]
    public bool IsDeleted {get; set;} = false;


    [Timestamp]
    public byte[]? RowVersion { get; set; } 
    
    [Required(ErrorMessage = "Quantity is Required")]
    public int quantity {get; set; }

    public string ImageUrl {get; set;} = string.Empty;

    public int WarehouseId { get; set; }
    public Warehouse Warehouse { get; set; }

}

}