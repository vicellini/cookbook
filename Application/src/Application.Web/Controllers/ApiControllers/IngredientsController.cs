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






        [HttpPost("~/api/recipes/{recipeId}/ingredients")]
        public async Task<IActionResult> PostIngredient(int recipeId, [FromBody]Ingredient ingredient)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var recipe = _context.Recipes.FirstOrDefault(q => q.Id == recipeId);


            recipe.Ingredients.Add(ingredient);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                if (1 == 2)
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

            var recipe = _context.Recipes.FirstOrDefault(q => q.Id == recipeId);
            ingredientId = ingredient.Id;
            _context.Entry(ingredient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!IngredientExists(recipeId, ingredientId))
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
        public async Task<IActionResult> DeleteIngredient([FromBody] Recipe recipeId, [FromBody] Ingredient ingredientId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var recipe = recipeId;

            var userId = _userManager.GetUserId(User);

            var Recipe = _context.Recipes.Select(q => q.Id);
            var ingredient = ingredientId;





            if (ingredient == null)
            {
                return NotFound();
            }

            _context.Ingredients.Remove(ingredient);
            await _context.SaveChangesAsync();

            return Ok(ingredient);
        }

        private bool IngredientExists(int recipeId, int ingredientId)
        {
            var rId = _context.Recipes.FirstOrDefault(q => q.Id == recipeId);
            var userId = _userManager.GetUserId(User);
            var iId = _context.Ingredients.FirstOrDefault(q => q.Id == ingredientId);

            return _context.Ingredients.Any(e => e.Id == ingredientId);
        }
    }
}
