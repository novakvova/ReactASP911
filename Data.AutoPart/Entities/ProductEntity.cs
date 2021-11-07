﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.AutoPart.Entities
{
    [Table("tblProducts")]
    public class ProductEntity : BaseEntity<int>
    {
        [Required, StringLength(500)]
        public string Name { get; set; }
        [Required, StringLength(255)]
        public string Image { get; set; }
        public int Priority { get; set; }
        public decimal Price { get; set; }
    }
}
