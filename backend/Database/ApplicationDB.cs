using dokan.Models.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace dokan.Database;

public class ApplicationDB : IdentityDbContext<User>
{
    public ApplicationDB(DbContextOptions<ApplicationDB> options) : base(options) {}
    
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<UserAddress> UserAddresses { get; set; }
    public DbSet<Products> Products { get; set; }
}