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






        [HttpPost("~/api/recipes/{recipeId}/tags")]
        public async Task<IActionResult> PostTag(int recipeId, [FromBody]Tag tag)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var recipe = _context.Recipes.FirstOrDefault(q => q.Id == recipeId);


            recipe.Tags.Add(tag);

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

            var recipe = _context.Recipes.FirstOrDefault(q => q.Id == recipeId);
            tagId = tag.Id;
            _context.Entry(tag).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!TagExists(recipeId, tagId))
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
        public async Task<IActionResult> DeleteTag([FromBody] Recipe recipeId, [FromBody] Tag tagId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var recipe = recipeId;

            var userId = _userManager.GetUserId(User);

            var Recipe = _context.Recipes.Select(q => q.Id);
            var tag = tagId;





            if (tag == null)
            {
                return NotFound();
            }

            _context.Tags.Remove(tag);
            await _context.SaveChangesAsync();

            return Ok(tag);
        }

        private bool TagExists(int recipeId, int tagId)
        {
            var rId = _context.Recipes.FirstOrDefault(q => q.Id == recipeId);
            var userId = _userManager.GetUserId(User);
            var tId = _context.Tags.FirstOrDefault(q => q.Id == tagId);

            return _context.Tags.Any(e => e.Id == tagId);
        }
    }
}
