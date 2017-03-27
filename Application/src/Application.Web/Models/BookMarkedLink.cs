using CookBook.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Web.Models
{
    public class BookMarkedLink
    {


        public int Id { get; set; }
        public string BookMarkName { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public string Link { get; set; }

        public BookMarkedLink()
        {

        }
    }
}
