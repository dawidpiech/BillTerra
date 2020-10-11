using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.DependencyInjection;
using BillTerra.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace BillTerra.Contexts
{
    public class ApplicationDbContext:IdentityDbContext<User>
    {
        
        
        public DbSet<Jar> Jars { get; set; }
        public DbSet<Categorie> Categories { get; set; }
        public DbSet<Transaction> Transactions { get; set; }  
        public DbSet<BudgetPlan> BudgetPlans { get; set; }
        public DbSet<Notification> Notyfications { get; set; }
        public DbSet<ShoppListElement> ShopListElements { get; set; }


        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }




    }
}
