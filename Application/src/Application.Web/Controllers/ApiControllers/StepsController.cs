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
    // [Route("~/step")]
    public class StepsController : Controller
    {
        private readonly CookBookContext _context;

        private UserManager<ApplicationUser> _userManager { get; set; }
        public CookBookContext Context { get; set; }


        public StepsController(UserManager<ApplicationUser> userManager, CookBookContext context)
        {
            _userManager = userManager;
            _context = context;
        }



        [Route("~/api/recipes/{recipeId}/steps")]
        public IEnumerable<Step> GetAll()
        {
            var userId = _userManager.GetUserId(User);

            return _context.Steps
                .Where(q => q.Recipe.ApplicationUser.Id == userId).ToList();
        }


        [HttpGet("api/recipes/{recipesId}/steps/{stepId}")]
        public async Task<IActionResult> GetStep(int recipeId, int stepId)
        {
            var userId = _userManager.GetUserId(User);
            Step step = await _context.Steps
                .SingleOrDefaultAsync(m => m.Recipe.ApplicationUser.Id == userId && m.Recipe.Id == m.Id);

            if (step == null)
            {
                return NotFound();
            }

            return Ok(step);
        }



        [HttpPost("~/api/recipes/{recipeId}/steps")]
        public async Task<IActionResult> PostStep(int recipeId, [FromBody]Step step)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var recipe = _context.Recipes.FirstOrDefault(q => q.Id == recipeId);
            step.Recipe.Id = recipe.Id;

            recipe.Steps.Add(step);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                if (StepExists(step.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }
            return CreatedAtAction("GetStep", new { id = step.Id }, step);
        }


        [HttpPut("~/api/recipes/{recipeId}/steps/{stepId}")]
        public async Task<IActionResult> PutStep(int recipeId, int stepId, [FromBody] Step step)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (stepId != step.Id)
            {
                return BadRequest();
            }

            step.Recipe = _context.Recipes.FirstOrDefault(q => q.Id == recipeId);
            _context.Entry(step).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!StepExists(stepId))
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



        [HttpDelete("~/api/recipes/{recipeId}/steps/{stepId}")]
        public async Task<IActionResult> DeleteStep(int recipeId, int stepId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var recipe = _context.Recipes.FirstOrDefault(q => q.Id == recipeId);
            var userId = _userManager.GetUserId(User);

            Step step = await _context.Steps
                .Where(q => q.Recipe.ApplicationUser.Id == userId)
                .SingleOrDefaultAsync(m => m.Recipe.Id == m.Id);

            if (step == null)
            {
                return NotFound();
            }

            _context.Steps.Remove(step);
            await _context.SaveChangesAsync();

            return Ok(step);
        }

        private bool StepExists(int id)
        {
            var recipeId = _context.Recipes.FirstOrDefault(q => q.Id == id);
            var userId = _userManager.GetUserId(User);
            return _context.Steps.Any(e => e.Recipe.ApplicationUser.Id == userId && e.Id == id);
        }
    }
}
