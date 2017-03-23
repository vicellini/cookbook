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






        [HttpPost("~/api/recipes/{recipeId}/steps")]
        public async Task<IActionResult> PostStep(int recipeId, [FromBody]Step step)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var recipe = _context.Recipes.FirstOrDefault(q => q.Id == recipeId);


            recipe.Steps.Add(step);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                if (1==2)
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

            var recipe = _context.Recipes.FirstOrDefault(q => q.Id == recipeId);
            stepId = step.Id;
            _context.Entry(step).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!StepExists(recipeId, stepId))
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
        public async Task<IActionResult> DeleteStep([FromBody] Recipe recipeId, [FromBody] Step stepId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var recipe = recipeId;

            var userId = _userManager.GetUserId(User);
       
            var Recipe = _context.Recipes.Select(q => q.Id);
            var step = stepId;
            
              
              
               

            if (step == null)
            {
                return NotFound();
            }

            _context.Steps.Remove(step);
            await _context.SaveChangesAsync();

            return Ok(step);
        }

        private bool StepExists(int recipeId, int stepId)
        {
          var  rId = _context.Recipes.FirstOrDefault(q => q.Id == recipeId);
            var userId = _userManager.GetUserId(User);
            var sId = _context.Steps.FirstOrDefault(q => q.Id == stepId);

            return _context.Steps.Any(e => e.Id == stepId);
        }
    }
}
