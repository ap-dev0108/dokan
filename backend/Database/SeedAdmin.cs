using System.Runtime.InteropServices.ComTypes;
using Microsoft.AspNetCore.Identity;
using dokan.Models.Entities;
using Microsoft.AspNetCore.Http.HttpResults;

public static class SeedAdmin
{
    public static async Task InitializeAsync(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

        // ---------- SEED ROLES ----------
        string[] roleNames = { "Admin", "User" };

        foreach (var roleName in roleNames)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        // ---------- SEED ADMIN USER ----------
        string adminEmail = "admin@gmail.com";
        string adminPassword = "Admin@123"; // Change after login

        var adminUser = await userManager.FindByEmailAsync(adminEmail);

        if (adminUser == null)
        {
            adminUser = new User
            {
                UserName = adminEmail,
                Email = adminEmail,
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(adminUser, adminPassword);

            if (!result.Succeeded)
            {
                throw new Exception();
            }

            await userManager.AddToRoleAsync(adminUser, "Admin");
        }
    }
}