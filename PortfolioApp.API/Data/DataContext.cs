using Microsoft.EntityFrameworkCore;
using PortfolioApp.API.Models;

namespace PortfolioApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

         public DbSet<Owner> Owners { get; set; }
        public DbSet<User> Users { get; set; }
        
    }
}