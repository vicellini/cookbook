using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CookBook.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using CookBook.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using CookBook.Controllers.ApiControllers;


namespace CookBook.Controllers.ApiControllers
{
    [Produces("application/json")]
    // [Route("~/ingredient")]
    public class IngredientsController : Controller
    {
        private readonly CookBookContext _context;

        private UserManager<ApplicationUser> _userManager { get; set; }
        public CookBookContext Context { get; set; }


        public IngredientsController(UserManager<ApplicationUser> userManager, CookBookContext context)
        {
            _userManager = userManager;
            _context = context;
        }



        [Route("~/api/recipes/{recipeId}/ingredients")]
        public IEnumerable<Ingredient> GetAll()
        {
            var userId = _userManager.GetUserId(User);

            return _context.Ingredients
                .Where(q => q.Recipe.ApplicationUser.Id == userId).ToList();
        }


        [HttpGet("api/recipes/{recipesId}/ingredients/{ingredientId}")]
        public async Task<IActionResult> GetIngredient(int recipeId, int ingredientId)
        {
            var userId = _userManager.GetUserId(User);
            Ingredient ingredient = await _context.Ingredients
                .SingleOrDefaultAsync(m => m.Recipe.ApplicationUser.Id == userId && m.Recipe.Id == m.Id);

            if (ingredient == null)
            {
                return NotFound();
            }

            return Ok(ingredient);
        }



        [HttpPost("~/api/recipes/{recipeId}/ingredients")]
        public async Task<IActionResult> PostIngredient(int recipeId, [FromBody]Ingredient ingredient)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var recipe = _context.Recipes.FirstOrDefault(q => q.Id == recipeId);
            ingredient.Recipe.Id = recipe.Id;

            recipe.Ingredients.Add(ingredient);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                if (IngredientExists(ingredient.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }
            return CreatedAtAction("GetIngredient", new { id = ingredient.Id }, ingredient);
        }


        [HttpPut("~/api/recipes/{recipeId}/ingredients/{ingredientId}")]
        public async Task<IActionResult> PutIngredient(int recipeId, int ingredientId, [FromBody] Ingredient ingredient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (ingredientId != ingredient.Id)
            {
                return BadRequest();
            }

            ingredient.Recipe = _context.Recipes.FirstOrDefault(q => q.Id == recipeId);
            _context.Entry(ingredient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!IngredientExists(ingredientId))
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



        [HttpDelete("~/api/recipes/{recipeId}/ingredients/{ingredientId}")]
        public async Task<IActionResult> DeleteIngredient(int recipeId, int ingredientId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var recipe = _context.Recipes.FirstOrDefault(q => q.Id == recipeId);
            var userId = _userManager.GetUserId(User);

            Ingredient ingredient = await _context.Ingredients
                .Where(q => q.Recipe.ApplicationUser.Id == userId)
                .SingleOrDefaultAsync(m => m.Recipe.Id == m.Id);

            if (ingredient == null)
            {
                return NotFound();
            }

            _context.Ingredients.Remove(ingredient);
            await _context.SaveChangesAsync();

            return Ok(ingredient);
        }

        private bool IngredientExists(int id)
        {
            var recipeId = _context.Recipes.FirstOrDefault(q => q.Id == id);
            var userId = _userManager.GetUserId(User);
            return _context.Ingredients.Any(e => e.Recipe.ApplicationUser.Id == userId && e.Id == id);
        }
    }
}
