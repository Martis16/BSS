using Microsoft.EntityFrameworkCore;

namespace BSS.Models
{
    public class CompanyContext : DbContext
    {

        public DbSet<Employee> Employees { get; set; }

        public CompanyContext(DbContextOptions options) : base(options)
        {

        }
    }
}
