using Microsoft.EntityFrameworkCore;
using TanstackQuery.Models;

namespace TanstackQuery.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        public DbSet<Post>? Posts { get; set; }
        public DbSet<Author>? Authors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Author>()
                .HasKey(a => a.Id); 

            modelBuilder.Entity<Author>()
                .Property(a => a.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Post>().HasKey(a => a.Id);
            modelBuilder.Entity<Author>().Property(a => a.Id).ValueGeneratedOnAdd();

        }
    }
}
