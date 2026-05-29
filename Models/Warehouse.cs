using System.Collections.Generic;

namespace Backend.Models
{
    public class Warehouse
    {
        public int Id { get; set; }

        public string Location { get; set; }

        public List<Product> Products { get; set; }
            = new();
    }
}