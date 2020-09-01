using BillTerra.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BillTerra.Models;
using Microsoft.EntityFrameworkCore;

namespace BillTerra.EntityFramework
{
    public class EFCategorieRepository : ICategorieRepository
    {
        private ApplicationDbContext context;

        public EFCategorieRepository(ApplicationDbContext ctx)
        {
            context = ctx;
        }

        public async Task Add(Categorie categorie)
        {
            context.Categories.Add(categorie);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Categorie>> Categories(User user)
        {
            var sql = $"SELECT * FROM dbo.Categories WHERE UserId = '{user.Id}'";

            return await context.Categories
                .FromSql(sql)
                .ToListAsync();
        }
    }
}
