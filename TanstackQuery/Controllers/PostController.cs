using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TanstackQuery.Context;
using TanstackQuery.Models;

namespace TanstackQuery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public PostController(ApplicationDbContext applicationDbContext)
        {
            _context = applicationDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts ()
        {
            if (_context.Posts == null)
            {
                return NotFound();
            }

            return await _context.Posts.ToListAsync();

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(string id)
        {
            if (_context.Posts == null)
            {
                return NotFound();
            }
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }
            return post;

        }


        [HttpPost]

        public async Task<ActionResult<Post>> CreatePost(Post post)
        {
            var author = await _context.Authors.FindAsync(post.AuthorId);
            if (author == null)
            {
                return BadRequest("Invalid AuthorId");
            }

            author.Posts.Add(post);

            _context.Posts.Add(post);

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPost), new { id = post.Id }, post);
        }

        [HttpPut("{id}")]

        public async  Task<ActionResult> PutPost (string id , Post post)
        {
            if (post == null || id != post.Id)
                return BadRequest();
            _context.Entry(post).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Ok();
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> DeletePost (string id)
        {
            if (string.IsNullOrEmpty(id) || _context.Posts == null)
            {
                return BadRequest();
            }
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
                return NotFound();
            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return Ok();

        }

        [HttpGet("{id}/author")]

        public async Task<ActionResult<Author>> GetPostAuthor(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("PostId cannot be null or empty");
            }

            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound("Post not found");
            }

            var author = await _context.Authors.FindAsync(post.AuthorId);
            if (author == null)
            {
                return NotFound("Author not found");
            }

            return Ok(author);
        }
    }
}
