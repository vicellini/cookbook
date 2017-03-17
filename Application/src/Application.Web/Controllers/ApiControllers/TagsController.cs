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
    // [Route("~/tag")]
    public class TagsController : Controller
    {
        private readonly CookBookContext _context;

        private UserManager<ApplicationUser> _userManager { get; set; }
        public CookBookContext Context { get; set; }


        public TagsController(UserManager<ApplicationUser> userManager, CookBookContext context)
        {
            _userManager = userManager;
            _context = context;
        }



        [Route("~/api/recipes/{recipeId}/tags")]
        public IEnumerable<Tag> GetAll()
        {
            var userId = _userManager.GetUserId(User);

            return _context.Tags
                .Where(q => q.Recipe.ApplicationUser.Id == userId).ToList();
        }


        [HttpGet("api/recipes/{recipesId}/tags/{tagId}")]
        public async Task<IActionResult> GetTag(int recipeId, int tagId)
        {
            var userId = _userManager.GetUserId(User);
            Tag tag = await _context.Tags
                .SingleOrDefaultAsync(m => m.Recipe.ApplicationUser.Id == userId && m.Recipe.Id == m.Id);

            if (tag == null)
            {
                return NotFound();
            }

            return Ok(tag);
        }



        [HttpPost("~/api/recipes/{recipeId}/tags")]
        public async Task<IActionResult> PostTag(int recipeId, [FromBody]Tag tag)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var recipe = _context.Recipes.FirstOrDefault(q => q.Id == recipeId);
            tag.Recipe.Id = recipe.Id;

            recipe.Tags.Add(tag);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                if (TagExists(tag.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }
            return CreatedAtAction("GetTag", new { id = tag.Id }, tag);
        }


        [HttpPut("~/api/recipes/{recipeId}/tags/{tagId}")]
        public async Task<IActionResult> PutTag(int recipeId, int tagId, [FromBody] Tag tag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (tagId != tag.Id)
            {
                return BadRequest();
            }

            tag.Recipe = _context.Recipes.FirstOrDefault(q => q.Id == recipeId);
            _context.Entry(tag).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!TagExists(tagId))
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



        [HttpDelete("~/api/recipes/{recipeId}/tags/{tagId}")]
        public async Task<IActionResult> DeleteTag(int recipeId, int tagId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var recipe = _context.Recipes.FirstOrDefault(q => q.Id == recipeId);
            var userId = _userManager.GetUserId(User);

            Tag tag = await _context.Tags
                .Where(q => q.Recipe.ApplicationUser.Id == userId)
                .SingleOrDefaultAsync(m => m.Recipe.Id == m.Id);

            if (tag == null)
            {
                return NotFound();
            }

            _context.Tags.Remove(tag);
            await _context.SaveChangesAsync();

            return Ok(tag);
        }

        private bool TagExists(int id)
        {
            var recipeId = _context.Recipes.FirstOrDefault(q => q.Id == id);
            var userId = _userManager.GetUserId(User);
            return _context.Tags.Any(e => e.Recipe.ApplicationUser.Id == userId && e.Id == id);
        }
    }
}
