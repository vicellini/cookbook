using CookBook.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookBook.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public List<Ingredient> Ingredients { get; set; }
        public List<Step> Steps { get; set; }
        public List<Tag> Tags { get; set; }
        public string Category { get; set; }
        public int Rating { get; set; }


        public Recipe()
        {
            ApplicationUser = new ApplicationUser();
            Ingredients = new List<Ingredient>();
            Steps = new List<Step>();
            Tags = new List<Tag>();

        }


    }
}
