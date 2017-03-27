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

  
    public class CookBooksController : Controller
    {
        private readonly CookBookContext _context;

        private UserManager<ApplicationUser> _userManager { get; set; }
        public CookBookContext Context { get; set; }


        public CookBooksController(UserManager<ApplicationUser> userManager, CookBookContext context)
        {
            _userManager = userManager;
            _context = context;

        }

        [HttpGet("~/bookmarks")]
        public IEnumerable<BookMarkedLink> AllBookmarks()
        {
            var userId = _userManager.GetUserId(User);
            var links = _context.BookMarkedLinks.Where(q => q.ApplicationUser.Id == userId).ToList();
            return links;
        }



        // GET api/bookmark/5
        [HttpGet("~/api/bookmark/{id}")]
        public async Task<IActionResult> GetBookMark(int id)
        {

            var user = await _userManager.GetUserAsync(User);
            var userId = user.Id;
            BookMarkedLink link = await _context.BookMarkedLinks
                .SingleOrDefaultAsync(m => m.ApplicationUser.Id == userId && m.Id == id);

            if (link == null)
            {
                return NotFound();
            }

            return Ok(link);
        }



        // POST api/bookmarks
        [HttpPost("~/api/bookmarks")]
        public async Task<IActionResult> PostBookMark([FromBody]BookMarkedLink link)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _userManager.GetUserAsync(User);
            link.ApplicationUser = user;
            _context.BookMarkedLinks.Add(link);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                if (LinkExists(link.Id))
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

        [HttpGet("~/api/bookmarks")]
        public IEnumerable<BookMarkedLink> GetBookMark()
        {
            var userId = _userManager.GetUserId(User);
            var bookmarkedlinks = _context.BookMarkedLinks.Where(q => q.ApplicationUser.Id == userId)

              .ToList();
            return bookmarkedlinks;
        }


        // DELETE api/bookmarks/5
        [HttpDelete("~/api/bookmarks/{id}")]
        public async Task<IActionResult> DeleteBookmark(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = _userManager.GetUserId(User);

            BookMarkedLink link = await _context.BookMarkedLinks
                .Where(q => q.ApplicationUser.Id == userId)
                .SingleOrDefaultAsync(m => m.Id == id);

            if (link == null)
            {
                return NotFound();
            }

            _context.BookMarkedLinks.Remove(link);
            await _context.SaveChangesAsync();

            return Ok(link);
        }
        private bool LinkExists(int id)
        {
            var userId = _userManager.GetUserId(User);
            return _context.BookMarkedLinks.Any(e => e.ApplicationUser.Id == userId && e.Id == id);
        }
    }
}
