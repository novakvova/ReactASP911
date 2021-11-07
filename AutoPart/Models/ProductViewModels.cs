using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoPart.Models
{
    public class ProductAddViewModel
    {
        public string Name { get; set; }
        public string Priority { get; set; }
        public decimal Price { get; set; }
        public IFormFile Image { get; set; }
    }
    public class ProductItemViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
    }
}
