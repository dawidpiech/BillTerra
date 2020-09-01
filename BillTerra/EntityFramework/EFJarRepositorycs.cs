using BillTerra.Contexts;
using BillTerra.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.EntityFramework
{
    public class EFJarRepositorycs : IJarRepositorycs
    {
        private ApplicationDbContext context;

        public EFJarRepositorycs(ApplicationDbContext ctx)
        {
            context = ctx;

        }

        public async Task<IEnumerable<Jar>> Jars(User user)
        {
            var sql = $"SELECT * FROM dbo.Jars WHERE UserId = '{user.Id}'";

            return await context.Jars
                .FromSql(sql)
                .ToListAsync();
        }


        public async Task Add(Jar jar)
        {

            context.Jars.Add(jar);
            await context.SaveChangesAsync();

        }
    }
}
