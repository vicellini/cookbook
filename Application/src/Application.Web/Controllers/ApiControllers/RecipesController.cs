using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CookBook.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using CookBook.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Application.Web.Models;

namespace CookBook.Controllers.ApiControllers
{
    [Produces("application/json")]

    [Authorize(ActiveAuthenticationSchemes = "Identity.Application")]
    public class RecipesController : Controller
    {
        private readonly CookBookContext _context;

        private UserManager<ApplicationUser> _userManager { get; set; }
        public CookBookContext Context { get; set; }


        public RecipesController(UserManager<ApplicationUser> userManager, CookBookContext context)
        {
            _userManager = userManager;
            _context = context;
        }
        
        [HttpGet("~/api/recipe")]
        public IEnumerable<Recipe> GetRecipes()
        {
            var userId = _userManager.GetUserId(User);
            var recipes = _context.Recipes.Where(q => q.ApplicationUser.Id == userId)

              .Include(q => q.Ingredients)
              .Include(q => q.Steps)
              .Include(q => q.Tags)
              .ToList();


            return recipes;
        }
                
        // GET api/recipes/5
        [HttpGet("~/api/recipe/{id}")]
        public async Task<IActionResult> GetRecipe(int id)
        {

            var userId = _userManager.GetUserId(User);
            Recipe recipe = await _context.Recipes
                  .Include(q => q.Ingredients)
                    .Include(q => q.Steps)
                  .Include(q => q.Tags)
                .SingleOrDefaultAsync(m => m.ApplicationUser.Id == userId && m.Id == id)
                ;

            if (recipe == null)
            {
                return NotFound();
            }

            return Ok(recipe);
        }
        
        // POST api/recipes
        [HttpPost("~/api/recipe")]
        public async Task<IActionResult> PostRecipe([FromBody]Recipe recipe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = _userManager.GetUserAsync(User);
            recipe.ApplicationUser = await user;
            _context.Recipes.Add(recipe);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                if (RecipeExists(recipe.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }
            return Ok();
        }
        // PUT api/recipes/5
        [HttpPut("~/api/recipe/{id}")]
        public async Task<IActionResult> PutRecipe(int id, [FromBody] Recipe recipe)
        {
            recipe.Id = id;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != recipe.Id)
            {
                return BadRequest();
            }
        
            _context.Entry(recipe).State = EntityState.Modified;

            var existingRecipe = _context.Recipes.FirstOrDefault(q=>q.Id==id);
            existingRecipe = recipe;
         

            try
            {
                await _context.SaveChangesAsync();
               
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!RecipeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok();
        }


        // DELETE api/recipes/5
        [HttpDelete("~/api/recipe/{id}")]
        public async Task<IActionResult> DeleteRecipe(int id, [FromBody] Recipe recipe)
        {
            recipe.Id = id;


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = _userManager.GetUserId(User);

            recipe = await _context.Recipes
                .Where(q => q.ApplicationUser.Id == userId)
                .SingleOrDefaultAsync(m => m.Id == id);

            if (recipe == null)
            {
                return NotFound();
            }

            _context.Recipes.Remove(recipe);
         

            return Ok();
        }

        private bool RecipeExists(int id)
        {
            var userId = _userManager.GetUserId(User);
            return _context.Recipes.Any(e => e.ApplicationUser.Id == userId && e.Id == id);
        }

    }
}
