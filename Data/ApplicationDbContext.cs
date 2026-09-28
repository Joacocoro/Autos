using Microsoft.EntityFrameworkCore;
using Autos.Models;

namespace Autos.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    public DbSet<Vehiculos> Vehiculos { get; set; }

}