using Assessment_Project.Model;
using Assessment_Project___Contact_Details.Models;
using Microsoft.EntityFrameworkCore;

namespace Assessment_Project___Contact_Details.DAL
{
    public class ContactDbContext : DbContext
    {
        public ContactDbContext(DbContextOptions<ContactDbContext> options)
       : base(options)
        {
        }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<UserModel> UserModels { get; set; }
    }
}
