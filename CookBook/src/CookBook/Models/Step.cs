using CookBook.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookBook.Models
{
    public class Step
    {
        public int Id { get; set; }
        public string Duration { get; set; }
        public string Description { get; set; }
        public Recipe Recipe { get; set; }
     
        public Step()
        {

        }
    }
}
