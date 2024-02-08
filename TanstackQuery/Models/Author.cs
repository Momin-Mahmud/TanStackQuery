using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TanstackQuery.Models
{
    public class Author
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? Id { get; }
        public string Name { get; set; }

        public ICollection<Post>? Posts { get; set; } = new List<Post>();
    }
}
