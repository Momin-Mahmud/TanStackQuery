using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TanstackQuery.Context;
using TanstackQuery.Models;

namespace TanstackQuery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   public class AuthorController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public AuthorController(ApplicationDbContext applicationDbContext)
        {
            _context = applicationDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Author>>> GetAuthors()
        {
            if (_context.Authors == null)
            {
                return NotFound();
            }

            return await _context.Authors.ToListAsync();

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Author>> GetAuthor(string id)
        {
            if (_context.Authors == null)
            {
                return NotFound();
            }
            var author = await _context.Authors.FindAsync(id);
            if (author == null)
            {
                return NotFound();
            }
            return author;

        }


        [HttpPost]

        public async Task<ActionResult<Author>> CreateAuthor(Author author)
        {
            _context.Authors.Add(author);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAuthor), new { id = author.Id }, author);
        }

        [HttpPut("{id}")]

        public async Task<ActionResult> PutAuthor(string id, Author author)
        {
     

            var existingAuthor = await _context.Authors.FindAsync(id);
            if (existingAuthor == null)
            {
                return NotFound(); // Author with the provided id not found
            }
            existingAuthor.Name = author.Name;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuthorExists(id))
                {
                    return NotFound(); // Author with the provided id doesn't exist
                }
                else
                {
                    throw; // Some other error occurred
                }
            }

            return Ok(author); 
        }

        private bool AuthorExists(string id)
        {
            return _context.Authors.Any(e => e.Id == id);
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> DeleteAuthor(string id)
        {
            if (string.IsNullOrEmpty(id) || _context.Authors == null)
            {
                return BadRequest();
            }
            var author = await _context.Authors.FindAsync(id);
            if (author == null)
                return NotFound();
            _context.Authors.Remove(author);
            await _context.SaveChangesAsync();

            return Ok();

        }

        [HttpGet("{authorId}/posts")]
        public async Task<ActionResult<IEnumerable<Post>>> GetPostsByAuthor(string authorId)
        {
            var author = await _context.Authors.Include(a => a.Posts).FirstOrDefaultAsync(a => a.Id == authorId);
            if (author == null)
            {
                return NotFound("Author not found");
            }

            return Ok(author.Posts);
        }
    }
}
