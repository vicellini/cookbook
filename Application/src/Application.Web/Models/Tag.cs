using CookBook.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookBook.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }
      
        public Recipe Recipe { get; set; }

        public Tag()
        {

        }
    }
}
