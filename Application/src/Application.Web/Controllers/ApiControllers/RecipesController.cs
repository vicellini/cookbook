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



namespace CookBook.Controllers.ApiControllers
{
    [Produces("application/json")]
    [Route("~/recipe")]
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

        [Route("~/recipe/recipe")]
        public IActionResult Recipe()
        {
            return View();
        }

        [HttpGet("~/api/recipe")]
        public IEnumerable<Recipe> GetRecipes()
        {
            var userId = _userManager.GetUserId(User);
            return _context.Recipes.Where(q => q.ApplicationUser.Id == userId).ToList();
        }

        // GET api/recipes/5
        [HttpGet("~/api/recipe/{id}")]
        public async Task<IActionResult> GetRecipe(int id)
        {
           
            var userId = _userManager.GetUserId(User);
            Recipe recipe = await _context.Recipes
                .SingleOrDefaultAsync(m => m.ApplicationUser.Id == userId && m.Id == id);

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
            
            recipe.ApplicationUser.Id = _userManager.GetUserId(User);
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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != recipe.Id)
            {
                return BadRequest();
            }

            recipe.ApplicationUser.Id = _userManager.GetUserId(User);
            _context.Entry(recipe).State = EntityState.Modified;

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
            return NoContent();
        }


        // DELETE api/recipes/5
        [HttpDelete("~/api/recipe/{id}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = _userManager.GetUserId(User);

            Recipe recipe = await _context.Recipes
                .Where(q => q.ApplicationUser.Id == userId)
                .SingleOrDefaultAsync(m => m.Id == id);

            if (recipe == null)
            {
                return NotFound();
            }

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();

            return Ok(recipe);
        }

        private bool RecipeExists(int id)
        {
            var userId = _userManager.GetUserId(User);
            return _context.Recipes.Any(e => e.ApplicationUser.Id == userId && e.Id == id);
        }
    }
}
