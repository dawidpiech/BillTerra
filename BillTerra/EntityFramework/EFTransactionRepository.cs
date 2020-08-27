using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BillTerra.Models;
using BillTerra.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BillTerra.EntityFramework
{

    public class EFTransactionRepository : ITransactionRepository
    {
        private ApplicationDbContext context;

        public EFTransactionRepository(ApplicationDbContext ctx)
        {
            context = ctx;

        }

        public async Task<IEnumerable<Transaction>> Transactions(User user)
        {
            var sql = $"SELECT * FROM dbo.Transactions WHERE UserId = '{user.Id}'";

            return await context.Transactions
                .FromSql(sql)
                .ToListAsync();
        }


        public async Task Add( Transaction transaction)
        {

            context.Transactions.Add(transaction);
            await context.SaveChangesAsync();

        }
    }
}
