using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TanstackQuery.Models
{
    public class Post
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? Id { get; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string AuthorId { get; set; }

    }
}
